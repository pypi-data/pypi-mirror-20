/*
*
*  YAFF is Yet Another Front-end Framework
*
*  (C) Copyright Jack Cantrell-Warren 2016. All rights reserved.
*  This software may not be copied, altered, distributed, or otherwise used without the express written consent of
*  the copyright owner.
* */

// base model
var Yaff = function() {};

// the extend function, to propogate everywhere
Yaff.extend = function(extension) {

    var parent = this;
    var that;

    if(extension && (extension.hasOwnProperty('constructor')) && (typeof extension.constructor === 'function') ) {
        that = extension.constructor;
    } else {
        that = function(){ return parent.apply(this, arguments); };
    }

    that.prototype = Object.create(parent.prototype);
    that.prototype.constructor = that;

    for (var i in extension) {
        if (extension.hasOwnProperty(i) && (i != 'constructor')) {
            that.prototype[i] = extension[i];
        }
    }

    that.extend = Yaff.extend;

    return new_obj;
};

// List - the model element of the MVC
Yaff.List = Yaff.extend({

    constructor: function(list_id, container) {
        this.container = container;
        this.list_id = list_id;
        this.list_data = [];
        this.list_metadata = [];
        this._listeners = [];
        this._timeouts = {};
        this.set_initial_values.apply(this, arguments);
    },

    set_initial_values: function() {},

    get_index_from_key_value: function (key_value) {

        // go through list data and find the item that matches the key field value
        var l = this.list_data.length;
        for (var i=0; i<l; i++) {
            if (this.list_data[i][this.key_field]==key_value){
                return i;
            }
        }

        return -1;
    },

    set_values: function(value_list) {
        var l = value_list.length;
        for (var i=0; i<l; i++) {
            this.set_value(value_list[i].key_value, value_list[i].property, value_list[i].value, (i+1==l));
        }
    },

    set_value: function(key_value, property, value, update_server_flag) {

        var self = this;
        var index = this.get_index_from_key_value(key_value);

        if (index > -1) {
            this.list_data[index][property] = value;
        } else {
            var dic = {};
            // set key field values
            dic[this.key_field] = key_value;
            // set value
            dic[property] = value;
            this.list_data.push(dic);
        }
        this.check_listeners('list_data', key_value, property, 'modify_property');

        // debounce updating (if save to server flag is set)
        if (this.list_metadata.save_to_server == 1 && (typeof update_server_flag === 'undefined' || update_server_flag == true)) {
            var timeout_hash = key_value + '~' + property;
            if (this._timeouts[timeout_hash]) {
                clearTimeout(this._timeouts[timeout_hash]);
            }
            this._timeouts[timeout_hash] = setTimeout(function(){
                self.update_list_item(key_value, property);
            }, 1000);
        }

    },

    add_listener: function(listener_obj) {
        this._listeners.push(listener_obj);
    },

    check_listeners: function(sublist, key_value, property, action) {

        var local_listeners;
        var l = this._listeners.length;
        
        // make a local copy first - in case a subsequent listener is destroyed by an earlier one
        local_listeners = [];
        for (var i=0; i<l; i++) {
            local_listeners.push(this._listeners[i]);
        }
        
        for (i=0; i<l; i++) {
            
            if (local_listeners[i].action == action
                && (typeof local_listeners[i].sublist === 'undefined' || local_listeners[i].sublist == sublist)
                && (typeof local_listeners[i].key_value === 'undefined' || local_listeners[i].key_value == key_value)
                && (typeof local_listeners[i].property === 'undefined' || local_listeners[i].property == property)) {
                
                this.call_listener(sublist, key_value, property, action, local_listeners[i].caller, local_listeners[i].callback)
                
            }
        }
    },

    call_listener: function(sublist, key_value, property, action, caller, callback) {

        if (typeof key_value !== 'undefined' && key_value !== null) {
            var index = this.get_index_from_key_value(key_value);

            if (index > -1) {

                caller[callback].call(caller, this.list_id, sublist, key_value, property, this[sublist][index][property], action);
            }
        } else {

            caller[callback].call(caller, this.list_id, sublist, key_value, property, null, action);
        }

    },

    remove_listener: function(listener_obj) {
        // find the listener
        var l = this._listeners.length;
        for (var i=0; i<l; i++) {
            if (this._listeners[i]==listener_obj) {
                this._listeners.splice(i, 1);
                return;
            }
        }
    },

    parse_metadata_parameters: function() {
        // parse parameters from list metadata
        var param_JSON = this.list_metadata.parameters || "";
        if (param_JSON !== "") {
            this.parameters = JSON.parse(param_JSON);
        }
        // get the model from the list_metadata
        this.model = this.list_metadata.model || "";
        // key field
        this.key_field = this.list_metadata.key_field || "";
        // helper key
        var helper_JSON = this.list_metadata.helper_key || "";
        if (helper_JSON !== "") {
            this.helper_key = JSON.parse(helper_JSON);
        }
    },

    add_list_item: function(param_obj) {

        var self = this;
        var send_values = [{}];
        if (typeof this.parameters !=='undefined' && typeof this.parameters.add_list_item !== 'undefined') {
            var params = this.parameters.add_list_item;
            var l = params.length;

            for (var i = 0; i < l; i++) {
                if (params[i] == 'list_name') {
                    send_values[0]['list_name'] = this.list_id;
                } else {
                    send_values[0][params[i]] = param_obj[params[i]] || null;
                }
            }
        }

        if (typeof param_obj !== 'undefined' && param_obj !== null) {
            for (var param_key in param_obj) {
                if (param_obj.hasOwnProperty(param_key)) {
                    send_values[0][param_key] = param_obj[param_key];
                }
            }
        }

        var data = JSON.stringify({"action": "add_list_item", "model": this.model, "values": send_values, "list_name": this.list_id});
        var ajaxParams = { 'data': data, 'type': "POST", dataType: "json", contentType: "application/json" };
        console.log(data);
        $.ajax("/listrequest", ajaxParams)
            .done(function(response) {
                if (response.success==true) {

                    var html = response.html;
                    var list_data = response.list_data[self.list_id][0];

                    self.append_new_item.apply(self, [html, list_data]);

                } else {
                    window.alert('Oops... something went wrong. The server sent the following error message: ' + response.error_message);
                }
            })
            .fail(function () {
                window.alert('Could not reach the server. Please check your connection and try again.');
            });
    },

    append_new_item: function(html, list_data) {
        this._new_html = html;
        this.list_data.push(list_data);
        this.check_listeners('list_data', null, null, 'add_list_item')
    },
    
    remove_list_item: function(list_item_obj) {

        var self = this;
        var send_values = [{}];
        var params = this.parameters.remove_list_item;
        var index = this.get_index_from_key_value(list_item_obj.key_value);
        var l = params.length;

        for (var i=0; i<l; i++) {
            if (params[i]=='list_name') {
                send_values[0]['list_name'] = this.list_id;
            } else {
                send_values[0][params[i]] = this.list_data[index][params[i]];
            }
        }

        var data = JSON.stringify({"action": "remove_list_item", "model": this.model, "values": send_values, "list_name": this.list_id});
        var ajaxParams = { 'data': data, 'type': "POST", dataType: "json", contentType: "application/json" };
        
        $.ajax("/listrequest", ajaxParams)
            .done(function(response) {
                if (response.success==true) {

                    self.delete_item.apply(self, [list_item_obj.key_value, index]);

                } else {
                    window.alert('Oops... something went wrong. The server sent the following error message: ' + response.error_message);
                }
            })
            .fail(function () {
                window.alert('Could not reach the server. Please check your connection and try again.');
            });
    },
    
    delete_item: function(key_value, index) {
        var self = this;
        self.check_listeners('list_data', key_value, null, 'remove_list_item');
        var deleted_list_order = self.list_data[index]['list_order'];
        var section_deleted = false;
        if (self.list_data[index]['datatype_id'] == 1) {
            section_deleted = true;
            var deleted_section = self.list_data[index]['section'];
        }

        self.list_data.splice(index, 1);
        var l = self.list_data.length;
        for (var i=0; i<l; i++) {
            if (self.list_data[i].list_order > deleted_list_order) {
                self.list_data[i].list_order -= 1;
                if (section_deleted) {
                    self.list_data[i].section -=1;
                }
            }
        }
        self.check_listeners('list_data', null, null, 'renumber_list');
    },

    clear_views: function() {
        this.check_listeners('list_data', null, null, 'clear_views');
    },

    update_list_item: function(key_value, property) {
        var self = this;
        var send_values = [{}];
        var params = this.parameters.update_list_item || [];
        var index = this.get_index_from_key_value(key_value);
        var l = params.length;

        for (var i=0; i<l; i++) {
            // if one of the params is list_name, add it (not a property of any list item)
            if (params[i]=='list_name') {
                send_values[0]['list_name'] = this.list_id;
            } else if (typeof this.helper_key !== 'undefined' && this.helper_key.includes(params[i])) {
                var key_index = this.helper_key.indexOf(params[i]);
                var key_split = key_value.split('_');
                send_values[0][params[i]] = key_split[key_index];
            }
            else {

                send_values[0][params[i]] = typeof this.list_data[index][params[i]] !== 'undefined' ? this.list_data[index][params[i]] : null;
            }
        }

        send_values[0][property] = this.list_data[index][property];

        var data = JSON.stringify({"action": "update_list_item", "model": this.model, "values": send_values, "list_name": this.list_id});
        var ajaxParams = { 'data': data, 'type': "POST", dataType: "json", contentType: "application/json" };
        console.log(send_values);

        $.ajax("/listrequest", ajaxParams)
            .done(function(response) {
                if (response.success==true) {

                    self.check_listeners('list_data', key_value, property, 'update_list_item');
                    console.log(response);

                } else {
                    window.alert('Oops... something went wrong. The server sent the following error message: ' + response.error_message);
                }
            })
            .fail(function () {
                window.alert('Could not reach the server. Please check your connection and try again.');
            });
    },

    // accepts a key : listorder object
    renumber_list: function(old_index, new_index, save_to_server_flag) {

        // take a working copy of the list
        var working_list = this.list_data;
        var moving_item = working_list[old_index];

        if (new_index > old_index) {
            for (var i=old_index; i<new_index; i++) {
                working_list[i]=working_list[i+1];
                working_list[i].list_order=i+1;
            }
            working_list[new_index] = moving_item;
            working_list[new_index].list_order = new_index + 1;


        } else if (new_index < old_index) {
            for (i=old_index; i>new_index; i--) {
                working_list[i]=working_list[i-1];
                working_list[i].list_order=i+1;

            }
            working_list[new_index] = moving_item;
            working_list[new_index].list_order = new_index + 1;
        }

        // update sections
        var current_section = 0;
        var l = working_list.length;
        for (i=0; i<l; i++) {
            if (typeof working_list[i] == 'undefined') {
                console.log("undefined: " + i);
            }
            if (working_list[i].datatype_id == 1) {
                current_section += 1;
            }
            working_list[i].section = current_section;
        }
        // put the working list back
        this.list_data = working_list;


        // save to server if flag set to true
        if (save_to_server_flag != true) {
            // check listeners
            this.check_listeners('list_data', null, null, 'renumber_list');
            return;
        }

        var self = this;
        var send_values = [{}];
        var params = this.parameters.renumber_list || [];
        var l = this.list_data.length;
        var m = params.length;
        // add all items to the send_values list
        for (var i=0; i<l; i++) {
            send_values[i] = {};
            for (var j = 0; j < m; j++) {
                // if one of the params is list_name, add it (not a property of any list item)
                if (params[j] == 'list_name') {
                    send_values[i]['list_name'] = this.list_id;
                } else if (typeof this.helper_key !== 'undefined' && this.helper_key.includes(params[j])) {
                    var key_index = this.helper_key.indexOf(params[j]);
                    var key_split = key_value.split('_');
                    send_values[i][params[j]] = key_split[key_index];
                }
                else {
                    send_values[i][params[j]] = this.list_data[i][params[j]];
                }
            }
        }

        // send to the server
        var data = JSON.stringify({"action": "renumber_list", "model": this.model, "values": send_values, "list_name": this.list_id});
        var ajaxParams = { 'data': data, 'type': "POST", dataType: "json", contentType: "application/json" };
        console.log(send_values);

        $.ajax("/listrequest", ajaxParams)
            .done(function(response) {
                if (response.success==true) {

                    self.check_listeners('list_data', null, null, 'renumber_list');
                    console.log(response);

                } else {
                    window.alert('Oops... something went wrong. The server sent the following error message: ' + response.error_message);
                }
            })
            .fail(function () {
                window.alert('Could not reach the server. Please check your connection and try again.');
            });

    },

    update_all_items: function(property) {
        var self = this;
        var send_values = [];
        var params = this.parameters.update_list_item || [];

        var l = params.length;
        var m = this.list_data.length;

        for (var j=0; j<m; j++) {
            send_values.push({});
            for (var i = 0; i < l; i++) {
                // if one of the params is list_name, add it (not a property of any list item)
                if (params[i] == 'list_name') {
                    send_values[j]['list_name'] = this.list_id;
                } else if (typeof this.helper_key !== 'undefined' && this.helper_key.includes(params[i])) {
                    var key_index = this.helper_key.indexOf(params[i]);
                    var key_split = key_value.split('_');
                    send_values[j][params[i]] = key_split[key_index];
                }
                else {
                    send_values[j][params[i]] = this.list_data[j][params[i]];
                }
            }

            send_values[j][property] = this.list_data[j][property];
        }

        var data = JSON.stringify({"action": "update_list_item", "model": this.model, "values": send_values, "list_name": this.list_id});
        var ajaxParams = { 'data': data, 'type': "POST", dataType: "json", contentType: "application/json" };
        console.log(send_values);

        $.ajax("/listrequest", ajaxParams)
            .done(function(response) {
                if (response.success==true) {

                    self.check_listeners('list_data', null, property, 'update_list_item');
                    d5.processed_count += 1;
                    console.log(response);

                } else {
                    window.alert('Oops... something went wrong. The server sent the following error message: ' + response.error_message);
                }
            })
            .fail(function () {
                window.alert('Could not reach the server. Please check your connection and try again.');
            });
    },


    update_html: function(html) {
        this._new_html = html;
        this.check_listeners(null, null, null, 'update_html');
    }

});

/*
*   View - represents an element or container of elements
*/

Yaff.View = Yaff.extend({
    constructor: function(element, container) {
        this.container = container;
        this.set_initial_values.apply(this, arguments);
        this.register_element(element);
        this.parse_binding();
        this.register_events();
        this.register_listeners();
        this.initialize.apply(this, arguments);
    },

    set_initial_values: function () {},

    initialize: function () {},

    register_element: function(element) {
        this.$el = element instanceof $ ? element : $(element);
    },

    register_events: function() {
        this._events = [];
        if (typeof this.events === 'undefined') return;
        var l = this.events.length;
        for (var i=0; i<l; i++) {
            this.register_event(this.events[i]);
        }
    },

    register_event: function(event_obj) {
        var elements = null;
        if (event_obj['selector']) {
            elements = this.$el.find(event_obj['selector']);
        } else {
            elements = this.$el;
        }

        var self = this;

        elements.each(function() {
            $(this).on(event_obj['event'], function(event){
                self[event_obj['callback']].apply(self, arguments);
            });
        });

        this._events.push(event_obj);
    },

    parse_binding: function() {
        // get the bind data from html data-bind
        var bind_data = this.$el.data('bind');
        if (typeof bind_data === 'undefined' || bind_data === null) return;
        // split bind data and assign to variables
        var bind_items = bind_data.split('; ');
        var l = bind_items.length;
        for (var i=0; i<l; i++) {
            if (typeof bind_items[i] !== 'undefined' && bind_items[i] !== null) {
                var tup = bind_items[i].split(': ');

                if (typeof tup[0] !== 'undefined' && tup[0] != null && tup[0] != '') {
                    if (tup[1][0] == "{" || tup[1][0] == "[") {
                        // parse as JSON
                        this[tup[0]] = JSON.parse(tup[1]);
                    } else {
                        this[tup[0]] = tup[1];
                    }
                }
            }
        }
        // get listorder (if exists)
        var list_order = this.$el.data('listorder');
        if (typeof list_order === 'undefined' || list_order === null) return;
        this.list_order = list_order;

        // get section (if exists)
        var section = this.$el.data('section');
        if (typeof section === 'undefined' || section === null) return;
        this.section = section;

    },

    remove: function() {

        // remove subviews
        if (typeof this.subviews !== 'undefined' && this.subviews !== null && this.subviews.length > 0) {
            var l = this.subviews.length;
            for (var i=0; i<l; i++) {
                this.subviews[0].remove.apply(this.subviews[0]);
                this.subviews.splice(0, 1);
            }
        }
        
        // deregister listeners
        if (typeof this._listeners !== 'undefined' && this._listeners !== null) {
            var m = this._listeners ? this._listeners.length: -1;
            for (var i=0; i<m; i++) {
                this.deregister_listener(0);
            }
        }

        // remove DOM element
        if (typeof this.$el !== 'undefined' && this.$el !== null) {
            this.$el.remove();
            this.$el = null;
        }

    },

    deregister_event: function(event_index) {
        var event_obj = this._events[event_index];
        var elements = null;
        if (event_obj['selector']) {
            elements = this.$el.find(event_obj['selector']);
        } else {
            elements = this.$el;
        }

        var self = this;

        elements.each(function() {
            $(this).off(event_obj['event'], function(event){
                self[event_obj['callback']].apply(self, arguments);
            });
        });

        this._events.splice(event_index, 1);
    },

    register_listeners: function() {
        this._listeners = [];
        if (typeof this.listeners === 'undefined') return;
        var l = this.listeners.length;
        for (var i=0; i<l; i++) {
            var listener = {action: this.listeners[i].action, sublist: this.listeners[i].sublist, key_value: this.listeners[i].key_value,
                property: this.listeners[i].property, callback: this.listeners[i].callback, caller: this, list_name: this.listeners[i].list_name};
            this.register_listener(listener);
        }
    },

    register_listener: function(listener) {
        if(typeof listener.list_name === 'undefined') console.log(listener);
        this.container.lists[listener.list_name].add_listener(listener);
        this._listeners.push(listener);
    },

    deregister_listener: function(listener_index) {
        this.container.lists[this.list_name].remove_listener(this._listeners[listener_index]);
        this._listeners.splice(listener_index, 1);
    }

});

/*
*   Router - routes the browser
 */

Yaff.Router = Yaff.extend({
    constructor: function() {
        this.initialize.apply(this, arguments);
    },

    initialize: function() {
        this.base_url = window.location.origin;
        var self = this;
        window.onpopstate = function(event) {
            self.handle_pop(event.state);
        }
    },

    replace_url: function(page, action) {
        var state = {'page': page};
        var url = this.base_url + '/' + page;
        if (action=='push') {
            window.history.pushState(state, "", url);
        } else if (action=='replace') {
            window.history.replaceState(state, "", url);
        }
    },

    handle_pop: function(state) {
        if (state) {
            var page = state['page'];
            if (page) {
                this.load_page(page, 'none');
            }
        }
    },

    // page loading function to be defined in implementation
    load_page: function(page) {}

});

/*
*   Page - keeps Views, Lists, and ElementViewMaps together in one place
 */

Yaff.Page = Yaff.extend({

    constructor: function(element) {

        this.views = [];
        this.lists = {};
        this.set_initial_values.apply(this, arguments);
        this.register_element(element);
        this.register_components();
        this.initialize.apply(this, arguments);
    },

    register_element: function(element) {
        this.$el = element instanceof $ ? element : $(element);
    },

    register_components: function() {
        // register components within the page element and create views accordingly.
        var self = this;
        self.views = [];
        var l = Yaff.component_map.length;
        for (var i=0; i<l; i++) {
            self.$el.find(Yaff.component_map[i].selector).each(function(){
                var cls = Yaff.component_map[i].class;
                var element = new Yaff[cls](this);
                element.view_type = cls;
                self.views.push(element);
            });
        }
    },

    initialize: function () {},

    get_view_from_element: function(element) {
        var $element = element instanceof $ ? element : $(element);
        var l = this.views.length;
        for (var i=0; i<l; i++) {
            if ($element = this.views[i].$el) {
                return this.views[i];
            }
        }
        return null;
    },
    
    drag_context: function() {
        
    },
    
    register_events: function() {
        this._events = [];
        var l = this.events.length;
        for (var i=0; i<l; i++) {
            this.register_event(this.events[i]);
        }
    },

    register_event: function(event_obj) {
        var elements = null;
        if (event_obj['selector']) {
            elements = this.$el.find(event_obj['selector']);
        } else {
            elements = this.$el;
        }

        var self = this;

        elements.each(function() {
            $(this).on(event_obj['event'], function(event){
                self[event_obj['callback']].apply(self, arguments);
            });
        });

        this._events.push(event_obj);
    }
});

Yaff.Utilities = Yaff.extend({
    to_title_case: function(str) {
        return str.replace(/\b\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

    restrict_tabbing: function(action, parent, nspace) {
        var $parent = parent instanceof $ ? parent : $(parent);
        var $elements = $parent.find('select, input, textarea, button, a').filter(':visible');
        var $first = $elements.first();
        var $last = $elements.last();
        var namespace = nspace ? nspace : 'restrict_tabbing';
        if (action=='on') {

            $first.on('keydown.restrict_tabbing', function(e) {
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    $last.focus();
                }
            });

            $last.on('keydown.restrict_tabbing', function(e) {
                if ((e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    $first.focus();
                }
            });

            var to = setTimeout(function(){$first.focus();}, 0);

            // find children and ensure first and last tab back to each other
        } else if (action=='off') {
            // remove the listeners that on created.
            $first.off('.restrict_tabbing');
            $last.off('.restrict_tabbing');
        }

    },

    compare_objects: function (obj1, obj2) {
        var key_count = [0, 0];
        var key_matches = [0, 0];
        for (var key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                key_count[0] += 1;
                if (typeof obj2[key] !== 'undefined' && obj1[key]==obj2[key]) {
                    key_matches[0] += 1;
                }
            }

        }
        for (key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                key_count[1] += 1;
                if (typeof obj1[key] !== 'undefined' && obj2[key] == obj1[key]) {
                    key_matches[1] += 1;
                }
            }
        }

        return !!(key_count[0]==key_count[1] && key_matches[0]==key_matches[1]);

    }
    
    
});