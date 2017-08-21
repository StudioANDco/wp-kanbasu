(function() {
    "use strict";

    tinymce.create('tinymce.plugins.wpkanbasu', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
            ed.addButton('wpkanbasu_grid', {
                title : 'Add grid',
                image : url + '/images/icon-toggle.gif',
                cmd : 'creategrid'
            });

            var gcd = function(a, b) {
                if ( ! b) {
                    return a;
                }

                return gcd(b, a % b);
            };

            ed.addCommand('creategrid', function() {
                var win = ed.windowManager.open({
                    title: 'Create grid',
                    body: [
                        { type: 'textbox', name: 'rows', label: 'Rows', value: '1' },
                        { type: 'textbox', name: 'columns', label: 'Columns', value: '2' }
                    ],
                    buttons: [
                        { text: "Ok", subtype: "primary", onclick: function() { win.submit(); } },
                        { text: "Cancel", onclick: function() { win.close(); } }
                    ],
                    onsubmit: function(e) {
                        var cols = parseInt(e.data.columns);
                        var rows = parseInt(e.data.rows);

                        var width = gcd(12, cols);
                        var classes = 'grid' + (rows > 1 ? ' grid--multiline ' : '');

                        var grid = '';
                        for(var i = 0; i < rows; ++i) {
                            for(var j = 0; j < cols; ++j) {
                                grid += "\t" + '<div class="grid__item md-w-1/' + width + '">Content goes here</div>' + "\n";
                            }
                        }

                        var content = "Before\n" + '<div class="' + classes + '">' + "\n" + grid + '</div>' + "\nAfter";

                        ed.execCommand('mceInsertRawHTML', 0, content);
                    }
                })
            });
        },
        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : "Kanbasu WordPress plugin",
                author : 'Studio ANDco',
                authorurl : 'http://andco.ch/',
                infourl : 'http://andco.ch/',
                version : "0.0.1"
            };
        }
    });

    tinymce.PluginManager.add('wpkanbasu', tinymce.plugins.wpkanbasu);
})();
