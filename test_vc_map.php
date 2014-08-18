<?php
/*
Plugin Name: Visual Composer: Kitchen sink content element maping
Plugin URI: http://vc.wpbakery.com
Description: Study code to see how you can achieve interesting things in VC with your own custom content elements
Version: 0.1
Author: Michael M - WPBakery.com
Author URI: http://wpbakery.com
*/

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}


function test_vc_map_dependencies() {
	if ( ! defined( 'WPB_VC_VERSION' ) ) {
		$plugin_data = get_plugin_data(__FILE__);
        echo '
        <div class="updated">
          <p>'.sprintf(__('<strong>%s</strong> requires <strong><a href="http://bit.ly/vcomposer" target="_blank">Visual Composer</a></strong> plugin to be installed and activated on your site.', 'vc_extend'), $plugin_data['Name']).'</p>
        </div>';
	}
}
add_action( 'admin_notices', 'test_vc_map_dependencies' );

function text_vc_map_init() {
	// Note that all keys=values in mapped shortcode can be used with javascript variable vc.map, and php shortcode settings variable.
	$settings = array(
		'name'                    => __( 'Test element', 'js_composer' ),
		// shortcode name

		'base'                    => 'test_element',
		// shortcode base [test_element]

		'category'                => __( 'Test elements', 'js_composer' ),
		// param category tab in add elements view

		'description'             => __( 'Test element description', 'js_composer' ),
		// element description in add elements view

		'show_settings_on_create' => false,
		// don't show params window after adding

		'weight'                  => - 5,
		// Depends on ordering in list, Higher weight first

		'html_template'           => dirname( __FILE__ ) . '/vc_templates/test_element.php',
		// if you extend VC within your theme then you don't need this, VC will look for shortcode template in "wp-content/themes/your_theme/vc_templates/test_element.php" automatically. In this example we are extending VC from plugin, so we rewrite template

		'admin_enqueue_js'        => preg_replace( '/\s/', '%20', plugins_url( 'assets/admin_enqueue_js.js', __FILE__ ) ),
		// This will load extra js file in backend (when you edit page with VC)
		// use preg replace to be sure that "space" will not break logic

		'admin_enqueue_css'       => preg_replace( '/\s/', '%20', plugins_url( 'assets/admin_enqueue_css.css', __FILE__ ) ),
		// This will load extra css file in backend (when you edit page with VC)

		'front_enqueue_js'        => preg_replace( '/\s/', '%20', plugins_url( 'assets/front_enqueue_js.js', __FILE__ ) ),
		// This will load extra js file in frontend editor (when you edit page with VC)

		'front_enqueue_css'       => preg_replace( '/\s/', '%20', plugins_url( 'assets/front_enqueue_css.css', __FILE__ ) ),
		// This will load extra css file in frontend editor (when you edit page with VC)

		'js_view'                 => 'ViewTestElement',
		// JS View name for backend. Can be used to override or add some logic for shortcodes in backend (cloning/rendering/deleting/editing).

		'params'                  => array(
			array(
				"type"        => "textfield",
				"heading"     => __( "Chart value(1-100)", "js_composer" ),
				"param_name"  => "value",
				"description" => __( "Chart value(number).", "js_composer" )
			),
			array(
				'type'        => 'textarea_html',
				'holder'      => 'div',
				'class'       => 'custom_class_for_element', //will be outputed in the backend editor
				'heading'     => __( 'Content', 'js_composer' ),
				'param_name'  => 'content', //param_name for textarea_html must be named "content"
				'value'       => __( '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo..</p>', 'js_composer' ),
				'description' => __( 'Dummy text for content element.', 'js_composer' )
			),
		)
	);
	vc_map( $settings );

	if ( class_exists( "WPBakeryShortCode" ) ) {
		// Class Name should be WPBakeryShortCode_Your_Short_Code
		// See more in vc_composer/includes/classes/shortcodes/shortcodes.php
		class WPBakeryShortCode_Test_Element extends WPBakeryShortCode {

			public function __construct( $settings ) {
				parent::__construct( $settings ); // !Important to call parent constructor to active all logic for shortcode.
				$this->jsCssScripts();
			}

			public function vcLoadIframeJsCss() {
				wp_enqueue_style( 'test_element_iframe' );
			}

			public function contentInline( $atts, $content ) {
				$this->vcLoadIframeJsCss();
			}

			// Register scripts and styles there (for preview and frontend editor mode).
			public function jsCssScripts() {
				wp_register_script( 'test_element', plugins_url( 'assets/js/test_element.js', __FILE__ ), array( 'jquery' ), time(), false );
				wp_register_style( 'test_element_iframe', plugins_url( 'assets/front_enqueue_iframe_css.css', __FILE__ ) );
			}

			// Some custom helper function that can be used in content element template (vc_templates/test_element.php)
			// This function check some string if it matches "yes","true",1,"1" return TRUE if yes, false if NOT.
			public function checkBool( $in ) {
				if ( strlen( $in ) > 0 && in_array( strtolower( $in ), array(
					"yes",
					"true",
					"1",
					1
				) )
				) {
					return true;
				}
				return false;
			}

		}
	} // End Class
}


add_action('vc_after_init', 'text_vc_map_init');

