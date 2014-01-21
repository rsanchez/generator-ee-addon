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

/**
 * <%= addonName %> Module Install/Update File
 *
 * @package   ExpressionEngine
 * @subpackage  Addons
 * @category  Module
 * @author    <%= authorName %>
 * @link    <%= authorUrl %>
 */

class <%= _.capitalize(addonSlug) %>_upd
{
    public $version = '1.0.0';

    /**
     * Installation Method
     *
     * @return  boolean
     */
    public function install()
    {
        /* Module Install
        --------------------------------------------------------------- */
        $mod_data = array(
            'module_name'        => '<%= _.capitalize(addonSlug) %>',
            'module_version'     => $this->version,
            'has_cp_backend'     => '<%= hasModuleCp ? "y" : "n" %>',
            'has_publish_fields' => '<%= hasModuleTab ? "y" : "n" %>',
        );

        ee()->db->insert('modules', $mod_data);


        /* Action Install
        --------------------------------------------------------------- */
        $data = array(
            'class'  => '<%= _.capitalize(addonSlug) %>',
            'method' => 'method_name'
        );
        ee()->db->insert('actions', $data);


        /* Custom Table Install
        --------------------------------------------------------------- */
        ee()->load->dbforge();

        $fields = array(
            // Keys
            'entity_id'  => array('type' => 'INT', 'unsigned' => TRUE, 'auto_increment' => TRUE),
            'site_id'    => array('type' => 'INT', 'unsigned' => TRUE, 'default' => 0),
            'foreign_id' => array('type' => 'INT', 'unsigned' => TRUE, 'default' => 0),

            // Text
            'title'      => array('type' => 'VARCHAR', 'constraint' => '255', 'default' => ''),
            'url_title'  => array('type' => 'VARCHAR', 'constraint' => '255', 'default' => ''),
            'content'    => array('type' => 'TEXT', 'default' => ''),

            // Dates
            'created'    => array('type' => 'DATETIME'),
            'updated'    => array('type' => 'DATETIME'),

            // Misc
            'status'     => array('type' => 'ENUM', 'constraint' => "'Open', 'Closed', 'Cancelled'", 'default'=> 'Open'),
            'private'    => array('type' => 'BOOL', 'default' => 0),
        );

        ee()->dbforge->add_field($fields);
        ee()->dbforge->add_key('entity_id', TRUE);
        ee()->dbforge->add_key('foreign_id');
        ee()->dbforge->add_key('site_id');
        ee()->dbforge->create_table('table_name', TRUE);

        return TRUE;
    }

    /**
     * Uninstall
     *
     * @return  boolean
     */
    public function uninstall()
    {
        /* Action Uninstall
        --------------------------------------------------------------- */
        ee()->db->where('class', '<%= _.capitalize(addonSlug) %>');
        ee()->db->delete('actions');

        /* Module Uninstall
        --------------------------------------------------------------- */
        $mod_id = ee()->db->select('module_id')->get_where('modules', array('module_name' => '<%= _.capitalize(addonSlug) %>'))->row('module_id');
        ee()->db->where('module_id', $mod_id)->delete('module_member_groups');
        ee()->db->where('module_name', '<%= _.capitalize(addonSlug) %>')->delete('modules');

        /* Custom Tables Uninstall
        --------------------------------------------------------------- */
        ee()->load->dbforge();
        ee()->dbforge->drop_table('table_name');

        return TRUE;
    }

    /**
     * Module Updater
     *
     * @return  boolean
     */
    public function update($current = '')
    {
        return TRUE;
    }
}

/* End of file upd.<%= addonSlug %>.php */
/* Location: /system/expressionengine/third_party/<%= addonSlug %>/upd.<%= addonSlug %>.php */
