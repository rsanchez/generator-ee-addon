<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2011, EllisLab, Inc.
 * @license		http://expressionengine.com/user_guide/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */
 


/**
 * <%= moduleName %> Module Model
 *
 * @package		ExpressionEngine
 * @subpackage	Addons
 * @category	Model
 * @author		<%= moduleUsername %>
 * @link		<%= moduleURL %>
 */

class <%= _.capitalize(moduleSlug) %>_model extends CI_Model
{
	private $prefix;
	private $table = 'table_name';

	public function __construct()
	{
		parent::__construct();
		$this->prefix = ee()->db->dbprefix;
	}
}
/* End of file <%= moduleSlug %>_model.php */
/* Location: /system/expressionengine/third_party/<%= moduleSlug %>/models/<%= moduleSlug %>_model.php */