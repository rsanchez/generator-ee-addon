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

  var self = this;

  var gitUser = this.shell.exec('git config --get github.user', { silent: true }).output.trim();

  this.defaultAuthorName = this.config.get('authorName') || this.user.git.username,
  this.defaultAuthorUrl = this.config.get('authorUrl'),
  this.defaultSystemPath = this.config.get('systemPath') || 'system/expressionengine/third_party/',
  this.defaultThemePath = this.config.get('themePath') || 'themes/third_party/';

  if ( ! this.defaultAuthorUrl && gitUser) {
    this.defaultAuthorUrl = 'https://github.com/' + gitUser;
  }

  this.extensionHooks = [];
  this.extensionMethods = [];
  this.currentYear = (new Date()).getFullYear();

  var prompts = [
    {
      name: 'addonTypes',
      message: 'Which add-on type(s) are you making?',
      type: 'checkbox',
      required: true,
      default: [],
      validate: function(data) {
        return (data.length > 0) ? true : 'You must choose an add-on type.';
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
      message: 'What do you want to name your add-on? (ex. Google Maps)',
      validate: function(data) {
        return (data.length > 0) ? true : 'You must choose an add-on name.';
      }
    },
    {
      name: 'addonSlug',
      message: 'What slug name do you want to give your add-on? (ex. google_maps)',
      default: function(data) {
        return data.addonName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
      },
      validate: function(data) {
        return (data.length > 0) ? true : 'You must choose an add-on slug.';
      }
    },
    {
      name: 'addonDescription',
      message: 'What is the description for this add-on?',
      when: function(data) {
        return data.addonTypes.indexOf('plugin') !== -1 ||
               data.addonTypes.indexOf('accessory') !== -1 ||
               data.addonTypes.indexOf('extension') !== -1 ||
               data.addonTypes.indexOf('module') !== -1;
      }
    },
    {
      name: 'authorName',
      message: 'What is your name?',
      default: this.defaultAuthorName
    },
    {
      name: 'authorUrl',
      message: 'What is your URL?',
      default: this.defaultAuthorUrl
    },
    {
      type: 'confirm',
      name: 'hasTheme',
      message: 'Does this add-on need theme files?',
      default: false
    },
    {
      name: 'systemPath',
      message: 'What is the system path?',
      default: this.defaultSystemPath
    },
    {
      name: 'themePath',
      message: 'What is the system path?',
      default: this.defaultThemePath,
      when: function(data) {
        return data.hasTheme;
      }
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
      name: 'fieldtypeSupport',
      message: 'Which field types do you want to support?',
      type: 'checkbox',
      required: false,
      default: [],
      choices: [
        {
          name: 'Matrix',
          value: 'matrix',
          checked: true
        },
        {
          name: 'Grid',
          value: 'grid',
          checked: true
        },
        {
          name: 'Low Variables',
          value: 'low_variables',
          checked: true
        },
        {
          name: 'Content Elements',
          value: 'content_elements',
          checked: true
        }
      ],
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
    this.fieldtypeSupport = props.fieldtypeSupport || [];
    this.fieldtypeMatrixSupport = this.fieldtypeSupport.indexOf('matrix') !== -1;
    this.fieldtypeGridSupport = this.fieldtypeSupport.indexOf('grid') !== -1;
    this.fieldtypeLowVariablesSupport = this.fieldtypeSupport.indexOf('low_variables') !== -1;
    this.fieldtypeContentElementsSupport = this.fieldtypeSupport.indexOf('content_elements') !== -1;
    this.hasFieldtypeSettings = props.hasFieldtypeSettings;
    this.hasFieldtypeGlobalSettings = props.hasFieldtypeGlobalSettings;
    this.hasFieldtypeTagPair = props.hasFieldtypeTagPair;
    this.hasLang = (this.hasExtensionSettings || this.hasModule);
    this.systemPath = props.systemPath.replace(/\/$/, '') + '/';
    this.themePath = (this.hasTheme) ? props.themePath.replace(/\/$/, '') + '/' : null;
    if (this.hasExtension) {
      getExtensionHook();
    } else {
      cb();
    }
  }.bind(this));

  function getExtensionHook() {
    var hasHooks = self.extensionHooks.length > 0,
        hookMessage = hasHooks ? 'Add another extension hook (Leave blank to complete generator):' : 'Which extension hook does this extension use?';

    self.prompt([
      {
        name: 'extensionHook',
        message: hookMessage,
        default: function(data) {
          return hasHooks ? '' : 'channel_entries_query';
        },
        validate: function(data) {
          return (hasHooks || data.length > 0) ? true : 'You must choose an extension hook.';
        }
      },
      {
        name: 'extensionMethod',
        message: 'What method name does the prior hook use?',
        default: function(data) {
          return data.extensionHook;
        },
        when: function(data) {
          return data.extensionHook;
        },
        validate: function(data) {
          return (data.length > 0) ? true : 'You must choose a method name.';
        }
      }
    ], function(props) {
      if (props.extensionHook) {
        self.extensionHooks.push(props.extensionHook);
        self.extensionMethods.push(props.extensionMethod);
        getExtensionHook();
      } else {
        cb();
      }
    });
  }
};

EeModuleGenerator.prototype.app = function app()
{
  var folder = this.systemPath + this.addonSlug;

  // cache these for future use
  if (this.authorName && this.authorName !== this.defaultAuthorName) {
    this.config.set('authorName', this.authorName);
  }
  if (this.authorUrl && this.authorUrl !== this.defaultAuthorUrl) {
    this.config.set('authorUrl', this.authorUrl);
  }
  if (this.systemPath !== this.defaultSystemPath) {
    this.config.set('systemPath', this.systemPath);
  }
  if (this.themePath && this.themePath !== this.defaultThemePath) {
    this.config.set('themePath', this.themePath);
  }

  // Make the system folders
  this.mkdir(folder);

  if (this.hasTheme) {
    // Make the theme folders
    this.mkdir(this.themePath + this.addonSlug);
    this.template('index.html', this.themePath + this.addonSlug + '/index.html');
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
