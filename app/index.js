'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EeModuleGenerator = module.exports = function EeModuleGenerator(args, options, config)
{
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function ()
	{
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EeModuleGenerator, yeoman.generators.Base);

EeModuleGenerator.prototype.askFor = function askFor()
{
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
	{
		name: 'moduleName',
		message: 'What do you want to call your module?'
	},
	{
		name: 'moduleSlug',
		message: 'What EE slug and class name do you want to give your module?'
	},
	{
		name: 'moduleUsername',
		message: 'What is your name?'
	},
	{
		name: 'moduleURL',
		message: 'What is your URL?'
	},
	{
		type: 'confirm',
		name: 'hasTheme',
		message: 'Does this module need theme files?',
		default: true
	},
	{
		type: 'confirm',
		name: 'hasTemplate',
		message: 'Do you want template files for this module?',
		default: true
	}];

	this.prompt(prompts, function (props)
	{
		this.hasTheme       = props.hasTheme;
		this.hasTemplate    = props.hasTemplate;
		this.moduleName     = props.moduleName;
		this.moduleSlug     = props.moduleSlug;
		this.moduleUsername = props.moduleUsername;
		this.moduleURL      = props.moduleURL;
		cb();
	}.bind(this));
};

EeModuleGenerator.prototype.app = function app()
{
	var moduleFolder = 'system/expressionengine/third_party/' + this.moduleSlug;

	// Make the system folders
	this.mkdir('system');
	this.mkdir('system/expressionengine');
	this.mkdir('system/expressionengine/third_party');
	this.mkdir(moduleFolder);
	this.mkdir(moduleFolder + '/helpers');
	this.mkdir(moduleFolder + '/language');
	this.mkdir(moduleFolder + '/language/english');
	this.mkdir(moduleFolder + '/libraries');
	this.mkdir(moduleFolder + '/models');
	this.mkdir(moduleFolder + '/views');

	if(this.hasTheme)
	{
		// Make the theme folders
		this.mkdir('themes');
		this.mkdir('themes/third_party');
		this.mkdir('themes/third_party/' + this.moduleSlug);
		this.mkdir('themes/third_party/' + this.moduleSlug + '/js');
		this.mkdir('themes/third_party/' + this.moduleSlug + '/js/src');
		this.mkdir('themes/third_party/' + this.moduleSlug + '/sass');
		this.mkdir('themes/third_party/' + this.moduleSlug + '/css');
		this.template('Gruntfile.js', 'Gruntfile.js');
	}

	if(this.hasTemplate)
	{
		var templateFolder = 'templates/default_site/' + this.moduleSlug + '.group';
		var assetsFolder = 'templates/default_site/assets';

		// Make a template group for front end files
		this.mkdir('templates');
		this.mkdir('templates/default_site');
		this.mkdir(assetsFolder);
		this.mkdir(assetsFolder + '/css');
		this.mkdir(assetsFolder + '/sass');
		this.mkdir(assetsFolder + '/js');
		this.mkdir(assetsFolder + '/js/src');
		this.mkdir(templateFolder);

		// Install some samples
		this.template('template/header.html', templateFolder + '/header.html');
		this.template('template/index.html', templateFolder + '/index.html');
		this.template('template/footer.html', templateFolder + '/footer.html');
		this.template('template/Gruntfile.js', 'templates/default_site/Gruntfile.js');
		this.template('template/_package.json', 'templates/default_site/package.json');
	}

	this.template('_package.json', 'package.json');
	this.template('README.md', 'README.md');

	// Install module files
	this.template('module/upd.module.php', moduleFolder + '/upd.' + this.moduleSlug + '.php');
	this.template('module/mod.module.php', moduleFolder + '/mod.' + this.moduleSlug + '.php');
	this.template('module/mcp.module.php', moduleFolder + '/mcp.' + this.moduleSlug + '.php');
	this.template('module/model.php', moduleFolder + '/models/' + this.moduleSlug + '_model.php');
	this.template('module/library.php', moduleFolder + '/libraries/' + this.moduleSlug + '.php');
	this.template('module/helper.php', moduleFolder + '/helpers/' + this.moduleSlug + '_helper.php');
	this.template('module/lang.module.php', moduleFolder + '/language/english/lang.' + this.moduleSlug + '.php');
	this.template('module/index.php', moduleFolder + '/views/index.php');
};

EeModuleGenerator.prototype.runtime = function runtime()
{
	this.copy('gitignore', '.gitignore');
};
