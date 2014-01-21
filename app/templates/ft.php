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
 * <%= addonName %> Fieldtype
 *
 * @package   ExpressionEngine
 * @subpackage  Addons
 * @category  Fieldtype
 * @author    <%= authorName %>
 * @link    <%= authorUrl %>
 */

class <%= _.capitalize(addonSlug) %> {

  public $info = array(
    'name' => '<%= addonName &>',
    'version' => '1.0.0',
  );

  public $has_array_data = <%= hasFieldtypeTagPair ? 'TRUE' : 'FALSE' %>;

  /**
   * Display field
   *
   * @param   $data the entry data
   * @return  string
   *
   */
  public function _display_field($data, $field_name)
  {
    /*
    if ( ! $this->session->cache(__CLASS__, __FUNCTION__))
    {
      $this->load->library('javascript');
      
      $this->cp->add_to_head('<script type="text/javascript" src="'.URL_THIRD_THEMES.'<%= addonSlug %>/app.js"></script>');
      $this->cp->add_to_head('<link rel="stylesheet" media="all" href="'.URL_THIRD_THEMES.'<%= addonSlug %>/style.css">');
      
      $this->javascript->output('');

      $this->session->set_cache(__CLASS__, __FUNCTION__, true);
    }
    */

    return form_input($field_name, $data);
  }

  public function display_field($data)
  {
    return $this->_display_field($data, $this->field_name);
  }

  /**
   * Display Low Variable field
   **/
  public function display_var_field($data)
  {
    return $this->_display_field($data, $this->field_name));
  }

  /**
   * Display Matrix cell field
   **/
  public function display_cell($data)
  {
      return $this->_display_field($data, $this->cell_name);
  }

  /**
   * Save
   *
   * @param $data
   * @return string
   */
  public function save($data)
  {
    return $data;
  }

  /**
   * Save Low Variable
   **/
  public function save_var_field($data)
  {
    return $this->save($data);
  }
  /**
   * Save Matrix cell
   **/
  public function save_cell($data)
  {
    return $this->save($data);
  }

  /**
   * Pre Process
   *
   * @param $data
   * @return mixed
   */
  public function pre_process($data)
  {
    return $data;
  }
  
  /**
   * Replace tag
   *
   * @param $data
   * @param $params tag params array
   * @param $tagdata the tagdata string
   * @return string
   */
  public function replace_tag($data, $params = array(), $tagdata = FALSE)
  {
    <% if (hasFieldtypeTagPair) { %>
    return $data ? ee()->TMPL->parse_variables($tagdata, $data) : ee()->TMPL->no_results();
    <% } else { %>
    return $data;
    <% } %>
  }

  /**
   * Replace Low Variable tag
   **/
  public function display_var_tag($data, $params = array(), $tagdata = false)
  {
    return $this->replace_tag($data, $params, $tagdata);
  }
<% if (hasFieldtypeSettings) { %>
  public function _display_settings($data)
  {
    return array(
      array(
        form_label(lang('your_setting')),
        form_input('your_setting', $data['your_setting']),
      ),
    );
  }

  /**
   * Display channel field settings
   **/
  public function display_settings($data)
  {
    foreach ($this->_display_settings($data) as $row)
    {
      ee()->table->add_row($row[0], $row[1]);
    }
  }

  /**
   * Display Matrix cell settings
   **/
  public function display_cell_settings($data)
  {
    return $this->_display_settings($data);
  }

  /**
   * Display Low Variable settings
   **/
  public function display_var_settings($data)
  {
    return $this->_display_settings($data);
  }

  public function _save_settings($data)
  {
    return array(
      'your_setting' => isset($data['your_setting']) ? $data['your_setting'] : FALSE,
    );
  }

  /**
   * Save channel field settings
   **/
  public function save_settings()
  {
    return array_merge($this->_save_settings($_POST), array(
      'field_fmt' => 'none',
      'field_show_fmt' => 'n',
    ));
  }

  /**
   * Save Matrix cell settings
   **/
  public function save_cell_settings($data)
  {
    return $this->_save_settings($data);
  }

  /**
   * Save Low Variable settings
   **/
  public function save_var_settings($data)
  {
    return $this->_save_settings($data);
  }
<% } %>
<% if (hasFieldTypeGlobalSettings) { %>
  public function display_global_settings()
  {
    return form_label('license_key', 'license_key').NBS.form_input('license_key', $this->settings['license_key']);
  }

  public function save_global_settings()
  {
    return array_merge($this->settings, $_POST);
  }
<% } %>
}


/* End of file ft.<%= addonSlug %>.php */
/* Location: /system/expressionengine/third_party/<%= addonSlug %>/ft.<%= addonSlug %>.php */