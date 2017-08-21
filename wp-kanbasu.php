<?php

/**
 * Plugin Name:        WordPress Kanbasu
 * Description:        Add Kanbasu support to WordPress (http://kanbasu.liip.ch/)
 * Text Domain:        wp-kanbasu
 * Author:             Studio ANDco
 * Author URI:         http://andco.ch
 * Author:             Gilles Crettenand
 * Author URI:         http://gilles.crettenand.info/
 * License:            WTFPL
 * License URI:        http://www.wtfpl.net/
 * GitHub Branch:      master
 * GitHub Plugin URI:  https://github.com/StudioANDco/wp-kanbasu
 * Version:            0.0.1
 * Requires at least:  4.8.1
 * Tested up to:       4.8.1
 **/

if ( preg_match( '#' . basename(__FILE__) . '#', $_SERVER['PHP_SELF'] ) ) {
    die('You are not allowed to call this page directly.');
}

if ( is_admin() ) {
    add_action( 'init', 'wp_kanbasu_buttons' );
}

function wp_kanbasu_buttons() {
    if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
        return;
    }

    if ( get_user_option( 'rich_editing' ) !== 'true' ) {
        return;
    }

    add_filter('mce_buttons', 'wp_kanbasu_register_buttons');
    add_filter('mce_external_plugins', 'wp_kanbasu_add_buttons');

    $mtime = stat(__DIR__.'/editor.css')['mtime'];
    add_editor_style( plugin_dir_url( __FILE__ ).'editor.css?'.$mtime);
}

function wp_kanbasu_add_buttons( $plugin_array ) {
    $mtime = stat(__DIR__.'/editor.js')['mtime'];
    $plugin_array['wpkanbasu'] = plugin_dir_url( __FILE__ ).'editor.js?'.$mtime;
    return $plugin_array;
}

function wp_kanbasu_register_buttons( $buttons ) {
    array_push( $buttons, '|', 'wpkanbasu_grid' );
    return $buttons;
}