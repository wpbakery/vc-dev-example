console && console.log('front_enqueue_js.js is loaded');

// This name is defined automatically (InlineShortcodeView_you, for Frontend editor only
window.InlineShortcodeView_test_element = window.InlineShortcodeView.extend({
	// Render called every time when some of attributes changed.
	render: function () {
        console && console.log('InlineShortcodeView_test_element: render called.');
		window.InlineShortcodeView_test_element.__super__.render.call(this); // it is recommended to call parent method to avoid new versions problems.

		// There is a place where you can implement logic for rendering / element param changing and all other javascript logic what you can imagine.
		this.myCustomMethodToDebugShortcode();
		return this;
	},
	/*
	 * Show shortcode mapped parameters
	 */
	myCustomMethodToDebugShortcode: function () {
		var $i = this.model.settings; // shortcode settings from VC_MAP! also available in global variable "vc_mapper"
		var str = '';
		_.each($i, function (settings, key) {
			var obj = {};
			obj[key] = settings;
			str += JSON.stringify(obj) + '<br>';
		}, this);
		jQuery('<div>Green background will be visible only in fronteditor mode and css is stored in assets/front_enqueue_iframe_css.css <br/><br/> This json styled info was created "on the fly" from available settings: <br/>' + str + '</div>').appendTo(this.$el);
	},
	updated: function () {
        console && console.log('InlineShortcodeView_test_element: updated called.');
		window.InlineShortcodeView_test_element.__super__.updated.call(this);

		// This is example how you can re-render pieChart Doughnut in frontend editor.
		var $i = this.$el.find('canvas');
		window.vc.frame_window.TestElementRender($i);
	},
	parentChanged: function () {
        console && console.log('InlineShortcodeView_test_element: parentChanged called.');
		window.InlineShortcodeView_test_element.__super__.parentChanged.call(this);
	}
	// Available other methods too, see in InlineShortcodeView model (file: js_composer/assets/js/frontend_editor/frontend_editor.js
});