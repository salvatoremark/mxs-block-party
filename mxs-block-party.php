<?php

/**
 * Plugin Name:       Mxs Block Party
 * Description:       A new block created by the create-block tool using a custom external project template.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Mark Salvatore
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mxs-block-party
 *
 * @package MxsBlockParty
 */


// Exit if accessed directly
defined('ABSPATH') || exit;

if (!class_exists('Msalv_MxsBlockParty')) {

  class Msalv_MxsBlockParty {

    function __construct() {
      add_action('init', array($this, 'block_init'));
    }
    /**
     * Register the block using the metadata loaded from `block.json`.
     * It also registers all assets so they can be enqueued.
     *
     * @see https://developer.wordpress.org/reference/functions/register_block_type/
     */
    function block_init() {
      register_block_type(__DIR__ . '/build/text-shadower');
      register_block_type(__DIR__ . '/build/text-slicer');
      register_block_type(__DIR__ . '/build/golden-text');
    }
  }
  $msalvMxsBlockParty = new Msalv_MxsBlockParty();
}
