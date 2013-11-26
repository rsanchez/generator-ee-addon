<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2013, EllisLab, Inc.
 * @license		http://expressionengine.com/user_guide/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */
 


/**
 * <%= moduleName %> Module Front End File
 *
 * @package		ExpressionEngine
 * @subpackage	Addons
 * @category	Module
 * @author		<%= moduleUsername %>
 * @link		<%= moduleURL %>
 */

class <%= _.capitalize(moduleSlug) %>
{
	public $return_data;
	
	/**
	 * Constructor
	 */
	public function __construct()
	{
		
	}
}
/* End of file mod.<%= moduleSlug %>.php */
/* Location: /system/expressionengine/third_party/<%= moduleSlug %>/mod.<%= moduleSlug %>.php */