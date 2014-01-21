'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EeModuleGenerator = module.exports = function EeModuleGenerator(args, options, config)
{
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(EeModuleGenerator, yeoman.generators.Base);

EeModuleGenerator.prototype.askFor = function askFor()
{
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'addonTypes',
      message: 'Which Add-On type(s) are you making?',
      type: 'checkbox',
      required: true,
      default: [],
      validate: function(data) {
        return (data.length > 0) ? true : 'You must choose an Add-On type.';
      },
      choices: [
        {
          name: 'Plugin',
          value: 'plugin',
        },
        {
          name: 'Extension',
          value: 'extension',
        },
        {
          name: 'Module',
          value: 'module',
        },
        {
          name: 'Fieldtype',
          value: 'fieldtype',
        },
        {
          name: 'Accessory',
          value: 'accessory',
        },
      ]
    },
    {
      name: 'addonName',
      message: 'What do you want to name your Add-On? (ex. Google Maps)',
      validate: function(data) {
        return (data.length > 0) ? true : 'You must choose an Add-On name.';
      }
    },
    {
      name: 'addonSlug',
      message: 'What slug name do you want to give your Add-On? (ex. google_maps)',
      validate: function(data) {
        return (data.length > 0) ? true : 'You must choose an Add-On slug.';
      }
    },
    {
      name: 'addonDescription',
      message: 'What is Add-On description?',
      when: function(data) {
        return data.addonTypes.indexOf('plugin') !== -1 ||
               data.addonTypes.indexOf('accessory') !== -1 ||
               data.addonTypes.indexOf('extension') !== -1 ||
               data.addonTypes.indexOf('module') !== -1;
      }
    },
    {
      name: 'authorName',
      message: 'What is your name?'
    },
    {
      name: 'authorUrl',
      message: 'What is your URL?'
    },
    {
      type: 'confirm',
      name: 'hasExtensionSettings',
      message: 'Does the extension have settings?',
      default: false,
      when: function(data) {
        return data.addonTypes.indexOf('extension') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasModuleMod',
      message: 'Does the module need a mod file for template tags?',
      default: true,
      when: function(data) {
        return data.addonTypes.indexOf('module') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasModuleMcp',
      message: 'Does the module need an mcp file for control panel views or actions?',
      default: true,
      when: function(data) {
        return data.addonTypes.indexOf('module') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasModuleCp',
      message: 'Does the module have a control panel backend?',
      default: false,
      when: function(data) {
        return data.addonTypes.indexOf('module') !== -1 && data.hasModuleMcp;
      }
    },
    {
      type: 'confirm',
      name: 'hasModuleTab',
      message: 'Does the module have a publish tab?',
      default: false,
      when: function(data) {
        return data.addonTypes.indexOf('module') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasFieldtypeSettings',
      message: 'Does the fieldtype have settings?',
      default: false,
      when: function(data) {
        return data.addonTypes.indexOf('fieldtype') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasFieldtypeGlobalSettings',
      message: 'Does the fieldtype have global settings?',
      default: false,
      when: function(data) {
        return data.addonTypes.indexOf('fieldtype') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasFieldtypeTagPair',
      message: 'Does the fieldtype have a tag pair?',
      default: false,
      when: function(data) {
        return data.addonTypes.indexOf('fieldtype') !== -1;
      }
    },
    {
      type: 'confirm',
      name: 'hasTheme',
      message: 'Does this Add-On need theme files?',
      default: false
    }
  ];

  this.prompt(prompts, function (props)
  {
    this.hasPlugin = props.addonTypes.indexOf('plugin') !== -1;
    this.hasExtension = props.addonTypes.indexOf('extension') !== -1;
    this.hasModule = props.addonTypes.indexOf('module') !== -1;
    this.hasFieldtype = props.addonTypes.indexOf('fieldtype') !== -1;
    this.hasAccessory = props.addonTypes.indexOf('accessory') !== -1;
    this.hasTheme = props.hasTheme;
    this.addonName = props.addonName;
    this.addonSlug = props.addonSlug;
    this.addonDescription = props.addonDescription;
    this.authorName = props.authorName;
    this.authorUrl = props.authorUrl;
    this.hasExtensionSettings = props.hasExtensionSettings;
    this.hasModuleMod = props.hasModuleMod;
    this.hasModuleMcp = props.hasModuleMcp;
    this.hasModuleCp = props.hasModuleCp;
    this.hasModuleTab = props.hasModuleTab;
    this.hasFieldtypeSettings = props.hasFieldtypeSettings;
    this.hasFieldtypeGlobalSettings = props.hasFieldtypeGlobalSettings;
    this.hasFieldtypeTagPair = props.hasFieldtypeTagPair;
    this.hasLang = (this.hasExtensionSettings || this.hasModule);
    cb();
  }.bind(this));
};

EeModuleGenerator.prototype.app = function app()
{
  var folder = 'system/expressionengine/third_party/' + this.addonSlug;

  // Make the system folders
  this.mkdir('system');
  this.mkdir('system/expressionengine');
  this.mkdir('system/expressionengine/third_party');
  this.mkdir(folder);

  if (this.hasTheme) {
    // Make the theme folders
    this.mkdir('themes');
    this.mkdir('themes/third_party');
    this.mkdir('themes/third_party/' + this.addonSlug);
    this.template('index.html', 'themes/third_party/' + this.addonSlug + '/index.html');
  }

  // Install module files
  if (this.hasModule) {
    this.template('upd.php', folder + '/upd.' + this.addonSlug + '.php');
    if (this.hasModuleMod) {
      this.template('mod.php', folder + '/mod.' + this.addonSlug + '.php');
    }
    if ( ! this.hasModuleMod || this.hasModuleMcp) {
      this.template('mcp.php', folder + '/mcp.' + this.addonSlug + '.php');
    }
  }

  if (this.hasLang) {
    this.mkdir(folder + '/language');
    this.mkdir(folder + '/language/english');
    this.template('lang.php', folder + '/language/english/' + this.addonSlug + '_lang.php');
  }

  if (this.hasExtension) {
    this.template('ext.php', folder + '/ext.' + this.addonSlug + '.php');
  }

  if (this.hasPlugin) {
    this.template('pi.php', folder + '/pi.' + this.addonSlug + '.php');
  }

  if (this.hasAccessory) {
    this.template('acc.php', folder + '/acc.' + this.addonSlug + '.php');
  }

  if (this.hasFieldtype) {
    this.template('ft.php', folder + '/ft.' + this.addonSlug + '.php');
  }
};
