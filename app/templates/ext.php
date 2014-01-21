<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * ExpressionEngine - by EllisLab
 *
 * @package   ExpressionEngine
 * @author    ExpressionEngine Dev Team
 * @copyright Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license   http://expressionengine.com/user_guide/license.html
 * @link    http://expressionengine.com
 * @since   Version 2.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * <%= addonName %> Extension
 *
 * @package   ExpressionEngine
 * @subpackage  Addons
 * @category  Extension
 * @author    <%= authorName %>
 * @link    <%= authorUrl %>
 */

class <%= _.capitalize(addonSlug) %>_ext {

    public $settings    = array();
    public $description   = '<%= addonDescription %>';
    public $docs_url    = '';
    public $name      = '<%= addonName %>';
    public $settings_exist  = '<%= hasExtensionSettings ? "y" : "n" %>';
    public $version     = '1.0.0';

    /**
     * Constructor
     *
     * @param   mixed Settings array or empty string if none exist.
     */
    public function __construct($settings = '')
    {
        $this->settings = $settings;
    }

    // ----------------------------------------------------------------------

    /**
     * Activate Extension
     *
     * This function enters the extension into the exp_extensions table
     *
     * @see http://codeigniter.com/user_guide/database/index.html for
     * more information on the db class.
     *
     * @return void
     */
    public function activate_extension()
    {
        // Setup custom settings in this array.
        $this->settings = array();

        $data = array(
            'class' => __CLASS__,
            'method' => 'channel_entries_query_result',
            'hook' => 'channel_entries_query_result',
            'settings' => serialize($this->settings),
            'version' => $this->version,
            'enabled' => 'y',
        );

        ee()->db->insert('extensions', $data);

    }

    // ----------------------------------------------------------------------

    /**
     * channel_entries_query_result
     *
     * @param
     * @return
     */
    public function channel_entries_query_result()
    {
        // Add Code for the channel_entries_query_result hook here.
    }

    // ----------------------------------------------------------------------

    /**
     * Disable Extension
     *
     * This method removes information from the exp_extensions table
     *
     * @return void
     */
    public function disable_extension()
    {
        ee()->db->delete('extensions', array('class' => __CLASS__));
    }

    // ----------------------------------------------------------------------

    /**
     * Update Extension
     *
     * This function performs any necessary db updates when the extension
     * page is visited
     *
     * @return  mixed void on update / false if none
     */
    public function update_extension($current = '')
    {
        if ($current == '' OR $current == $this->version)
        {
            return FALSE;
        }
    }

    // ----------------------------------------------------------------------
}

/* End of file ext.<%= addonSlug %>.php */
/* Location: /system/expressionengine/third_party/<%= addonSlug %>/ext.<%= addonSlug %>.php */
