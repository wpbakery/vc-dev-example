<?php

$attributes = ( shortcode_atts( array(
	'value'       => 100,
	'bgcolor'     => '#e0e4e1',
	'actcolor'    => '#9fcb61',
	'cssanim'     => true,
	'showstroke'  => false,
	'strokecolor' => '#fff',
	'strokewidth' => 2,
	'innerfill'   => 50,
	'radius'      => 50
), $atts ) );

$value = (int) $attributes['value'];
if ( $value > 100 ) {
	$value = 100;
} else if ( $value < 0 ) {
	$value = 0;
}

// Enqueue Custom JS Script
wp_enqueue_script( 'test_element' );

// Enqueue Custom CSS Style
//wp_enqueue_style( 'test_element_css' ); // Must be previously registered in constructor (class WPBakeryShortCode_Test_Element extends WPBakeryShortCode).

// attributes for html
$radius       = 2 * (int) $attributes['radius'];
$val1         = $value;
$val2         = 100 - $value;
$col1         = $attributes['actcolor'];
$col2         = $attributes['bgcolor'];
$animation    = ( $this->checkBool( $attributes['cssanim'] ) ? "true" : "false" );
$show_stroke  = ( $this->checkBool( $attributes['showstroke'] ) ? "true" : "false" );
$stroke_color = $attributes['strokecolor'];
$stroke_width = (int) $attributes['strokewidth'];
$inner_fill   = (int) $attributes['innerfill'];

?>

<canvas class="piechartex" height="<?php echo $radius; ?>"
        width="<?php echo $radius; ?>"
        data-value-first="<?php echo $val1; ?>"
        data-value-second="<?php echo $val2; ?>"
        data-value-first-color="<?php echo $col1; ?>"
        data-value-second-color="<?php echo $col2; ?>"
        data-animation="<?php echo $animation; ?>"
        data-segment-stroke-show="<?php echo $show_stroke; ?>"
        data-segment-stroke-color="<?php echo $stroke_color; ?>"
        data-segment-stroke-width="<?php echo $stroke_width; ?>"
        data-percentage-inner-cutout="<?php echo $inner_fill; ?>"></canvas>

<div class="your_content_from_textarea_html">
	<?php echo wpb_js_remove_wpautop($content, true); ?>
</div>

