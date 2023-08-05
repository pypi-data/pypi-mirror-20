/**
 * This is the main frontend file to make
 * an interactive ui for gdb. Everything exists in this single js
 * file (besides libraries).
 *
 * There are several components, each of which have their
 * own top-level object, and can render new html in the browser.
 *
 * State is managed in a single location (globals.state), and each time the state
 * changes, an event is emitted, which should trigger each component to re-render itself.
 *
 * Since this file is still being actively developed and hasn't compoletely stabilized, the
 * documentation may not be totally complete/correct.
 *
 */

window.globals = (function ($, _, Awesomplete, io, moment, debug, gdbgui_version, initial_binary_and_args) {
"use strict";

/**
 * Constants
 */
const ENTER_BUTTON_NUM = 13
, DATE_FORMAT = 'dddd, MMMM Do YYYY, h:mm:ss a'

// print to console if debug is true
let debug_print
if(debug){
    debug_print = console.info
}else{
    debug_print = function(){
        // stubbed out
    }
}
/**
 * Globals
 */
let globals = {
    init: function(){
        window.addEventListener('event_inferior_program_exited', globals.event_inferior_program_exited)
        window.addEventListener('event_inferior_program_running', globals.event_inferior_program_running)
        window.addEventListener('event_inferior_program_paused', globals.event_inferior_program_paused)
        window.addEventListener('event_select_frame', globals.event_select_frame)

        $(window).keydown(function(e){
           if((e.keyCode === ENTER_BUTTON_NUM)) {
               // when pressing enter in an input, don't redirect entire page
               e.preventDefault()
           }
       })
    },
    state: {
        debug: debug,  // if gdbgui is run in debug mode
        gdbgui_version: gdbgui_version,
        latest_gdbgui_version: undefined,
        // choices are:
        // 'running'
        // 'paused'
        // 'exited'
        // undefined
        inferior_program: undefined,
        paused_on_frame: undefined,
        selected_frame_num: 0,
        current_thread_id: undefined,
        stack: [],
        locals: [],
        threads: [],

        files_being_fetched: [],

        fullname_to_render: null,
        current_line_of_source_code: null,
        current_assembly_address: null,

        rendered_source_file_fullname: null,
        rendered_assembly: false,
        cached_source_files: [],  // list with keys fullname, source_code

        gdb_version: localStorage.getItem('gdb_version') || undefined,  // this is parsed from gdb's output, but initialized to undefined
        inferior_binary_path: null,
        inferior_binary_path_last_modified_unix_sec: null,
        warning_shown_for_old_binary: false,

        register_names: [],
        previous_register_values: {},
        current_register_values: {},

        memory_cache: {},

        breakpoints: [],
    },
    clear_program_state: function(){
        globals.update_state('current_line_of_source_code', undefined)
        globals.update_state('paused_on_frame', undefined)
        globals.update_state('selected_frame_num', 0)
        globals.update_state('current_thread_id', undefined)
        globals.update_state('stack', [])
        globals.update_state('locals', [])
    },
    event_inferior_program_exited: function(){
        globals.update_state('inferior_program', 'exited')
        globals.clear_program_state()
    },
    event_inferior_program_running: function(){
        globals.update_state('inferior_program', 'running')
        globals.clear_program_state()
    },
    event_inferior_program_paused: function(e){
        let frame = e.detail || {}
        globals.update_state('inferior_program', 'paused')
        globals.update_state('paused_on_frame', frame)
        globals.update_state('fullname_to_render', frame.fullname)

        globals.update_state('current_line_of_source_code', frame.line)
        globals.update_state('current_assembly_address', frame.addr)
    },
    event_select_frame: function(e){
        let selected_frame_num = e.detail || 0
        globals.update_state('selected_frame_num', selected_frame_num)
    },
    update_stack: function(stack){
        globals.update_state('stack', stack)
        globals.update_state('paused_on_frame', stack[globals.state.selected_frame_num || 0])

        globals.update_state('fullname_to_render', globals.state.paused_on_frame.fullname)

        globals.update_state('current_line_of_source_code', globals.state.paused_on_frame.line)
        globals.update_state('current_assembly_address', globals.state.paused_on_frame.addr)

    },
    set_locals: function(locals){
        globals.update_state('locals', locals)
    },
    update_state: function(key, value){
        if(key in globals.state){
            let oldval = globals.state[key]
            // update the state
            globals.state[key] = value
            if(oldval !== value){
                debug_print(`${key} was changed from ${oldval} to ${value}`)
                // tell listeners that the state changed
                globals.dispatch_state_change()
            }
        }else{
            console.error(`tried to update state with key that does not exist: ${key}`)
        }
    },
    add_source_file_to_cache: function(obj){
        globals.state.cached_source_files.push(obj)
        globals.dispatch_state_change()
    },
    save_breakpoints: function(payload){
        globals.state.breakpoints = []
        if(payload && payload.BreakpointTable && payload.BreakpointTable.body){
            for (let breakpoint of payload.BreakpointTable.body){
                globals.save_breakpoint(breakpoint)
            }
        }
        globals.dispatch_state_change()
    },
    save_breakpoint: function(breakpoint){
        let bkpt = $.extend(true, {}, breakpoint)
        // turn fullname into a link with classes that allows us to click and view the file/context of the breakpoint
        let links = []
        if ('fullname' in breakpoint){
             links.push(SourceCode.get_link_to_view_file(breakpoint.fullname, breakpoint.line, ''))
        }
        links.push(Breakpoint.get_delete_breakpoint_link(breakpoint.number))
        bkpt[' '] = links.join(' | ')

        // turn address into link
        if (bkpt['addr']){
            bkpt['addr'] =  Memory.make_addr_into_link(bkpt['addr'])
        }

        // add the breakpoint if it's not stored already
        if(globals.state.breakpoints.indexOf(bkpt) === -1){
            globals.state.breakpoints.push(bkpt)
        }

        globals.dispatch_state_change()
    },
}
/**
 * Debounce the event emission for smoother rendering
 */
globals.dispatch_state_change = _.debounce(() => {
        debug_print('dispatching event_global_state_changed')
        window.dispatchEvent(new Event('event_global_state_changed'))
    }, 50)


/**
 * The StatusBar component display the most recent gdb status
 * at the top of the page
 */
const StatusBar = {
    el: $('#status'),
    /**
     * Render a new status
     * @param status_str: The string to render
     * @param error: Whether this string relates to an error condition. If true,
     *                  a red label appears
     */
    render: function(status_str, error=false){
        if(error){
            StatusBar.el.html(`<span class='label label-danger'>error</span>&nbsp;${status_str}`)
        }else{
            StatusBar.el.html(status_str)
        }
    },
    /**
     * Handle http responses with error codes
     * @param response: response from server
     */
    render_ajax_error_msg: function(response){
        if (response.responseJSON && response.responseJSON.message){
            StatusBar.render(_.escape(response.responseJSON.message), true)
        }else{
            StatusBar.render(`${response.statusText} (${response.status} error)`, true)
        }
    },
    /**
     * Render pygdbmi response
     * @param mi_obj: gdb mi obj from pygdbmi
     */
    render_from_gdb_mi_response: function(mi_obj){
        if(!mi_obj){
            return
        }
        // Update status
        let status = [],
            error = false
        if (mi_obj.message){
            if(mi_obj.message === 'error'){
                error = true
            }else{
                status.push(mi_obj.message)
            }
        }
        if (mi_obj.payload){
            const interesting_keys = ['msg', 'reason', 'signal-name', 'signal-meaning']
            for(let k of interesting_keys){
                if (mi_obj.payload[k]) {status.push(mi_obj.payload[k])}
            }

            if (mi_obj.payload.frame){
                for(let i of ['file', 'func', 'line', 'addr']){
                    if (i in mi_obj.payload.frame){
                        status.push(`${i}: ${mi_obj.payload.frame[i]}`)
                    }
                }
            }
        }
        StatusBar.render(status.join(', '), error)
    }
}

/**
 * This object contains methods to interact with
 * gdb, but does not directly render anything in the DOM.
 */
const GdbApi = {
    init: function(){
        $("body").on("click", ".gdb_cmd", GdbApi.click_gdb_cmd_button)
        $('#run_button').click(GdbApi.click_run_button)
        $('#continue_button').click(GdbApi.click_continue_button)
        $('#next_button').click(GdbApi.click_next_button)
        $('#step_button').click(GdbApi.click_step_button)
        $('#return_button').click(GdbApi.click_return_button)
        $('#next_instruction_button').click(GdbApi.click_next_instruction_button)
        $('#step_instruction_button').click(GdbApi.click_step_instruction_button)
        $('#send_interrupt_button').click(GdbApi.click_send_interrupt_button)

        window.addEventListener('event_inferior_program_exited', GdbApi.event_inferior_program_exited)
        window.addEventListener('event_inferior_program_running', GdbApi.event_inferior_program_running)
        window.addEventListener('event_inferior_program_paused', GdbApi.event_inferior_program_paused)
        window.addEventListener('event_breakpoint_created', GdbApi.event_breakpoint_created)
        window.addEventListener('event_select_frame', GdbApi.event_select_frame)
    },
    click_run_button: function(e){
        if(globals.state.inferior_binary_path !== null){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-run')
        }else{
            StatusBar.render('no inferior program is loaded', true)
        }
    },
    inferior_is_paused: function(){
        return ([undefined, 'paused'].indexOf(globals.state.inferior_program) >= 0)
    },
    click_continue_button: function(e){
        if(GdbApi.inferior_is_paused()){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-continue')
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_next_button: function(e){
        if(GdbApi.inferior_is_paused()){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-next')
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_step_button: function(e){
        if(GdbApi.inferior_is_paused()){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-step')
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_return_button: function(e){
        // From gdb mi docs (https://sourceware.org/gdb/onlinedocs/gdb/GDB_002fMI-Program-Execution.html#GDB_002fMI-Program-Execution):
        // `-exec-return` Makes current function return immediately. Doesn't execute the inferior.
        // That means we do NOT dispatch the event `event_inferior_program_running`, because it's not, in fact, running.
        // The return also doesn't even indicate that it's paused, so we need to manually trigger the event here.
        if(GdbApi.inferior_is_paused()){
            GdbApi.run_gdb_command('-exec-return')
            window.dispatchEvent(new Event('event_inferior_program_paused'))
            // GdbApi.refresh_state_for_gdb_pause()
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_next_instruction_button: function(e){
        if(GdbApi.inferior_is_paused()){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-next-instruction')
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_step_instruction_button: function(e){
        if(GdbApi.inferior_is_paused()){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-step-instruction')
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_send_interrupt_button: function(e){
        if(globals.state.inferior_binary_path !== null){
            window.dispatchEvent(new Event('event_inferior_program_running'))
            GdbApi.run_gdb_command('-exec-interrupt')
        }else{
            StatusBar.render('inferior program is not paused', true)
        }
    },
    click_gdb_cmd_button: function(e){
        if (e.currentTarget.dataset.cmd !== undefined){
            // run single command
            // i.e. <a data-cmd='cmd' />
            GdbApi.run_gdb_command(e.currentTarget.dataset.cmd)
        }else if (e.currentTarget.dataset.cmd0 !== undefined){
            // run multiple commands
            // i.e. <a data-cmd0='cmd 0' data-cmd1='cmd 1' data-...>
            let cmds = []
            let i = 0
            let cmd = e.currentTarget.dataset[`cmd${i}`]
            // extract all commands into an array, then run them
            // (max of 100 commands)
            while(cmd !== undefined && i < 100){
                cmds.push(cmd)
                i++
                cmd = e.currentTarget.dataset[`cmd${i}`]
            }
            GdbApi.run_gdb_command(cmds)
        }else{
            console.error('expected cmd or cmd0 [cmd1, cmd2, ...] data attribute(s) on element')
        }
    },
    event_inferior_program_running: function(){
        // do nothing
    },
    event_inferior_program_paused: function(){
        GdbApi.refresh_state_for_gdb_pause()
    },
    event_breakpoint_created: function(){
        GdbApi.refresh_breakpoints()
    },
    event_select_frame: function(e){
        let framenum = e.detail
        GdbApi.run_gdb_command(`-stack-select-frame ${framenum}`)
        GdbApi.refresh_state_for_gdb_pause()
    },
    /**
     * runs a gdb cmd (or commands) directly in gdb on the backend
     * validates command before sending, and updates the gdb console and status bar
     * @param cmd: a string or array of strings, that are directly evaluated by gdb
     * @param success_callback: function to be called upon successful completion.  The data returned
     *                          is an object. See pygdbmi for a description of the format.
     *                          The default callback works in most cases, but in some cases a the response is stateful and
     *                          requires a specific callback. For example, when creating a variable in gdb
     *                          to watch, gdb returns generic looking data that a generic callback could not
     *                          figure out how to handle.
     * @return nothing
     */
    run_gdb_command: function(cmd){
        if(_.trim(cmd) === ''){
            return
        }

        let cmds = cmd
        if(_.isString(cmds)){
            cmds = [cmds]
        }

        // add the send command to the console to show commands that are
        // automatically run by gdb
        if(globals.state.debug){
            GdbConsoleComponent.add_sent_commands(cmds)
        }

        StatusBar.render(`<span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span>`)
        WebSocket.run_gdb_command(cmds)
    },
    refresh_breakpoints: function(){
        GdbApi.run_gdb_command(['-break-list'])
    },
    refresh_state_for_gdb_pause: function(){
        let cmds = [
            // get info on current thread
            '-thread-info',
            // update all user-defined variables in gdb
            '-var-update --all-values *',
            // print the name, type and value for simple data types,
            // and the name and type for arrays, structures and unions.
            '-stack-list-variables --simple-values',
            // flush inferior process' output (if any)
            // by default, it only flushes when the program terminates
            // so this additional call is needed
            '-data-evaluate-expression fflush(0)',
        ]

        // update registers
        cmds = cmds.concat(Registers.get_update_cmds())

        // re-fetch memory over desired range as specified by DOM inputs
        cmds = cmds.concat(Memory.get_gdb_commands_from_inputs())

        // List the frames currently on the stack.
        // IMPORTANT: the event "event_global_state_changed" is sent
        // when the stack is received, so this must be the last command
        // sent, so that all other commands were already received.
        cmds.push('-stack-list-frames')

        // and finally run the commands
        GdbApi.run_gdb_command(cmds)
    },
    get_inferior_binary_last_modified_unix_sec(path){
        $.ajax({
            url: "/get_last_modified_unix_sec",
            cache: false,
            method: 'GET',
            data: {'path': path},
            success: GdbApi._recieve_last_modified_unix_sec,
            error: GdbApi._error_getting_last_modified_unix_sec,
        })
    },
    _recieve_last_modified_unix_sec(data){
        if(data.path === globals.state.inferior_binary_path){
            globals.state.inferior_binary_path_last_modified_unix_sec = data.last_modified_unix_sec
        }
    },
    _error_getting_last_modified_unix_sec(data){
        globals.state.inferior_binary_path = null
    }
}

/**
 * Some general utility methods
 */
const Util = {
    /**
     * Get html table
     * @param columns: array of strings
     * @param data: array of arrays of data
     */
    get_table: function(columns, data, style='') {
        var result = [`<table class='table table-bordered table-condensed' style="${style}">`];
        if(columns){
            result.push("<thead>")
            result.push("<tr>")
            for (let h of columns){
                result.push(`<th>${h}</th>`)
            }
            result.push("</tr>")
            result.push("</thead>")
        }

        if(data){
            result.push("<tbody>")
            for(let row of data) {
                    result.push("<tr>")
                    for(let cell of row){
                            result.push(`<td>${cell}</td>`)
                    }
                    result.push("</tr>")
            }
        }
        result.push("</tbody>")
        result.push("</table>")
        return result.join('\n')
    },
    /**
     * gdb will often return an array of objects
     * Iterate through all of them and find all keys
     * and corresponding data
     * @param objs: array of response objects from gdb, such as breakpoints
     * @return tuple of [column, data], compatible with Util.get_table
     */
    get_table_data_from_objs: function(objs){
        // put keys of all objects into array
        let all_keys = _.flatten(objs.map(i => _.keys(i)))
        let columns = _.uniq(_.flatten(all_keys)).sort()

        let data = []
        for (let s of objs){
            let row = []
            for (let k of columns){
                row.push(k in s ? s[k] : '')
            }
            data.push(row)
        }
        return [columns, data]
    },
    /**
     * Escape gdb's output to be browser compatible
     * @param s: string to mutate
     */
    escape: function(s){
        return s.replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace(/([^\\]\\n)/g, '<br>')
                .replace(/\\t/g, '&nbsp')
                .replace(/\\"+/g, '"')
    },
    push_if_new: function(array, val){
        if(array.indexOf(val) === -1){
            array.push(val)
        }
    }
}

/**
 * A component to mimicks the gdb console.
 * It stores previous commands, and allows you to enter new ones.
 * It also displays any console output.
 */
const GdbConsoleComponent = {
    el: $('#console'),
    init: function(){
        $('.clear_console').click(GdbConsoleComponent.clear_console)
        $("body").on("click", ".sent_command", GdbConsoleComponent.click_sent_command)
    },
    clear_console: function(){
        GdbConsoleComponent.el.html('')
    },
    add: function(s, stderr=false){
        let strings = _.isString(s) ? [s] : s,
            cls = stderr ? 'stderr' : ''
        strings.map(string => GdbConsoleComponent.el.append(`<p class='margin_sm output ${cls}'>${Util.escape(string)}</p>`))
    },
    add_sent_commands(cmds){
        if(!_.isArray(cmds)){
            cmds = [cmds]
        }
        cmds.map(cmd => GdbConsoleComponent.el.append(`<p class='margin_sm output sent_command pointer' data-cmd="${cmd}">${Util.escape(cmd)}</p>`))
        GdbConsoleComponent.scroll_to_bottom()
    },
    scroll_to_bottom: function(){
        GdbConsoleComponent.el.animate({'scrollTop': GdbConsoleComponent.el.prop('scrollHeight')})
    },
    click_sent_command: function(e){
        // when a previously sent command is clicked, populate the command input
        // with it
        let previous_cmd_from_history = (e.currentTarget.dataset.cmd)
        GdbCommandInput.set_input_text(previous_cmd_from_history)
    },
}

/**
 * A component to display, in gory detail, what is
 * returned from gdb's machine interface. This displays the
 * data source that is fed to all components and UI elements
 * in gdb gui, and is useful when debugging gdbgui, or
 * a command that failed but didn't have a useful failure
 * message in gdbgui.
 */
const GdbMiOutput = {
    el: $('#gdb_mi_output'),
    init: function(){
        $('.clear_mi_output').click(GdbMiOutput.clear)
        if(!debug){
            GdbMiOutput.el.html('this widget is only enabled in debug mode')
        }
    },
    clear: function(){
        GdbMiOutput.el.html('')
    },
    add_mi_output: function(mi_obj){
        if(debug){
            let mi_obj_dump = JSON.stringify(mi_obj, null, 4)
            mi_obj_dump = mi_obj_dump.replace(/[^(\\)]\\n/g).replace("<", "&lt;").replace(">", "&gt;")
            GdbMiOutput.el.append(`<p class='pre margin_sm output'>${mi_obj.type}:<br>${mi_obj_dump}</span>`)
            return
        }else{
            // dont append to this in release mode
        }
    },
    scroll_to_bottom: function(){
        GdbMiOutput.el.animate({'scrollTop': GdbMiOutput.el.prop('scrollHeight')})
    }
}

/**
 * The breakpoint table component
 */
const Breakpoint = {
    el: $('#breakpoints'),
    init: function(){
        $("body").on("click", ".toggle_breakpoint_enable", Breakpoint.toggle_breakpoint_enable)
        Breakpoint.render()
        window.addEventListener('event_global_state_changed', Breakpoint.event_global_state_changed)
    },
    toggle_breakpoint_enable: function(e){
        if($(e.currentTarget).prop('checked')){
            GdbApi.run_gdb_command([`-break-enable ${e.currentTarget.dataset.breakpoint_num}`, '-break-list'])
        }else{
            GdbApi.run_gdb_command([`-break-disable ${e.currentTarget.dataset.breakpoint_num}`, '-break-list'])
        }
    },
    event_global_state_changed: function(){
        Breakpoint.render()
    },
    render: function(){
        let bkpt_html = ''
        for (let b of globals.state.breakpoints){
            let checked = b.enabled === 'y' ? 'checked' : ''
            , source_line = '(file not found)'

            if(!SourceCode.is_cached(b.fullname)){
                SourceCode.fetch_file(b.fullname)
                return
            }

            source_line = `
            <span class='monospace' style='white-space: nowrap; font-size: 0.9em;'>
                ${SourceCode.get_source_file_obj_from_cache(b.fullname).source_code[b.line - 1]}
            </span>
            <br>`


            bkpt_html += `
            <span ${SourceCode.get_attrs_to_view_file(b.fullname, b.line, '', 'false')}>
                <div class=breakpoint>
                    <input type='checkbox' ${checked} class='toggle_breakpoint_enable' data-breakpoint_num='${b.number}'/>
                    <span>
                        ${b.func}:${b.line}
                    </span>
                    <span style='color: #bbbbbb; font-style: italic;'>
                        thread groups: ${b['thread-groups']}
                    </span>

                    ${Breakpoint.get_delete_breakpoint_link(b.number, "<span class='glyphicon glyphicon-trash breakpoint_trashcan'> </span>")}
                    <br>
                    ${source_line}
                </div>
            </span>
            `
        }

        if(bkpt_html === ''){
            bkpt_html = '<span class=placeholder>no breakpoints</span>'
        }
        Breakpoint.el.html(bkpt_html)
    },
    remove_breakpoint_if_present: function(fullname, line){
        for (let b of globals.state.breakpoints){
            if (b.fullname === fullname && b.line === line){
                let cmd = [`-break-delete ${b.number}`, '-break-list']
                GdbApi.run_gdb_command(cmd)
            }
        }
    },
    get_delete_breakpoint_link: function(breakpoint_number, text='remove'){
        return `<a class="gdb_cmd pointer" data-cmd0="-break-delete ${breakpoint_number}" data-cmd1="-break-list">${text}</a>`
    },
    get_breakpoint_lines_for_file: function(fullname){
        return globals.state.breakpoints.filter(b => b.fullname === fullname && b.enabled === 'y').map(b => parseInt(b.line))
    },
    get_disabled_breakpoint_lines_for_file: function(fullname){
        return globals.state.breakpoints.filter(b => b.fullname === fullname && b.enabled !== 'y').map(b => parseInt(b.line))
    },
}

/**
 * The source code component
 */
const SourceCode = {
    el: $('#code_table'),
    el_code_container: $('#code_container'),
    el_title: $('#source_code_heading'),
    el_jump_to_line_input: $('#jump_to_line'),
    init: function(){
        $("body").on("click", ".source_code_row td.line_num", SourceCode.click_gutter)
        $("body").on("click", ".view_file", SourceCode.click_view_file)
        $('#checkbox_show_assembly').change(SourceCode.show_assembly_checkbox_changed)
        $('#refresh_cached_source_files').click(SourceCode.refresh_cached_source_files)
        SourceCode.el_jump_to_line_input.keydown(SourceCode.keydown_jump_to_line)

        window.addEventListener('event_inferior_program_exited', SourceCode.event_inferior_program_exited)
        window.addEventListener('event_inferior_program_running', SourceCode.event_inferior_program_running)
        window.addEventListener('event_global_state_changed', SourceCode.event_global_state_changed)
    },
    event_inferior_program_exited: function(e){
        SourceCode.remove_line_highlights()
        SourceCode.clear_cached_source_files()
    },
    event_inferior_program_running: function(e){
        SourceCode.remove_line_highlights()
    },
    event_global_state_changed: function(){
        SourceCode.render()
    },
    click_gutter: function(e){
        let line = e.currentTarget.dataset.line
        if(e.currentTarget.classList.contains('breakpoint') || e.currentTarget.classList.contains('breakpoint_disabled')){
            // clicked gutter with a breakpoint, remove it
            Breakpoint.remove_breakpoint_if_present(globals.state.rendered_source_file_fullname, line)

        }else{
            // clicked with no breakpoint, add it, and list all breakpoints to make sure breakpoint table is up to date
            let cmd = [`-break-insert ${globals.state.rendered_source_file_fullname}:${line}`, '-break-list']
            GdbApi.run_gdb_command(cmd)
        }
    },
    is_cached: function(fullname){
        return globals.state.cached_source_files.some(f => f.fullname === fullname)
    },
    get_cached_assembly_for_file: function(fullname){
        for(let file of globals.state.cached_source_files){
            if(file.fullname === fullname){
                return file.assembly
            }
        }
        return null
    },
    refresh_cached_source_files: function(e){
        SourceCode.clear_cached_source_files()
        SourceCode.render()
    },
    clear_cached_source_files: function(){
        globals.state.cached_source_files = []
    },
    /**
     * Return html that can be displayed alongside source code
     * @param show_assembly: Boolean
     * @param assembly: Array of assembly data
     * @param line_num: line for which assembly html should be returned
     * @returns two <td> html elements with appropriate assembly code
     */
    get_assembly_html_for_line: function(show_assembly, assembly, line_num, addr){
        let instruction_content = [],
            func_and_addr_content = []

        if(show_assembly && assembly[line_num]){

            let instructions_for_this_line = assembly[line_num]
            for(let i of instructions_for_this_line){
                let cls = (addr === i.address) ? 'current_assembly_command assembly' : 'assembly'
                , addr_link = Memory.make_addr_into_link(i.address)
                , instruction = Memory.make_addrs_into_links(i.inst)
                instruction_content.push(`
                    <span style="white-space: nowrap;" class='${cls}' data-addr=${i.address}>
                        ${instruction} ${i['func-name']}+${i['offset']} ${addr_link}
                    </span>`)
                // i.e. mov $0x400684,%edi main+8 0x0000000000400585
            }

            instruction_content = instruction_content.join('<br>')
        }

        return `
        <td valign="top" class='assembly'>
            ${instruction_content}
        </td>`
    },
    /**
     * Show modal warning if user is trying to show a file that was modified after the binary was compiled
     */
    show_modal_if_file_modified_after_binary(fullname){
        let obj = SourceCode.get_source_file_obj_from_cache(fullname)
        if(obj && globals.state.inferior_binary_path){
            if((obj.last_modified_unix_sec > globals.state.inferior_binary_path_last_modified_unix_sec)
                    && globals.state.warning_shown_for_old_binary !== true){
                Modal.render('Warning', `A source file was modified <bold>after</bold> the binary was compiled. Recompile the binary, then try again. Otherwise the source code may not
                    match the binary.
                    <p>
                    <p>Source file: ${fullname}, modified ${moment(obj.last_modified_unix_sec * 1000).format(DATE_FORMAT)}
                    <p>Binary: ${globals.state.inferior_binary_path}, modified ${moment(globals.state.inferior_binary_path_last_modified_unix_sec * 1000).format(DATE_FORMAT)}`)
                globals.state.warning_shown_for_old_binary = true
            }
        }
    },
    /**
     * Render a cached source file
     */
    render_cached_source_file: function(fullname, source_code, scroll_to_line=1, addr=undefined){

    },
    make_current_line_visible: function(){
        SourceCode.scroll_to_jq_selector($("#scroll_to_line"))
    },
    render: function(){
        let fullname = globals.state.fullname_to_render
        , current_line_of_source_code = parseInt(globals.state.current_line_of_source_code)
        , addr = globals.state.current_assembly_address

        if(globals.state.fullname_to_render === null){
            return
        }else if(!SourceCode.is_cached(globals.state.fullname_to_render)){
            SourceCode.fetch_file(globals.state.fullname_to_render)
            return
        }

        let f = _.find(globals.state.cached_source_files, i => i.fullname === fullname)
        let source_code = f.source_code

        SourceCode.show_modal_if_file_modified_after_binary(fullname)

        let assembly,
            show_assembly = SourceCode.show_assembly_box_is_checked()

        // don't re-render all the lines if they are already rendered.
        // just update breakpoints and line highlighting
        if(fullname === globals.state.rendered_source_file_fullname){
            if((!show_assembly && globals.state.rendered_assembly === false) || (show_assembly && globals.state.rendered_assembly === true)) {
                SourceCode.highlight_paused_line_and_scrollto_line(fullname, globals.state.current_line_of_source_code, addr)
                SourceCode.render_breakpoints()
                SourceCode.make_current_line_visible()
                return
            }else{
                // user wants to see assembly but it hasn't been rendered yet,
                // so continue on
            }
        }

        if(show_assembly){
            assembly = SourceCode.get_cached_assembly_for_file(fullname)
            if(!assembly){
                SourceCode.fetch_disassembly(fullname)
                return  // when disassembly is returned, the source file will be rendered
            }
        }

        let line_num = 1,
            tbody = []

        for (let line of source_code){
            line = line.replace("<", "&lt;")
            line = line.replace(">", "&gt;")

            let assembly_for_line = SourceCode.get_assembly_html_for_line(show_assembly, assembly, line_num, addr)

            tbody.push(`
                <tr class='source_code_row'>
                    <td valign="top" class='line_num right_border' data-line=${line_num} style='width: 30px;'>
                        <div>${line_num}</div>
                    </td>

                    <td valign="top" class='line_of_code' data-line=${line_num}>
                        <pre style='white-space: pre-wrap;'>${line}</pre>
                    </td>

                    ${assembly_for_line}
                </tr>
                `)
            line_num++;
        }
        SourceCode.el_title.text(fullname)
        SourceCode.el.html(tbody.join(''))
        SourceCode.render_breakpoints()
        SourceCode.highlight_paused_line_and_scrollto_line()


        globals.update_state('rendered_source_file_fullname', fullname)
        globals.update_state('rendered_assembly', show_assembly)
    },
    // re-render breakpoints on whichever file is loaded
    render_breakpoints: function(){
        document.querySelectorAll('.line_num.breakpoint').forEach(el => el.classList.remove('breakpoint'))
        document.querySelectorAll('.line_num.disabled_breakpoint').forEach(el => el.classList.remove('disabled_breakpoint'))
        if(_.isString(globals.state.rendered_source_file_fullname)){

            let bkpt_lines = Breakpoint.get_breakpoint_lines_for_file(globals.state.rendered_source_file_fullname)
            , disabled_breakpoint_lines = Breakpoint.get_disabled_breakpoint_lines_for_file(globals.state.rendered_source_file_fullname)

            for(let bkpt_line of bkpt_lines){
                let js_line = $(`td.line_num[data-line=${bkpt_line}]`)[0]
                if(js_line){
                    $(js_line).addClass('breakpoint')
                }
            }

            for(let bkpt_line of disabled_breakpoint_lines){
                let js_line = $(`td.line_num[data-line=${bkpt_line}]`)[0]
                if(js_line){
                    $(js_line).addClass('disabled_breakpoint')
                }
            }
        }
    },
    /**
     * Scroll to a jQuery selection in the source code table
     * Used to jump around to various lines
     */
    scroll_to_jq_selector: function(jq_selector){
        if (jq_selector.length === 1){  // make sure something is selected before trying to scroll to it
            let top_of_container = SourceCode.el_code_container.position().top,
                height_of_container = SourceCode.el_code_container.height(),
                bottom_of_container = top_of_container + height_of_container,
                top_of_line = jq_selector.position().top,
                bottom_of_line = top_of_line+ jq_selector.height(),
                top_of_table = jq_selector.closest('table').position().top

            if ((top_of_line >= top_of_container) && (bottom_of_line < (bottom_of_container))){
                // do nothing, it's already in view
            }else{
                // line is out of view, scroll so it's in the middle of the table
                const time_to_scroll = 0
                SourceCode.el_code_container.animate({'scrollTop': top_of_line - (top_of_table + height_of_container/2)}, time_to_scroll)
            }
        }else{
            // nothing to scroll to
        }
    },
    /**
     * Current line has an id in the DOM and a variable
     * Remove the id and highlighting in the DOM, and set the
     * variable to null
     */
    remove_line_highlights: function(){
        $('#scroll_to_line').removeAttr('id')
        document.querySelectorAll('.flash').forEach(el => el.classList.remove('flash'))
        document.querySelectorAll('.current_assembly_command').forEach(el => el.classList.remove('current_assembly_command'))
        document.querySelectorAll('.paused_on_line').forEach(el => el.classList.remove('paused_on_line'))
    },
    highlight_paused_line_and_scrollto_line: function(){
        SourceCode.remove_line_highlights()

        let fullname = globals.state.rendered_source_file_fullname
        , line_num = globals.state.current_line_of_source_code
        , addr = globals.state.current_assembly_address
        , inferior_program_is_paused_in_this_file = _.isObject(globals.state.paused_on_frame) && globals.state.paused_on_frame.fullname === fullname
        , paused_on_current_line = (inferior_program_is_paused_in_this_file && parseInt(globals.state.paused_on_frame.line) === parseInt(line_num))

        // make background blue if gdb is paused on a line in this file
        if(inferior_program_is_paused_in_this_file){
            let jq_line = $(`.line_of_code[data-line=${globals.state.paused_on_frame.line}]`)
            if(jq_line.length === 1){
                jq_line.offset()  // needed so DOM registers change and re-draws animation
                jq_line.addClass('paused_on_line')
                if(paused_on_current_line){
                    jq_line.attr('id', 'scroll_to_line')
                }
            }
        }

        // make this line flash ONLY if it's NOT the line we're paused on
        if(line_num && !paused_on_current_line){
            let jq_line = $(`.line_of_code[data-line=${line_num}]`)
            if(jq_line.length === 1){
                // https://css-tricks.com/restart-css-animation/
                jq_line.offset()  // needed so DOM registers change and re-draws animation
                jq_line.addClass('flash')
                jq_line.attr('id', 'scroll_to_line')
            }
        }

        if(addr){
            // find element with assembly class and data-addr as the desired address, and
            // current_assembly_command class
            let jq_assembly = $(`.assembly[data-addr=${addr}]`)
            if(jq_assembly.length === 1){
                jq_assembly.addClass('current_assembly_command')
            }
        }

        SourceCode.make_current_line_visible()
    },
    fetch_file: function(fullname){
        if(globals.state.files_being_fetched.indexOf(fullname) === -1){
            globals.state.files_being_fetched.push(fullname)
            globals.update_state('files_being_fetched', globals.state.files_being_fetched)
        }else{
            return
        }

        debug_print('fetching '+ fullname)
        $.ajax({
            url: "/read_file",
            cache: false,
            type: 'GET',
            data: {path: fullname},
            success: function(response){
                SourceCode.add_source_file_to_cache(fullname, response.source_code, '', response.last_modified_unix_sec)
            },
            error: function(response){
                StatusBar.render_ajax_error_msg(response)
                let source_code = [`failed to fetch file ${fullname}`]
                SourceCode.add_source_file_to_cache(fullname, source_code, '', 0)
            },
            complete: function(){
                _.pull(globals.state.files_being_fetched, fullname)
            }
        })
    },
    add_source_file_to_cache: function(fullname, source_code, assembly, last_modified_unix_sec){
        globals.add_source_file_to_cache({'fullname': fullname, 'source_code': source_code, 'assembly': assembly,
            'last_modified_unix_sec': last_modified_unix_sec})
    },
    get_source_file_obj_from_cache(fullname){
        for(let sf of globals.state.cached_source_files){
            if (sf.fullname === fullname){
                return sf
            }
        }
        return null
    },
    /**
     * gdb changed its api for the data-disassemble command
     * see https://www.sourceware.org/gdb/onlinedocs/gdb/GDB_002fMI-Data-Manipulation.html
     * TODO not sure which version this change occured in. I know in 7.7 it needs the '3' option,
     * and in 7.11 it needs the '4' option. I should test the various version at some point.
     */
    get_dissasembly_format_num: function(gdb_version){
        if(gdb_version === undefined){
            // assuming new version, but we shouldn't ever not know the version...
            return 4
        } else if (gdb_version <= 7.7){
            // this option has been deprecated in newer versions, but is required in older ones
            //
            return 3
        }else{
            return 4
        }
    },
    get_fetch_disassembly_command: function(fullname=null){
        let _fullname = fullname || globals.state.rendered_source_file_fullname
        if(_fullname){
            let mi_response_format = SourceCode.get_dissasembly_format_num(globals.state.gdb_version)
            return `-data-disassemble -f ${_fullname} -l 1 -- ${mi_response_format}`
        }else{
            // we don't have a file to fetch disassembly for
            return null
        }
    },
    show_assembly_box_is_checked: function(){
        return $('#checkbox_show_assembly').prop('checked')
    },
    /**
     * Fetch disassembly for current file/line. An error is raised
     * if gdbgui doesn't have that state saved.
     */
    show_assembly_checkbox_changed: function(e){
        SourceCode.render()
    },
    fetch_disassembly: function(fullname){
        let cmd = SourceCode.get_fetch_disassembly_command(fullname)
        if(cmd){
           GdbApi.run_gdb_command(cmd)
        }
    },
    /**
     * Save assembly and render source code if desired
     */
    save_new_assembly: function(mi_assembly){
        if(!_.isArray(mi_assembly) || mi_assembly.length === 0){
            console.error("Attempted to save unexpected assembly")
        }

        let assembly_to_save = {}
        for(let obj of mi_assembly){
            assembly_to_save[parseInt(obj.line)] = obj.line_asm_insn
        }

        let fullname = mi_assembly[0].fullname
        for (let cached_file of globals.state.cached_source_files){
            if(cached_file.fullname === fullname){
                cached_file.assembly = assembly_to_save
                if (globals.state.rendered_source_file_fullname === fullname){
                    // re render with our new disassembly
                    SourceCode.render()
                }
                break
            }
        }
    },
    /**
     * Something in DOM triggered this callback to view a file.
     * The current target must have data embedded in it with:
     * fullname: full path of source code file to view
     * line (optional): line number to scroll to
     * hightlight (default: 'false'): if 'true', the line is highlighted
     */
    click_view_file: function(e){
        globals.update_state('fullname_to_render', e.currentTarget.dataset['fullname'])
        globals.update_state('current_line_of_source_code', e.currentTarget.dataset['line'])
        globals.update_state('current_assembly_address', e.currentTarget.dataset['addr'])

    },
    keydown_jump_to_line: function(e){
        if (e.keyCode === ENTER_BUTTON_NUM){
            let line = e.currentTarget.value
            SourceCode.jump_to_line(line)
        }
    },
    jump_to_line: function(line){
        let obj = SourceCode.get_source_file_obj_from_cache(globals.state.rendered_source_file_fullname)
        if(obj){
            // sanitize user line request to be within valid bounds:
            // 1 <= line <= num_lines
            let num_lines = obj.source_code.length
            , _line = line
            if(line > num_lines){
                _line = num_lines
            }else if (line <= 0){
                _line = 1
            }

            SourceCode.highlight_paused_line_and_scrollto_line(globals.state.rendered_source_file_fullname, _line, globals.state.rendered_source_file_addr)
        }
    },
    get_attrs_to_view_file: function(fullname, line=0, addr=''){
        return `class='view_file pointer' data-fullname=${fullname} data-line=${line} data-addr=${addr}`
    },
    get_link_to_view_file: function(fullname, line=0, addr='', text='View'){
        // create local copies so we don't modify the references
        let _fullname = fullname
            , _line = line
            , _addr = addr
            , _text = text
        return `<a class='view_file pointer' data-fullname=${_fullname} data-line=${_line} data-addr=${_addr}>${_text}</a>`
    }
}

/**
 * The autocomplete dropdown of source files is complicated enough
 * to have its own component. It uses the awesomeplete library,
 * which is really nice: https://leaverou.github.io/awesomplete/
 */
const SourceFileAutocomplete = {
    el: $('#source_file_input'),
    init: function(){
        SourceFileAutocomplete.el.keyup(SourceFileAutocomplete.keyup_source_file_input)

        // initialize list of source files
        SourceFileAutocomplete.input = new Awesomplete('#source_file_input', {
            minChars: 0,
            maxItems: 10000,
            list: [],
            // standard sort algorithm (the default Awesomeplete sort is weird)
            sort: (a, b) => {return a < b ? -1 : 1;}
        })

        // when dropdown button is clicked, toggle showing/hiding it
        Awesomplete.$('.dropdown-btn').addEventListener("click", function() {
            if (SourceFileAutocomplete.input.ul.childNodes.length === 0) {
                SourceFileAutocomplete.input.evaluate()
            }
            else if (SourceFileAutocomplete.input.ul.hasAttribute('hidden')) {
                SourceFileAutocomplete.input.open()
            }
            else {
                SourceFileAutocomplete.input.close()
            }
        })

        // perform action when an item is selected
         Awesomplete.$('#source_file_input').addEventListener('awesomplete-selectcomplete', function(e){
            let fullname = e.currentTarget.value
            globals.update_state('fullname_to_render', fullname)
            globals.update_state('current_line_of_source_code', 1)
            globals.update_state('current_assembly_address', '')
        })
    },
    keyup_source_file_input: function(e){
        if (e.keyCode === ENTER_BUTTON_NUM){
            let user_input = _.trim(e.currentTarget.value)

            if(user_input.length === 0){
                return
            }

            // if user enterted "/path/to/file.c:line", be friendly and parse out the line for them
            let user_input_array = user_input.split(':'),
                fullname = user_input_array[0],
                line = 1
            if(user_input_array.length === 2){
                line = user_input_array[1]
            }

            globals.update_state('fullname_to_render',fullname)
            globals.update_state('current_line_of_source_code', line)
            globals.update_state('current_assembly_address', '')
        }
    }
}

/**
 * The Registers component
 */
const Registers = {
    el: $('#registers'),
    init: function(){
        Registers.render_not_paused()
        window.addEventListener('event_inferior_program_exited', Registers.event_inferior_program_exited)
        window.addEventListener('event_inferior_program_running', Registers.event_inferior_program_running)
        window.addEventListener('event_global_state_changed', Registers.event_global_state_changed)
    },
    get_update_cmds: function(){
        let cmds = []
        if(globals.state.register_names.length === 0){
            // only fetch register names when we don't have them
            // assumption is that the names don't change over time
            cmds.push('-data-list-register-names')
        }
        // update all registers values
        cmds.push('-data-list-register-values x')
        return cmds
    },
    render_not_paused: function(){
        Registers.el.html('<span class=placeholder>not paused</span>')
    },
    cache_register_names: function(names){
        // filter out non-empty names
        globals.state.register_names = names.filter(name => name)
    },
    clear_cached_values: function(){
        globals.state.previous_register_values = {}
        globals.state.current_register_values = {}
    },
    event_inferior_program_exited: function(){
        Registers.render_not_paused()
        Registers.clear_cached_values()
    },
    event_inferior_program_running: function(){
        Registers.render_not_paused()
    },
    event_global_state_changed: function(){
        Registers.render()
    },
    render: function(){
        if(globals.state.register_names.length === Object.keys(globals.state.current_register_values).length){
            let columns = ['name', 'value (hex)', 'value (decimal)']
            , register_table_data = []
            , hex_val_raw = ''

            for (let i in globals.state.register_names){
                let name = globals.state.register_names[i]
                    , obj = _.find(globals.state.current_register_values, v => v['number'] === i)
                    , hex_val_raw = ''
                    , disp_hex_val = ''
                    , disp_dec_val = ''

                if (obj){
                    hex_val_raw = obj['value']

                    let old_obj = _.find(globals.state.previous_register_values, v => v['number'] === i)
                    , old_hex_val_raw
                    , changed = false
                    if(old_obj) {old_hex_val_raw = old_obj['value']}

                    // if the value changed, highlight it
                    if(old_hex_val_raw !== undefined && hex_val_raw !== old_hex_val_raw){
                        changed = true
                    }

                    // if hex value is a valid value, convert it to a link
                    // and display decimal format too
                    if(obj['value'].indexOf('0x') === 0){
                       disp_hex_val = Memory.make_addr_into_link(hex_val_raw)
                       disp_dec_val = parseInt(obj['value'], 16).toString(10)
                    }

                    if (changed){
                        name = `<span class='highlight bold'>${name}</span>`
                        disp_hex_val = `<span class='highlight bold'>${disp_hex_val}</span>`
                        disp_dec_val = `<span class='highlight bold'>${disp_dec_val}</span>`
                    }

                }

                register_table_data.push([name, disp_hex_val, disp_dec_val])
            }

            Registers.el.html(Util.get_table(columns, register_table_data, 'font-size: 0.9em;'))
        }
    }
}

/**
 * Preferences object
 * The intent of this is to have UI inputs that set and store
 * preferences. These preferences will be saved to localStorage
 * between sessions. (This is still in work)
 */
const Settings = {
    el: $('#gdbgui_settings_button'),
    init: function(){
        Settings.el.click(Settings.click_settings_button)
        $.ajax({
            url: "https://raw.githubusercontent.com/cs01/gdbgui/master/gdbgui/VERSION.txt",
            cache: false,
            method: 'GET',
            success: (data) => {globals.update_state('latest_gdbgui_version', _.trim(data))},
            error: (data) => {globals.update_state('latest_gdbgui_version', '(could not contact server)')},
            complete: function(){
                if(globals.state.latest_gdbgui_version !== globals.state.gdbgui_version){
                    $('#new_version').html(`A new version is available, ${globals.state.latest_gdbgui_version}. Install with <span class='monospace bold'>pip install gdbgui --upgrade</span>`)

                }else{
                    $('#new_version').html(`There are no updates available at this time.`)

                }
            }
        })


    },
    click_settings_button: function(){
        $('#gdb_settings_modal').modal('show')
    },
    auto_add_breakpoint_to_main: function(){
        return $('#checkbox_auto_add_breakpoint_to_main').prop('checked')
    }
}

/**
 * The BinaryLoader component allows the user to select their binary
 * and specify inputs
 */
const BinaryLoader = {
    el: $('#binary'),
    el_past_binaries: $('#past_binaries'),
    init: function(){
        // events
        $('#set_target_app').click(BinaryLoader.click_set_target_app)
        BinaryLoader.el.keydown(BinaryLoader.keydown_on_binary_input)

        try{
            BinaryLoader.past_binaries = _.uniq(JSON.parse(localStorage.getItem('past_binaries')))
            BinaryLoader.render(BinaryLoader.past_binaries[0])
        } catch(err){
            BinaryLoader.past_binaries = []
        }
        // update list of old binarys
        BinaryLoader.render_past_binary_options_datalist()
    },
    past_binaries: [],
    onclose: function(){
        localStorage.setItem('past_binaries', JSON.stringify(BinaryLoader.past_binaries) || [])
        return null
    },
    keydown_on_binary_input: function(e){
        if(e.keyCode === ENTER_BUTTON_NUM) {
            BinaryLoader.set_target_app()
        }
    },
    render_past_binary_options_datalist: function(){
        BinaryLoader.el_past_binaries.html(BinaryLoader.past_binaries.map(b => `<option>${b}</option`))
    },
    click_set_target_app: function(e){
        BinaryLoader.set_target_app()
    },
    /**
     * Set the target application and arguments based on the
     * current fields in the DOM
     */
    set_target_app: function(){
        var binary_and_args = _.trim(BinaryLoader.el.val())

        if (_.trim(binary_and_args) === ''){
            StatusBar.render('enter a binary path and arguments before attempting to load')
            return
        }

        // save to list of binaries used that autopopulates the input dropdown
        _.remove(BinaryLoader.past_binaries, i => i === binary_and_args)
        BinaryLoader.past_binaries.unshift(binary_and_args)
        BinaryLoader.render_past_binary_options_datalist()

        // find the binary and arguments so gdb can be told which is which
        let binary, args, cmds
        let index_of_first_space = binary_and_args.indexOf(' ')
        if( index_of_first_space === -1){
            binary = binary_and_args
            args = ''
        }else{
            binary = binary_and_args.slice(0, index_of_first_space)
            args = binary_and_args.slice(index_of_first_space + 1, binary_and_args.length)
        }

        // tell gdb which arguments to use when calling the binary, before loading the binary
        cmds = [
                // '-file-symbol-file', // clears gdb's symbol table info
                `-exec-arguments ${args}`, // Set the inferior program arguments, to be used in the next `-exec-run`
                `-file-exec-and-symbols ${binary}`,  // Specify the executable file to be debugged. This file is the one from which the symbol table is also read
                '-file-list-exec-source-files', // List the source files for the current executable
                ]

        // add breakpoint if we don't already have one
        if(Settings.auto_add_breakpoint_to_main()){
            cmds.push('-break-insert main')
        }
        cmds.push('-break-list')

        window.dispatchEvent(new Event('event_inferior_program_exited'))
        GdbApi.run_gdb_command(cmds)

        globals.state.inferior_binary_path = binary
        GdbApi.get_inferior_binary_last_modified_unix_sec(binary)
    },
    render: function(binary){
        BinaryLoader.el.val(binary)
    },
}

/**
 * The GdbCommandInput component
 */
const GdbCommandInput = {
    el: $('#gdb_command_input'),
    init: function(){
        GdbCommandInput.el.keydown(GdbCommandInput.keydown_on_gdb_cmd_input)
        $('.run_gdb_command').click(GdbCommandInput.run_current_command)
    },
    keydown_on_gdb_cmd_input: function(e){
        if(e.keyCode === ENTER_BUTTON_NUM) {
            GdbCommandInput.run_current_command()
        }
    },
    run_current_command: function(){
        let cmd = GdbCommandInput.el.val()
        GdbCommandInput.clear()
        GdbConsoleComponent.add_sent_commands(cmd)
        GdbApi.run_gdb_command(cmd)
    },
    set_input_text: function(new_text){
        GdbCommandInput.el.val(new_text)
    },
    make_flash: function(){
        GdbCommandInput.el.removeClass('flash')
        GdbCommandInput.el.addClass('flash')
    },
    clear: function(){
        GdbCommandInput.el.val('')
    }
}

/**
 * The Memory component allows the user to view
 * data stored at memory locations
 */
const Memory = {
    el: $('#memory'),
    el_start: $('#memory_start_address'),
    el_end: $('#memory_end_address'),
    el_bytes_per_line: $('#memory_bytes_per_line'),
    MAX_ADDRESS_DELTA_BYTES: 1000,
    DEFAULT_ADDRESS_DELTA_BYTES: 31,
    init: function(){
        $("body").on("click", ".memory_address", Memory.click_memory_address)
        $("body").on("click", "#read_preceding_memory", Memory.click_read_preceding_memory)
        $("body").on("click", "#read_more_memory", Memory.click_read_more_memory)
        Memory.el_start.keydown(Memory.keydown_in_memory_inputs)
        Memory.el_end.keydown(Memory.keydown_in_memory_inputs)
        Memory.el_bytes_per_line.keydown(Memory.keydown_in_memory_inputs)
        Memory.render()

        window.addEventListener('event_inferior_program_exited', Memory.event_inferior_program_exited)
        window.addEventListener('event_inferior_program_running', Memory.event_inferior_program_running)
        window.addEventListener('event_inferior_program_paused', Memory.event_inferior_program_paused)
        window.addEventListener('event_global_state_changed', Memory.event_global_state_changed)
    },
    keydown_in_memory_inputs: function(e){
        if (e.keyCode === ENTER_BUTTON_NUM){
            Memory.fetch_memory_from_inputs()
        }
    },
    click_memory_address: function(e){
        e.stopPropagation()

        let addr = e.currentTarget.dataset['memory_address']
        // set inputs in DOM
        Memory.el_start.val('0x' + (parseInt(addr, 16)).toString(16))
        Memory.el_end.val('0x' + (parseInt(addr,16) + Memory.DEFAULT_ADDRESS_DELTA_BYTES).toString(16))

        // fetch memory from whatever's in DOM
        Memory.fetch_memory_from_inputs()
    },
    get_gdb_commands_from_inputs: function(){
        let start_addr = parseInt(_.trim(Memory.el_start.val()), 16),
            end_addr = parseInt(_.trim(Memory.el_end.val()), 16)

        if(!window.isNaN(start_addr) && window.isNaN(end_addr)){
            end_addr = start_addr + Memory.DEFAULT_ADDRESS_DELTA_BYTES
        }

        let cmds = []
        if(start_addr && end_addr){
            if(start_addr > end_addr){
                end_addr = start_addr + Memory.DEFAULT_ADDRESS_DELTA_BYTES
                Memory.el_end.val('0x' + end_addr.toString(16))
            }else if((end_addr - start_addr) > Memory.MAX_ADDRESS_DELTA_BYTES){
                end_addr = start_addr + Memory.MAX_ADDRESS_DELTA_BYTES
                Memory.el_end.val('0x' + end_addr.toString(16))
            }

            let cur_addr = start_addr
            while(cur_addr <= end_addr){
                cmds.push(`-data-read-memory-bytes ${'0x' + cur_addr.toString(16)} 1`)
                cur_addr = cur_addr + 1
            }
        }

        if(!window.isNaN(start_addr)){
            Memory.el_start.val('0x' + start_addr.toString(16))
        }
        if(!window.isNaN(end_addr)){
            Memory.el_end.val('0x' + end_addr.toString(16))
        }

        return cmds
    },
    fetch_memory_from_inputs: function(){
        let cmds = Memory.get_gdb_commands_from_inputs()
        Memory.clear_cache()
        GdbApi.run_gdb_command(cmds)
    },
    click_read_preceding_memory: function(){
        // update starting value, then re-fetch
        let NUM_ROWS = 3
        let start_addr = parseInt(_.trim(Memory.el_start.val()), 16)
        , byte_offset = Memory.el_bytes_per_line.val() * NUM_ROWS
        Memory.el_start.val('0x' + (start_addr - byte_offset).toString(16))
        Memory.fetch_memory_from_inputs()
    },
    click_read_more_memory: function(){
        // update ending value, then re-fetch
        let NUM_ROWS = 3
        let end_addr = parseInt(_.trim(Memory.el_end.val()), 16)
        , byte_offset = Memory.el_bytes_per_line.val() * NUM_ROWS
        Memory.el_end.val('0x' + (end_addr + byte_offset).toString(16))
        Memory.fetch_memory_from_inputs()
    },
    /**
     * Internal render function. Not called directly to avoid wasting DOM cycles
     * when memory is being received from gdb at a high rate.
     */
    _render: function(){
        if(_.keys(globals.state.memory_cache).length === 0){
            Memory.el.html('<span class=placeholder>no memory requested</span>')
            return
        }

        let data = []
        , hex_vals_for_this_addr = []
        , char_vals_for_this_addr = []
        , i = 0
        , hex_addr_to_display = null

        let bytes_per_line = (parseInt(Memory.el_bytes_per_line.val())) || 8
        bytes_per_line = Math.max(bytes_per_line, 1)
        $('#memory_bytes_per_line').val(bytes_per_line)

        if(Object.keys(globals.state.memory_cache).length > 0){
            data.push(['<span id=read_preceding_memory class=pointer style="font-style:italic; font-size: 0.8em;">more</span>',
                        '',
                        '']
            )
        }

        for (let hex_addr in globals.state.memory_cache){
            if(!hex_addr_to_display){
                hex_addr_to_display = hex_addr
            }

            if(i % (bytes_per_line) === 0 && hex_vals_for_this_addr.length > 0){
                // begin new row
                data.push([Memory.make_addr_into_link(hex_addr_to_display),
                    hex_vals_for_this_addr.join(' '),
                    char_vals_for_this_addr.join(' ')])

                // update which address we're collecting values for
                i = 0
                hex_addr_to_display = hex_addr
                hex_vals_for_this_addr = []
                char_vals_for_this_addr = []

            }
            let hex_value = globals.state.memory_cache[hex_addr]
            hex_vals_for_this_addr.push(hex_value)
            let char = String.fromCharCode(parseInt(hex_value, 16)).replace(/\W/g, '.')
            char_vals_for_this_addr.push(`<span class='memory_char'>${char}</span>`)
            i++

        }

        if(hex_vals_for_this_addr.length > 0){
            // memory range requested wasn't divisible by bytes per line
            // add the remaining memory
            data.push([Memory.make_addr_into_link(hex_addr_to_display),
                    hex_vals_for_this_addr.join(' '),
                    char_vals_for_this_addr.join(' ')])

        }

        if(Object.keys(globals.state.memory_cache).length > 0){
            data.push(['<span id=read_more_memory class=pointer style="font-style:italic; font-size: 0.8em;">more</span>',
                        '',
                        '']
            )
        }

        let table = Util.get_table(['address', 'hex' , 'char'], data)
        Memory.el.html(table)
    },
    render_not_paused: function(){
        Memory.el.html('<span class=placeholder>not paused</span>')
    },
    make_addr_into_link: function(addr, name=addr){
        let _addr = addr
            , _name = name
        return `<a class='pointer memory_address' data-memory_address='${_addr}'>${_name}</a>`
    },
    make_addrs_into_links: function(text){
        return text.replace(/(0x[\d\w]+)/g, Memory.make_addr_into_link('$1'))
    },
    add_value_to_cache: function(hex_str, hex_val){
        // strip leading zeros off address provided by gdb
        // i.e. 0x000123 turns to
        // 0x123
        let hex_str_truncated = '0x' + (parseInt(hex_str, 16)).toString(16)
        globals.state.memory_cache[hex_str_truncated] = hex_val
        Memory.render()
    },
    clear_cache: function(){
        globals.state.memory_cache = {}
    },
    event_inferior_program_exited: function(){
        Memory.clear_cache()
        Memory.render_not_paused()
    },
    event_inferior_program_running: function(){
        Memory.render_not_paused()
    },
    event_inferior_program_paused: function(){
        Memory.render()
    },
    event_global_state_changed: function(){
        Memory.render()
    }
}
/**
 * Memory data comes in fast byte by byte, so prevent rendering while more
 * memory is still being received
 */
Memory.render = _.debounce(Memory._render)

/**
 * The Expressions component allows the user to inspect expressions
 * stored as variables in gdb
 * see https://sourceware.org/gdb/onlinedocs/gdb/GDB_002fMI-Variable-Objects.html#GDB_002fMI-Variable-Objects
 *
 * gdb assigns a unique variable name for each expression the user wants evaluated
 * gdb returns
 */
const Expressions = {
    el: $('#expressions'),
    el_input: $('#expressions_input'),
    init: function(){
        // create new var when enter is pressed
        Expressions.el_input.keydown(Expressions.keydown_on_input)

        // remove var when icon is clicked
        $("body").on("click", ".delete_gdb_variable", Expressions.click_delete_gdb_variable)
        $("body").on("click", ".toggle_children_visibility", Expressions.click_toggle_children_visibility)
        Expressions.render()
    },
    state: {
        waiting_for_create_var_response: false,
        children_being_retrieve_for_var: null,
        expression_being_created: null,
        variables: []
    },
    /**
     * Locally save the variable to our cached variables
     */
    save_new_variable: function(expression, obj){
        let new_obj = Expressions.prepare_gdb_obj_for_storage(obj)
        new_obj.expression = expression
        Expressions.state.variables.push(new_obj)
    },
    /**
     * Get child variable with a particular name
     */
    get_child_with_name: function(children, name){
        for(let child of children){
            if(child.name === name){
                return child
            }
        }
        return undefined
    },
    /**
     * Get object from gdb variable name. gdb variable names are unique, and don't match
     * the expression being evaluated. If drilling down into fields of structures, the
     * gdb variable name has dot notation, such as 'var.field1.field2'.
     * @param gdb_var_name: gdb variable name to find corresponding cached object. Can have dot notation
     * @return: object if found, or undefined if not found
     */
    get_obj_from_gdb_var_name: function(gdb_var_name){
        // gdb provides names in dot notation
        let gdb_var_names = gdb_var_name.split('.'),
            top_level_var_name = gdb_var_names[0],
            children_names = gdb_var_names.slice(1, gdb_var_names.length)

        let objs = Expressions.state.variables.filter(v => v.name === top_level_var_name)

        if(objs.length === 1){
            // we found our top level object
            let obj = objs[0]
            let name_to_find = top_level_var_name
            for(let i = 0; i < (children_names.length); i++){
                // append the '.' and field name to find as a child of the object we're looking at
                name_to_find += `.${children_names[i]}`

                let child_obj = Expressions.get_child_with_name(obj.children, name_to_find)

                if(child_obj){
                    // our new object to search is this child
                    obj = child_obj
                }else{
                    console.error(`could not find ${name_to_find}`)
                }
            }
            return obj

        }else if (objs.length === 0){
            console.error(`Couldnt find gdb variable ${top_level_var_name}. This is likely because the page was refreshed, so gdb's variables are out of sync with the browsers variables.`)
            return undefined
        }else{
            console.error(`Somehow found multiple local gdb variables with the name ${top_level_var_name}. Not using any of them. File a bug report with the developer.`)
            return undefined
        }
    },
    keydown_on_input: function(e){
        if((e.keyCode === ENTER_BUTTON_NUM)) {
            let expr = Expressions.el_input.val()
            if(_.trim(expr) !== ''){
                Expressions.create_variable(Expressions.el_input.val())
            }
        }
    },
    /**
     * Create a new variable in gdb. gdb automatically assigns
     * a unique variable name. Use custom callback callback_after_create_variable to handle
     * gdb response
     */
    create_variable: function(expression){
        if(Expressions.waiting_for_create_var_response === true){
            StatusBar.render(`cannot create a new variable before finishing creation of expression "${Expressions.state.expression_being_created}"`)
            return
        }
        Expressions.state.waiting_for_create_var_response = true
        Expressions.expression_being_created = expression
        // - means auto assign variable name in gdb
        // * means evaluate it at the current frame
        // need to use custom callback due to stateless nature of gdb's response
        // Expressions.callback_after_create_variable
        GdbApi.run_gdb_command(`-var-create - * ${expression}`)
    },
    /**
     * gdb returns objects for its variables,, but before we save that
     * data locally, we want to add a little more metadata to make it more useful
     *
     * this method does the following:
     * - add the children array
     * - convert numchild string to integer
     * - store whether the object is expanded or collapsed in the ui
     */
    prepare_gdb_obj_for_storage: function(obj){
        let new_obj = jQuery.extend(true, {'children': [],
                                    'numchild': parseInt(obj.numchild),
                                    'show_children_in_ui': false,
                                    'in_scope': 'true', // this field will be returned by gdb mi as a string
                                }, obj)
        return new_obj
    },
    /**
     * After a variable is created, we need to link the gdb
     * variable name (which is automatically created by gdb),
     * and the expression the user wanted to evailuate. The
     * new variable is saved locally.
     *
     * The variable UI element is the re-rendered
     */
    gdb_created_root_variable: function(r){
        Expressions.state.waiting_for_create_var_response = false

        if(Expressions.expression_being_created){
            // example payload:
            // "payload": {
            //      "has_more": "0",
            //      "name": "var2",
            //      "numchild": "0",
            //      "thread-id": "1",
            //      "type": "int",
            //      "value": "0"
            //  },
            Expressions.save_new_variable(Expressions.expression_being_created, r.payload)
            Expressions.state.expression_being_created = null
            // automatically fetch first level of children for root variables
            Expressions.fetch_and_show_children_for_var(r.payload.name)
        }else{
            console.error('could no create new var')
        }

        Expressions.render()
    },
    /**
     * Got data regarding children of a gdb variable. It could be an immediate child, or grandchild, etc.
     * This method stores this child array data to the appropriate locally stored
     * object, then re-renders the Variable UI element.
     */
    gdb_created_children_variables: function(r){
        // example reponse payload:
        // "payload": {
        //         "has_more": "0",
        //         "numchild": "2",
        //         "children": [
        //             {
        //                 "name": "var9.a",
        //                 "thread-id": "1",
        //                 "numchild": "0",
        //                 "value": "4195840",
        //                 "exp": "a",
        //                 "type": "int"
        //             },
        //             {
        //                 "name": "var9.b",
        //                 "thread-id": "1",
        //                 "numchild": "0",
        //                 "value": "0",
        //                 "exp": "b",
        //                 "type": "float"
        //             },
        //         ]
        //     }

        let parent_name = Expressions.state.gdb_parent_var_currently_fetching_children
        Expressions.state.gdb_parent_var_currently_fetching_children = null

        // get the parent object of these children
        let parent_obj = Expressions.get_obj_from_gdb_var_name(parent_name)
        if(parent_obj){
            // prepare all the child objects we received for local storage
            let children = r.payload.children.map(child_obj => Expressions.prepare_gdb_obj_for_storage(child_obj))
            // save these children as a field to their parent
            parent_obj.children = children
        }

        // if this field is an anonymous struct, the user will want to
        // see this expanded by default
        for(let child of parent_obj.children){
            if (child.exp === '<anonymous struct>'){
                Expressions.fetch_and_show_children_for_var(child.name)
            }
        }
        // re-render
        Expressions.render()
    },
    render: function(){
        let html = ''
        const is_root = true
        for(let obj of Expressions.state.variables){
            if(obj.in_scope === 'true'){
                if(obj.numchild > 0) {
                    html += Expressions.get_ul_for_var_with_children(obj.expression, obj, is_root)
                }else{
                    html += Expressions.get_ul_for_var_without_children(obj.expression, obj, is_root)
                }
            }else if (obj.in_scope === 'invalid'){
                Expressions.delete_gdb_variable(obj.name)
            }
        }
        if(html === ''){
            html = '<span class=placeholder>no expressions in this context</span>'
        }
        Expressions.el.html(html)
    },
    /**
     * get unordered list for a variable that has children
     * @return unordered list, expanded or collapsed based on the key "show_children_in_ui"
     */
    get_ul_for_var_with_children: function(expression, mi_obj, is_root=false){
        let child_tree = ''
        if(mi_obj.show_children_in_ui){
            child_tree = '<ul>'
            if(mi_obj.children.length > 0){
                for(let child of mi_obj.children){
                    if(child.numchild > 0){
                        child_tree += `<li>${Expressions.get_ul_for_var_with_children(child.exp, child)}</li>`
                    }else{
                        child_tree += `<li>${Expressions.get_ul_for_var_without_children(child.exp, child)}</li>`
                    }
                }
            }else{
                child_tree += `<li><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate'></span></li>`
            }

            child_tree += '</ul>'
        }

        let plus_or_minus = mi_obj.show_children_in_ui ? '-' : '+'
        return Expressions._get_ul_for_var(expression, mi_obj, is_root, plus_or_minus, child_tree, mi_obj.show_children_in_ui, mi_obj.numchild)
    },
    get_ul_for_var_without_children: function(expression, mi_obj, is_root=false){
        return Expressions._get_ul_for_var(expression, mi_obj, is_root)
    },
    /**
     * Get ul for a variable with or without children
     * @param is_root: true if it has children and
     */
    _get_ul_for_var: function(expression, mi_obj, is_root, plus_or_minus='', child_tree='', show_children_in_ui=false, numchild=0){
        let
            delete_button = is_root ? `<span class='glyphicon glyphicon-trash delete_gdb_variable pointer' data-gdb_variable='${mi_obj.name}' />` : ''
            ,expanded = show_children_in_ui ? 'expanded' : ''
            ,toggle_classes = numchild > 0 ? 'toggle_children_visibility pointer' : ''
            ,val = (_.isString(mi_obj.value) && mi_obj.value.indexOf('0x') === 0) ? Memory.make_addr_into_link(mi_obj.value) : mi_obj.value

        return `<ul class='variable'>
            <li class='${toggle_classes} ${expanded}' data-gdb_variable_name='${mi_obj.name}'>
                ${plus_or_minus} ${expression}: ${val} <span class='var_type'>${_.trim(mi_obj.type)}</span> ${delete_button}
            </li>
            ${child_tree}
        </ul>
        `
    },
    fetch_and_show_children_for_var: function(gdb_var_name){
        let obj = Expressions.get_obj_from_gdb_var_name(gdb_var_name)
        // show
        obj.show_children_in_ui = true
        if(obj.numchild > 0 && obj.children.length === 0){
            // need to fetch child data
            Expressions._get_children_for_var(gdb_var_name)
        }else{
            // already have child data, just render now that we
            // set show_children_in_ui to true
            Expressions.render()
        }
    },
    hide_children_in_ui: function(gdb_var_name){
        let obj = Expressions.get_obj_from_gdb_var_name(gdb_var_name)
        if(obj){
            obj.show_children_in_ui = false
            Expressions.render()
        }
    },
    click_toggle_children_visibility: function(e){
        let gdb_var_name = e.currentTarget.dataset.gdb_variable_name
        if($(e.currentTarget).hasClass('expanded')){
            // collapse
            Expressions.hide_children_in_ui(gdb_var_name)
        }else{
            // expand
            Expressions.fetch_and_show_children_for_var(gdb_var_name)
        }
        $(e.currentTarget).toggleClass('expanded')
    },
    /**
     * Send command to gdb to give us all the children and values
     * for a gdb variable. Note that the gdb variable itself may be a child.
     */
    _get_children_for_var: function(gdb_variable_name){
        Expressions.state.gdb_parent_var_currently_fetching_children = gdb_variable_name
        GdbApi.run_gdb_command(`-var-list-children --all-values ${gdb_variable_name}`)
    },
    update_variable_values: function(){
        GdbApi.run_gdb_command(`-var-update *`)
    },
    handle_changelist: function(changelist_array){
        for(let c of changelist_array){
            let obj = Expressions.get_obj_from_gdb_var_name(c.name)
            if(obj){
                _.assign(obj, c)
            }
        }
        Expressions.render()
    },
    click_delete_gdb_variable: function(e){
        e.stopPropagation() // not sure if this is still needed
        Expressions.delete_gdb_variable(e.currentTarget.dataset.gdb_variable)
    },
    delete_gdb_variable: function(gdbvar){
        // delete locally
        Expressions._delete_local_gdb_var_data(gdbvar)
        // delete in gdb too
        GdbApi.run_gdb_command(`-var-delete ${gdbvar}`)
        // re-render variables in browser
        Expressions.render()
    },
    /**
     * Delete local copy of gdb variable (all its children are deleted too
     * since they are stored as fields in the object)
     */
    _delete_local_gdb_var_data: function(gdb_var_name){
        _.remove(Expressions.state.variables, v => v.name === gdb_var_name)
    },
}

const Locals = {
    el: $('#locals'),
    init: function(){
        window.addEventListener('event_inferior_program_exited', Locals.event_inferior_program_exited)
        window.addEventListener('event_inferior_program_running', Locals.event_inferior_program_running)
        window.addEventListener('event_inferior_program_paused', Locals.event_inferior_program_paused)
        window.addEventListener('event_global_state_changed', Locals.event_global_state_changed)
        Locals.clear()
    },
    event_global_state_changed: function(){
        Locals.render()
    },
    render: function(){
        if(globals.state.locals.length === 0){
            Locals.el.html('<span class=placeholder>no variables in this frame</span>')
            return
        }
        let html = globals.state.locals.map(local => {
            let value = ''
            if('value' in local){
                // turn hex addresses into links to view memory
                value = Memory.make_addrs_into_links(local.value)
            }

            // return local variable name, value (if available), and type
            return  `
            <span>
                ${local.name}: ${value}
            </span>
            <span class='var_type'>
                ${_.trim(local.type)}
            </span>
            <p>
            `
        })
        Locals.el.html(html.join(''))
    },
    clear: function(){
        Locals.el.html('<span class=placeholder>not paused</span>')
    },
    event_inferior_program_exited: function(){
        Locals.clear()
    },
    event_inferior_program_running: function(){
        Locals.clear()
    },
    event_inferior_program_paused: function(){
    },
}

/**
 * The Threads component
 */
const Threads = {
    el: $('#threads'),
    init: function(){
        $("body").on("click", ".select_thread_id", Threads.click_select_thread_id)
        $("body").on("click", ".select_frame", Threads.click_select_frame)
        Threads.render()

        window.addEventListener('event_global_state_changed', Threads.event_global_state_changed)
    },
    event_global_state_changed: function(){
        Threads.render()
    },
    click_select_thread_id: function(e){
        GdbApi.run_gdb_command(`-thread-select ${e.currentTarget.dataset.thread_id}`)
        GdbApi.refresh_state_for_gdb_pause()
    },
    /**
     * select a frame and jump to the line in source code
     * triggered when clicking on an object with the "select_frame" class
     * must have data attributes: framenum, fullname, line
     *
     */
    click_select_frame: function(e){
        Threads.select_frame(e.currentTarget.dataset.framenum)
    },
    select_frame: function(framenum){
        window.dispatchEvent(new CustomEvent('event_select_frame', {'detail': parseInt(framenum)}))
    },
    render: function(){
        if(globals.state.current_thread_id && globals.state.threads.length > 0){
            let body = []
            for(let t of globals.state.threads){
                let is_current_thread_being_rendered = (parseInt(t.id) === globals.state.current_thread_id)
                , cls = is_current_thread_being_rendered ? 'bold' : ''

                let thread_text = `<span class=${cls}>thread id ${t.id}, core ${t.core} (${t.state})</span>`

                // add thread name
                if(is_current_thread_being_rendered){
                    body.push(thread_text)
                }else{
                    // add class to allow user to click and select this thread
                    body.push(`
                        <span class='select_thread_id pointer' data-thread_id='${t.id}'>
                            ${thread_text}
                        </span>
                        <br>
                        `)
                }

                if(is_current_thread_being_rendered){
                    // add stack if current thread
                    for (let s of globals.state.stack){
                        if(s.addr === t.frame.addr){
                            body.push(Threads.get_stack_table(globals.state.stack, t.frame.addr, is_current_thread_being_rendered, t.id))
                            break
                        }
                    }
                }else{
                    // add frame if not current thread
                    body.push(Threads.get_stack_table([t.frame], '', is_current_thread_being_rendered, t.id))
                }
            }

            Threads.el.html(body.join(''))
        }else{
            Threads.el.html('<span class=placeholder>not paused</span>')
        }
    },
    get_stack_table: function(stack, cur_addr, is_current_thread_being_rendered, thread_id){
        let _stack = $.extend(true, [], stack)
            , table_data = []

        var frame_num = 0
        for (let s of _stack){

            // let arrow = (cur_addr === s.addr) ? `<span class='glyphicon glyphicon-arrow-right' style='margin-right: 4px;'></span>` : ''
            let bold = (globals.state.selected_frame_num === frame_num && is_current_thread_being_rendered) ? 'bold' : ''
            let fullname = 'fullname' in s ? s.fullname : '?'
                , line = 'line' in s ? s.line : '?'
                , attrs = is_current_thread_being_rendered ? `class="select_frame pointer ${bold}"` : `class="select_thread_id pointer ${bold}" data-thread_id=${thread_id}`
                , function_name =`
                <span ${attrs} data-framenum=${s.level}>
                    ${s.func}
                </span>`

            table_data.push([function_name, `${s.file}:${s.line}`])
            frame_num++
        }
        if(_stack.length === 0){
            table_data.push(['unknown', 'unknown'])
        }
        return Util.get_table([], table_data, 'font-size: 0.9em;')
    },
    set_threads: function(threads){
        globals.state.threads = $.extend(true, [], threads)
        Threads.render()
    },
    set_thread_id: function(id){
        globals.state.current_thread_id = parseInt(id)
    },
}

/**
 * Component with checkboxes that allow the user to show/hide various components
 */
const VisibilityToggler = {
    /**
     * Set up events and render checkboxes
     */
    init: function(){
        $("body").on("click", ".visibility_toggler", VisibilityToggler.click_visibility_toggler)
    },
    /**
     * Update visibility of components as defined by
     * the checkboxes
     */
    click_visibility_toggler: function(e){
        if(e.target.classList.contains('glyphicon-ban-circle') || e.target.classList.contains('clear_console')){
            // don't toggle visibility if the clear button was pressed
            return
        }

        // toggle visiblity of target
        $(e.currentTarget.dataset.visibility_target_selector_string).toggleClass('hidden')

        // make triangle point down or to the right
        if($(e.currentTarget.dataset.visibility_target_selector_string).hasClass('hidden')){
            $(e.currentTarget.dataset.glyph_selector).addClass('glyphicon-chevron-right').removeClass('glyphicon-chevron-down')
        }else{
            $(e.currentTarget.dataset.glyph_selector).addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-right')
        }
    }
}

/**
 * Component to shutdown gdbgui
 */
const ShutdownGdbgui = {
    el: $('#shutdown_gdbgui'),
    /**
     * Set up events and render checkboxes
     */
    init: function(){
        ShutdownGdbgui.el.click(ShutdownGdbgui.click_shutdown_button)
    },
    click_shutdown_button: function(){
        if (window.confirm("This will end your gdbgui session. Continue?") === true) {
            // ShutdownGdbgui.shutdown()
            window.location = '/shutdown'
        } else {
            // don't do anything
        }
    },
}

const WebSocket = {
    init: function(){
        WebSocket.socket = io.connect(`http://${document.domain}:${location.port}/gdb_listener`);

        WebSocket.socket.on('connect', function(){
            debug_print('connected')
            // socket.emit('my_event', {data: 'I\'m connected!'});
        });

        WebSocket.socket.on('gdb_response', function(response_array) {
            process_gdb_response(response_array)
        });

        WebSocket.socket.on('error_running_gdb_command', function(data) {
            StatusBar.render(`Error occured on server when running gdb command: ${data.message}`, true)
        });

        WebSocket.socket.on('disconnect', function(){
            debug_print('disconnected')
        });
    },
    run_gdb_command: function(cmd){
        WebSocket.socket.emit('run_gdb_command', {cmd: cmd});
    },

}

/**
 * Modal component that is hidden by default, but shown
 * when render is called. The user must close the modal to
 * resume using the GUI.
 */
const Modal = {
    /**
     * Call when an important modal message must be shown
     */
    render: function(title, body){
        $('#modal_title').html(title)
        $('#modal_body').html(body)
        $('#gdb_modal').modal('show')
    }
}

/**
 * This is the main callback when receiving a response from gdb.
 * This callback requires no state to handle the response.
 * This callback calls the appropriate methods of other Components,
 * and updates the status bar.
 */
const process_gdb_response = function(response_array){
    // update status with error or with last response
    let update_status = true

    for (let r of response_array){
        // gdb mi output
        GdbMiOutput.add_mi_output(r)

        if (r.type === 'result' && r.message === 'done' && r.payload){
            // This is special GDB Machine Interface structured data that we
            // can render in the frontend
            if ('bkpt' in r.payload){
                // remove duplicate breakpoints
                let new_bkpt = r.payload.bkpt
                let cmds = globals.state.breakpoints
                    .filter(b => (new_bkpt.fullname === b.fullname && new_bkpt.func === b.func && new_bkpt.line === b.line))
                    .map(b => `-break-delete ${b.number}`)
                GdbApi.run_gdb_command(cmds)

                // save this breakpoint
                globals.save_breakpoint(r.payload.bkpt)

                // load file at this breakpoint
                globals.update_state('fullname_to_render', r.payload.bkpt.fullname)
                globals.update_state('current_line_of_source_code', r.payload.bkpt.line)
                globals.update_state('current_assembly_address', undefined)

                // refresh all breakpoints
                GdbApi.refresh_breakpoints()
            }
            if ('BreakpointTable' in r.payload){
                globals.save_breakpoints(r.payload)
            }
            if ('stack' in r.payload) {
                globals.update_stack(r.payload.stack)
            }
            if('threads' in r.payload){
                globals.update_state('threads', r.payload.threads)
                globals.update_state('current_thread_id', parseInt(r.payload['current-thread-id']))
            }
            if ('register-names' in r.payload) {
                let names = r.payload['register-names']
                // filter out empty names
                globals.update_state('register_names', names.filter(name => name !== ''))
            }
            if ('register-values' in r.payload) {
                globals.update_state('previous_register_values', globals.state.current_register_values)
                globals.update_state('current_register_values', r.payload['register-values'])
            }
            if ('asm_insns' in r.payload) {
                SourceCode.save_new_assembly(r.payload.asm_insns)
            }
            if ('files' in r.payload){
                if(r.payload.files.length > 0){
                    SourceFileAutocomplete.input.list = _.uniq(r.payload.files.map(f => f.fullname)).sort()
                }else if (globals.state.inferior_binary_path){
                    Modal.render('Warning',
                     `This binary was not compiled with debug symbols. Recompile with the -g flag for a better debugging experience.
                     <p>
                     <p>
                     Read more: <a href="http://www.delorie.com/gnu/docs/gdb/gdb_17.html">http://www.delorie.com/gnu/docs/gdb/gdb_17.html</a>`,
                     '')
                }
            }
            if ('memory' in r.payload){
                Memory.add_value_to_cache(r.payload.memory[0].begin, r.payload.memory[0].contents)
            }
            if ('variables' in r.payload){
                globals.set_locals(r.payload.variables)
            }
            if ('changelist' in r.payload){
                Expressions.handle_changelist(r.payload.changelist)
            }
            if ('name' in r.payload && 'thread-id' in r.payload && 'has_more' in r.payload &&
                'value' in r.payload && !('children' in r.payload)){
                Expressions.gdb_created_root_variable(r)
            }
            if('has_more' in r.payload && 'numchild' in r.payload && 'children' in r.payload){
                Expressions.gdb_created_children_variables(r)
            }
            // if (your check here) {
            //      render your custom compenent here!
            // }
        } else if (r.type === 'result' && r.message === 'error'){
            // this is also special gdb mi output, but some sort of error occured

            // render it in the status bar, and don't render the last response in the array as it does by default
            if(update_status){
                StatusBar.render_from_gdb_mi_response(r)
                update_status = false
            }

            // we tried to load a binary, but gdb couldn't find it
            if(r.payload.msg === `${globals.state.inferior_binary_path}: No such file or directory.`){
                window.dispatchEvent(new Event('event_inferior_program_exited'))
            }

        } else if (r.type === 'console'){
            GdbConsoleComponent.add(r.payload, r.stream === 'stderr')
            if(globals.state.gdb_version === undefined){
                // parse gdb version from string such as
                // GNU gdb (Ubuntu 7.7.1-0ubuntu5~14.04.2) 7.7.
                let m = /GNU gdb \(.*\)\s*(.*)\./g
                let a = m.exec(r.payload)
                if(_.isArray(a) && a.length === 2){
                    globals.state.gdb_version = parseFloat(a[1])
                    localStorage.setItem('gdb_version', globals.state.gdb_version)
                }
            }
        }else if (r.type === 'output'){
            // output of program
            GdbConsoleComponent.add(r.payload, r.stream === 'stderr')
        }

        if (r.message && r.message === 'stopped' && r.payload && r.payload.reason){
            if(r.payload.reason.includes('exited')){
                window.dispatchEvent(new Event('event_inferior_program_exited'))

            }else if (r.payload.reason.includes('breakpoint-hit') || r.payload.reason.includes('end-stepping-range')){
                if (r.payload['new-thread-id']){
                    Threads.set_thread_id(r.payload['new-thread-id'])
                }
                window.dispatchEvent(new CustomEvent('event_inferior_program_paused', {'detail': r.payload.frame}))

            }else if (r.payload.reason === 'signal-received'){
                // TODO not sure what to do here, but the status bar already renders the
                // signal nicely

            }else{
                console.log('TODO handle new reason for stopping')
                console.log(r)
            }
        }
    }

    // perform any final actions
    if(update_status){
        // render response of last element of array
        StatusBar.render_from_gdb_mi_response(_.last(response_array))
        update_status = false
    }

    if(response_array.length > 0){
        // scroll to the bottom
        GdbMiOutput.scroll_to_bottom()
        GdbConsoleComponent.scroll_to_bottom()
    }
}

const layout_style = 'background-color: #F5F6F7; border: 1px solid #dfdfdf; padding: 5px;';
$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top',  size: 45, resizable: false, style: layout_style, content: $('#top'), overflow: 'hidden' },
        // { type: 'left', size: 0, resizable: false, style: layout_style, content: 'todo - add file browser' },
        { type: 'main', style: layout_style, content: $('#main'), overflow: 'hidden' },
        // { type: 'preview', size: '50%', resizable: true, style: layout_style, content: 'preview' },
        { type: 'right', size: '35%', 'min-width': '300px', resizable: true, style: layout_style, content: $('#right') },
        { type: 'bottom', size: 300, resizable: true, style: layout_style, content: $('#bottom') }
    ]
});

// initialize components
globals.init()
GdbApi.init()
GdbCommandInput.init()
GdbConsoleComponent.init()
GdbMiOutput.init()
SourceCode.init()
Breakpoint.init()
BinaryLoader.init()
Registers.init()
SourceFileAutocomplete.init()
Memory.init()
Expressions.init()
Locals.init()
Threads.init()
VisibilityToggler.init()
ShutdownGdbgui.init()
WebSocket.init()
Settings.init()

window.addEventListener("beforeunload", BinaryLoader.onclose)

// and finally, if user supplied an initial command, set it in the UI, and load the
// inferior binary
if(_.isString(initial_binary_and_args) && _.trim(initial_binary_and_args).length > 0){
    BinaryLoader.el.val(_.trim(initial_binary_and_args))
    BinaryLoader.set_target_app()
}

return globals
})(jQuery, _, Awesomplete, io, moment, debug, gdbgui_version, initial_binary_and_args)
