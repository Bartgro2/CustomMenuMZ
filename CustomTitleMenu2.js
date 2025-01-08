//=============================================================================
// CustomTitleMenu
//=============================================================================

// SECTIONS
// * Section 1: Title menu
//   - 1.0 : Titlemenu
//   - 1.1 : optionsmenu 
//   - 1.2 : optionsSubmenu  
//   - 1.3 : submenuwindowclass
//   - 1.4 : submenuSceneclass 
// *** PLUGIN PARAMETERS
/*:
* @plugindesc changes the default layout of the title screen by adding more options, adds an exit function, submenu's for audio, controls, custom & language.
* @author Akira enishi
* @help   Akira enishi's CustomTitlemenu
*
* This plugin provides customization options for the title menu. You can adjust the labels for various menu items and submenu options.

* @param newgameLabel
* @desc Label for the "New Game" option.
* @default New Game
*
* @param continueLabel
* @desc Label for the "Continue" option.
* @default Continue
*
* @param optionsLabel
* @desc Label for the "Options" option.
* @default Options
*
* @param exitLabel
* @desc Label for the "Exit" option.
* @default Exit
*
* @param audioLabel
* @desc Label for the "Audio" submenu.
* @default Audio
*
* @param languageLabel
* @desc Label for the "Language" submenu.
* @default Language
*
* @param controlsLabel
* @desc Label for the "Controls" submenu.
* @default Controls
*
* @param customLabel
* @desc Label for the "Custom" submenu.
* @default Custom
*
* @param bgmLabel
* @desc Label for the "BGM Volume" option in the Audio submenu.
* @default BGM Volume
*
* @param bgsLabel
* @desc Label for the "BGS Volume" option in the Audio submenu.
* @default BGS Volume
*
* @param meLabel
* @desc Label for the "ME Volume" option in the Audio submenu.
* @default ME Volume
*
* @param seLabel
* @desc Label for the "SE Volume" option in the Audio submenu.
* @default SE Volume
*
* @param englishLabel
* @desc Label for the "English" option in the Language submenu.
* @default English
*
* @param alwaysdashLabel
* @desc Label for the "Always Dash" option in the Controls submenu.
* @default Always Dash
*
* @param commandRememberLabel
* @desc Label for the "Command Remember" option in the Custom submenu.
* @default Command Remember
*/
//==============================================================================================================
// Define default parameters
const defaultParams = {
  // Standard options
  newgameLabel: 'New Game',
  continueLabel: 'Continue',
  optionsLabel: 'Options',
  exitLabel: 'Exit',

  // Options submenu
  audioLabel: 'Audio',
  languageLabel: 'Language',
  controlsLabel: 'Controls',
  customLabel: 'Custom',

  // submenu audio
  bgmLabel: 'BGM Volume',
  bgsLabel: 'BGS Volume',
  meLabel: 'ME Volume',
  seLabel: 'SE Volume',

  // submenu language
  englishLabel: 'English',

  // submenu controls
  alwaysdashLabel: 'Always Dash',

  // submenu custom
  commandRememberLabel: 'Command Remember',
};

// Read plugin parameters
const readPluginParams = () => {
  const parameters = PluginManager.parameters("CustomTitleMenu2");
  const parsedParams = {};

  for (const param in parameters) {
    parsedParams[param] = parameters[param];
  }

  return Object.assign({}, defaultParams, parsedParams);
};


const pluginParams = readPluginParams();

//==============================================================================================================
// * SECTION 1 : Titlemenu
//   - adjust the default layout
//==============================================================================================================

class Window_CustomTitleCommand extends Window_TitleCommand {
 
  makeCommandList() {
    this.addCommand(pluginParams.newgameLabel,'newGame');
    this.addCommand(pluginParams.continueLabel, 'continue');
    this.addCommand(pluginParams.optionsLabel, 'options');
    this.addCommand(pluginParams.exitLabel, 'exit');
  }

  commandExit() {
    if (confirm('Are you sure you want to exit?')) {
      console.log('Exit Selected');
      SceneManager.exit();
    }
  }

  processOk() {
    if (this.isHandled(this.currentSymbol())) {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();

      const currentSymbol = this.currentSymbol();

      if (currentSymbol === 'options') {
        SceneManager.push(Scene_OptionsMenu);
        this.hide();
      } else if (currentSymbol === 'exit') {
        this.commandExit();
      } else {
        this.callOkHandler();
      }
    }
  }
}

Object.assign(Scene_Title.prototype, {
  createCommandWindow: function () {
    this._commandWindow = new Window_CustomTitleCommand();
    this.addWindow(this._commandWindow);

    this._commandWindow.setHandler('newGame', () => this.commandNewGame());
    this._commandWindow.setHandler('continue', () => this.commandContinue());
    this._commandWindow.setHandler('options', () => this.commandOptions());
    this._commandWindow.setHandler('exit', () => this.commandExit());
  }
});

//==============================================================================================================
// * SECTION 1.1 : Optionsmenu
//   - makes an options submenu
//==============================================================================================================


class Scene_OptionsMenu extends Scene_MenuBase {
  constructor() {
    super();
    this.initialize.apply(this, arguments);
  }

  initialize() {
    Scene_MenuBase.prototype.initialize.call(this);
  }

  create() {
    super.create();
    this.createOptionsCommandWindow();
  }

  start() {
    super.start();
    this._commandWindow.refresh();
    this._commandWindow.activate();
  }

  createOptionsCommandWindow() {
    this._commandWindow = new Window_OptionsCommand();
    this.addWindow(this._commandWindow);
  
    // Calculate the position to center the options menu window
    const offsetX = (Graphics.boxWidth - this._commandWindow.width) / 2;
    const offsetY = (Graphics.boxHeight - this._commandWindow.height) / 2;
    
    // Center the options menu window on the screen
    this._commandWindow.x = offsetX;
    this._commandWindow.y = offsetY;
  
    // Set up handlers for options commands
    this._commandWindow.setHandler('audio', () => this.commandAudio());
    this._commandWindow.setHandler('language', () => this.commandLanguage());
    this._commandWindow.setHandler('controls', () => this.commandControls());
    this._commandWindow.setHandler('custom', () => this.commandCustom());
  
    // Refresh and activate the options menu window
    this._commandWindow.refresh();
    this._commandWindow.activate();
  }

  commandAudio() {
    this.createSubmenuWindow('bgmVolume', 'BGM Volume');
  }

  commandLanguage() {
    this.createSubmenuWindow('languageVolume', 'Language Volume');
  }

  commandControls() {
    this.createSubmenuWindow('controlsVolume', 'Controls Volume');
  }

  commandCustom() {
    this.createSubmenuWindow('customVolume', 'Custom Volume');
  }

  createSubmenuWindow(commandName, commandLabel) {
    console.log(`${commandLabel} Sub-Menu Selected`);

    // Add specific logic for each submenu based on commandName if needed
    switch (commandName) {
      case 'bgmVolume':
        SceneManager.push(Scene_AudioOptions);
        break;
      case 'languageVolume':
        SceneManager.push(Scene_LanguageOptions);
        break;
      case 'controlsVolume':
        SceneManager.push(Scene_ControlsOptions);
        break;
      case 'customVolume':
        SceneManager.push(Scene_CustomOptions);
        break;
      default:
        console.warn(`No submenu logic defined for ${commandName}`);
       
    }

  }
}

class Window_OptionsCommand extends Window_Command {

  makeCommandList() {
    this.addCommand(pluginParams.audioLabel, 'audio');
    this.addCommand(pluginParams.languageLabel, 'language');
    this.addCommand(pluginParams.controlsLabel, 'controls');
    this.addCommand(pluginParams.customLabel, 'custom');
  }
}

//==============================================================================================================
// * SECTION 1.2 : Optionssubmenu
//   - prepares for the submenu's
//==============================================================================================================


class Scene_OptionsSubMenu extends Scene_MenuBase {
  constructor(optionsType, volumeType = null) {
    super();
    this._optionsType = optionsType;
    this._volumeType = volumeType;
  }

  create() {
    super.create();
    this.createOptionsWindow();
  }

  createOptionsWindow() {
    // Implement the options window creation logic here
    if (this._volumeType !== null) {
      console.log(`${this._volumeType} ${this._optionsType} Sub-Menu Selected`);
    } else {
      console.log(`${this._optionsType} Sub-Menu Selected`);
    }
  }
}

class Window_SubmenuOptions extends Window_Command {
  constructor() {
    super(...arguments);
  }

  makeCommandList() {
    // Implement the common commands for all submenus
    this.addCommand('Back', 'back');
  }
}

// Generic Submenu Scene Class
class Scene_SubmenuOptions extends Scene_MenuBase {
  constructor(submenuWindowClass, commandHandlers) {
      super();
      this._submenuWindowClass = submenuWindowClass;
      this._commandHandlers = commandHandlers;
  }

  create() {
      super.create();
      this.createSubmenuWindow();
  }

  createSubmenuWindow() {
      this._submenuWindow = new this._submenuWindowClass();
      this._submenuWindow.x = (Graphics.boxWidth - this._submenuWindow.width) / 2;
      this._submenuWindow.y = (Graphics.boxHeight - this._submenuWindow.height) / 2;
      this._submenuWindow.setHandler('back', () => this.popScene());
      for (const command in this._commandHandlers) {
          this._submenuWindow.setHandler(command, this._commandHandlers[command]);
      }
      this.addWindow(this._submenuWindow);
  }
}


//==============================================================================================================
// * SECTION 1.3 : Submenu window classes
//   - all the submenu window classes
//==============================================================================================================

// Utility function for audio settings


// Window_Options
//
// The window for changing various settings on the options screen.



class Window_AudioOptions extends Window_SubmenuOptions {
  constructor() {
    super();
  }
   makeCommandList() {
    super.makeCommandList();
    this.addCommand(pluginParams.bgmLabel, 'bgmVolume');
    this.addCommand(pluginParams.bgsLabel, 'bgsVolume');
    this.addCommand(pluginParams.meLabel, 'meVolume');
    this.addCommand(pluginParams.seLabel, 'seVolume');
  }  

  processOk() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (['bgmVolume', 'bgsVolume', 'meVolume', 'seVolume'].includes(symbol)) {
      // Handle audio option selection
      this.onAudioOptionOk(symbol);
    } else {
      // Call the parent processOk method for other options
      super.processOk();
    }
  }

  // Handle audio option selection
  onAudioOptionOk(symbol) {
    // Implement your logic here for audio option selection
    console.log(`${symbol} selected`);
  }
}



    // Add your custom methods or overrides here
   
  

 


class Window_LanguageOptions extends Window_SubmenuOptions {
  makeCommandList() {
    super.makeCommandList();
    this.addCommand(pluginParams.englishLabel, 'english');
  }
}

class Window_ControlsOptions extends Window_SubmenuOptions {
  makeCommandList() {
    super.makeCommandList();
    this.addCommand(pluginParams.alwaysdashLabel, 'always dash');
  }
}

class Window_CustomOptions extends Window_SubmenuOptions {
  makeCommandList() {
    super.makeCommandList();
    this.addCommand(pluginParams.commandRememberLabel, 'command remember');
  }
}

//==============================================================================================================
// * SECTION 1.4 : Submenu scene classes
//   - all the submenu scene classes
//==============================================================================================================


// Specific Submenu Scene Classes
class Scene_AudioOptions extends Scene_SubmenuOptions {
  constructor() {
    super(Window_AudioOptions, {
      'bgmVolume': () => this.commandBGMVolume(),
      'bgsVolume': () => this.commandBGSVolume(),
      'meVolume':  () => this.commandMEVolume(),
      'seVolume':  () => this.commandSEVolume(),
      'back':      () => this.popScene(),
    });
  }
  
  commandBGMVolume() {
    console.log("BGM Volume selected");
  }

  commandBGSVolume() {
    console.log("BGS Volume selected");
  }

  commandMEVolume() {
    console.log("ME Volume selected");
  }

  commandSEVolume() {
    console.log("SE Volume selected");
  }
}

class Scene_LanguageOptions extends Scene_SubmenuOptions {
  constructor() {
    super(Window_LanguageOptions, {
      'english': () => this.commandEnglish(),
    });
  }

  commandEnglish() {
    console.log("English selected");
  }
}

class Scene_ControlsOptions extends Scene_SubmenuOptions {
  constructor() {
    super(Window_ControlsOptions, {
      'always dash': () => this.commandAlwaysDash(),
    });
  }

  commandAlwaysDash() {
    console.log("Always Dash selected");
  }
}

class Scene_CustomOptions extends Scene_SubmenuOptions {
  constructor() {
    super(Window_CustomOptions, {
      'command remember': () => this.commandRemember(),
    });
  }

  commandRemember() {
    console.log("Command Remember selected");
  }
}

const Scene_AudioOptionsInstance = new Scene_AudioOptions();
const Scene_LanguageOptionsInstance = new Scene_LanguageOptions();
const Scene_ControlsOptionsInstance = new Scene_ControlsOptions();
const Scene_CustomOptionsInstance = new Scene_CustomOptions();