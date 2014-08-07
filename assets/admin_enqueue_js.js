console && console.log('admin_enqueue_js.js is loaded');
// Come from vc_map -> 'js_view' => 'ViewTestElement'
window.ViewTestElement = vc.shortcode_view.extend({
	// Render method called after element is added( cloned ), and on first initialisation
	render: function () {
        console && console.log('ViewTestElement: render method called.');
		window.ViewTestElement.__super__.render.call(this); //make sure to call __super__. To execute logic fron inherited view. That way you can extend original logic. Otherwise, you will fully rewrite what VC will do at this event

		return this;
	},
	ready: function (e) {
        console && console.log('ViewTestElement: ready method called.');
		window.ViewTestElement.__super__.ready.call(this, e);

		return this;
	},
	//Called every time when params is changed/appended. Also on first initialisation
	changeShortcodeParams: function (model) {
        console && console.log('ViewTestElement: changeShortcodeParams method called.');
        console && console.log(model.getParam('value') + ': this was maped in vc_map() "param_name"  => "value"');
		window.ViewTestElement.__super__.changeShortcodeParams.call(this, model);
	},
	changeShortcodeParent: function (model) {
        console && console.log('ViewTestElement: changeShortcodeParent method called.');
		window.ViewTestElement.__super__.changeShortcodeParent.call(this, model);
	},
	deleteShortcode: function (e) {
        console && console.log('ViewTestElement: deleteShortcode method called.');
		window.ViewTestElement.__super__.deleteShortcode.call(this, e);
	},
	editElement: function (e) {
        console && console.log('ViewTestElement: editElement method called.');
		window.ViewTestElement.__super__.editElement.call(this, e);
	},
	clone: function (e) {
        console && console.log('ViewTestElement: clone method called.');
		window.ViewTestElement.__super__.clone.call(this, e);
	}
});
