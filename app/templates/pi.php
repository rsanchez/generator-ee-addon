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
 * <%= addonName %> Plugin
 *
 * @package   ExpressionEngine
 * @subpackage  Addons
 * @category  Plugin
 * @author    <%= authorName %>
 * @link    <%= authorUrl %>
 */

$plugin_info = array(
    'pi_name'   => '<%= addonSlug %>',
    'pi_version'  => '1.0.0',
    'pi_author'   => '<%= authorName %>',
    'pi_author_url' => '<%= authorUrl %>',
    'pi_description'=> '<%= addonDescription %>',
    'pi_usage'    => ''
);


class <%= _.capitalize(addonSlug) %> {

    public $return_data;

    /**
     * Constructor
     */
    public function __construct()
    {
    }
}


/* End of file pi.<%= addonSlug %>.php */
/* Location: /system/expressionengine/third_party/<%= addonSlug %>/pi.<%= addonSlug %>.php */
