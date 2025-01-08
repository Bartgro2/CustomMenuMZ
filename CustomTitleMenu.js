// == Custom Menu Style ==
var customMenuTextColor = '#0000FF';
var customMenuFontSize = 30;
var customMenuX = 300; 
var customMenuY = 300; 
// styling doesn't get applied in the submenu's

// Custom window class for the title command
// Window_CustomTitleCommand
function Window_CustomTitleCommand() {
    this.initialize.apply(this, arguments);
}

Window_CustomTitleCommand.prototype = Object.create(Window_TitleCommand.prototype);
Window_CustomTitleCommand.prototype.constructor = Window_CustomTitleCommand;

// Override the standard resetTextColor method
Window_CustomTitleCommand.prototype.resetTextColor = function() {
    Window_Base.prototype.resetTextColor.call(this);
    this.changeTextColor(customMenuTextColor);
};

// Override the standard fontSize method
Window_CustomTitleCommand.prototype.standardFontSize = function() {
    return customMenuFontSize;
};

// Custom method to change text color by index
Window_CustomTitleCommand.prototype.changeTextColorByIndex = function(index) {
    this.changeTextColor(this.textColor(index));
};

Window_CustomTitleCommand.prototype.makeCommandList = function() {
    this.addCommand('New Game', 'newGame');
    this.addCommand('Continue', 'continue');
    this.addCommand('Options', 'options');
    this.addCommand('Exit', 'exit');
};

Window_CustomTitleCommand.prototype.processOk = function() {
    if (this.isHandled(this.currentSymbol())) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        if (this.currentSymbol() === 'options') {
            SceneManager.push(Scene_OptionsMenu);
            this.hide();
        } else {
            this.callOkHandler();
        }
    }
};

Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_CustomTitleCommand();
    this.addWindow(this._commandWindow);

    // Use arrow functions to set the correct 'this' context
    this._commandWindow.setHandler('newGame', () => this.commandNewGame());
    this._commandWindow.setHandler('continue', () => this.commandContinue());
    this._commandWindow.setHandler('options', () => this.commandOptions());
    this._commandWindow.setHandler('exit', () => this.commandExit()); // the exit function isn't there

    // Set the position of the title command window manually
    this._commandWindow.x = customMenuX;
    this._commandWindow.y = customMenuY;

    // Example of changing text color to crisis color (index 17)
    this._commandWindow.changeTextColorByIndex(17);
};

Scene_Title.prototype.commandOptions = function() {
    // Add logic to handle the "Options" command and show sub-menus
    SceneManager.push(Scene_OptionsMenu);
};

// Custom window class for the options command
function Window_OptionsCommand() {
    this.initialize.apply(this, arguments);
}

Window_OptionsCommand.prototype = Object.create(Window_Command.prototype);
Window_OptionsCommand.prototype.constructor = Window_OptionsCommand;

Window_OptionsCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_OptionsCommand.prototype.windowClass = function() {
    return 'options-menu'; // Add your custom class here
};


Window_OptionsCommand.prototype.makeCommandList = function() {
    // Modify this section to include only the desired options
    this.addCommand('Audio', 'audio');
    this.addCommand('Language', 'language');
    this.addCommand('Controls', 'controls');
    this.addCommand('Custom', 'custom');
    this.addCommand('Back', 'back');
};

Window_OptionsCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_OptionsCommand.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

// Add a new scene for Options sub-menus
function Scene_OptionsMenu() {
    this.initialize.apply(this, arguments);
}

Scene_OptionsMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_OptionsMenu.prototype.constructor = Scene_OptionsMenu;

Scene_OptionsMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createOptionsCommandWindow();
    this._commandWindow.activate();
    this._commandWindow.show();
};

Scene_OptionsMenu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._commandWindow.refresh();
};

Scene_OptionsMenu.prototype.createOptionsCommandWindow = function() {
    this._commandWindow = new Window_OptionsCommand();
    this._commandWindow.setHandler('audio', this.commandAudio.bind(this));
    this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    this._commandWindow.setHandler('controls', this.commandControls.bind(this));
    this._commandWindow.setHandler('custom', this.commandCustom.bind(this));
    this._commandWindow.setHandler('back', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_OptionsMenu.prototype.commandAudio = function() {
    // Add logic for handling the "audio" sub-menu
    console.log("Audio Sub-Menu Selected");
    // You can add more logic here to display audio options
    SceneManager.push(Scene_AudioOptions);
    this._commandWindow.hide(); // Hide the main window when entering the sub-menu
};


Scene_OptionsMenu.prototype.commandLanguage = function() {
    // Add logic for handling the "language" sub-menu
    console.log("Language Sub-Menu Selected");
    // You can add more logic here to display language options
    SceneManager.push(Scene_LanguageOptions);
    this._commandWindow.hide();
};

Scene_OptionsMenu.prototype.commandControls = function() {
    // Add logic for handling the "controls" sub-menu
    console.log("Controls Sub-Menu Selected");
    // You can add more logic here to display controls options
    SceneManager.push(Scene_ControlsOptions);
    this._commandWindow.hide();
};

Scene_OptionsMenu.prototype.commandCustom = function() {
    // Add logic for handling the "custom" sub-menu
    console.log("Custom Sub-Menu Selected");
    // You can add more logic here to display custom options
    SceneManager.push(Scene_CustomOptions);
    this._commandWindow.hide();
};

Window_OptionsCommand.prototype.makeCommandList = function() {
    // Modify this section to include only the desired options
    this.addCommand('Audio', 'audio');
    this.addCommand('Language', 'language');
    this.addCommand('Controls', 'controls');
    this.addCommand('Custom', 'custom');
    this.addCommand('Back', 'back');
};

Window_OptionsCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_OptionsCommand.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

// Custom window class for the options command
function Window_OptionsCommand() {
    this.initialize.apply(this, arguments);
}

Window_OptionsCommand.prototype = Object.create(Window_Command.prototype);
Window_OptionsCommand.prototype.constructor = Window_OptionsCommand;

Window_OptionsCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_OptionsCommand.prototype.windowClass = function() {
    return 'options-menu'; // Add your custom class here
};


Window_OptionsCommand.prototype.makeCommandList = function() {
    // Modify this section to include only the desired options
    this.addCommand('Audio', 'audio');
    this.addCommand('Language', 'language');
    this.addCommand('Controls', 'controls');
    this.addCommand('Custom', 'custom');
    this.addCommand('Back', 'back');
};

Window_OptionsCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_OptionsCommand.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

// Add a new scene for Options sub-menus
function Scene_OptionsMenu() {
    this.initialize.apply(this, arguments);
}

Scene_OptionsMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_OptionsMenu.prototype.constructor = Scene_OptionsMenu;

Scene_OptionsMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createOptionsCommandWindow();
    this._commandWindow.activate();
    this._commandWindow.show();
};

Scene_OptionsMenu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._commandWindow.refresh();
};

Scene_OptionsMenu.prototype.createOptionsCommandWindow = function() {
    this._commandWindow = new Window_OptionsCommand();
    this._commandWindow.setHandler('audio', this.commandAudio.bind(this));
    this._commandWindow.setHandler('language', this.commandLanguage.bind(this));
    this._commandWindow.setHandler('controls', this.commandControls.bind(this));
    this._commandWindow.setHandler('custom', this.commandCustom.bind(this));
    this._commandWindow.setHandler('back', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_OptionsMenu.prototype.commandAudio = function() {
    // Add logic for handling the "audio" sub-menu
    console.log("Audio Sub-Menu Selected");
    // You can add more logic here to display audio options
    SceneManager.push(Scene_AudioOptions);
    this._commandWindow.hide(); // Hide the main window when entering the sub-menu
};


Scene_OptionsMenu.prototype.commandLanguage = function() {
    // Add logic for handling the "language" sub-menu
    console.log("Language Sub-Menu Selected");
    // You can add more logic here to display language options
    SceneManager.push(Scene_LanguageOptions);
    this._commandWindow.hide();
};

Scene_OptionsMenu.prototype.commandControls = function() {
    // Add logic for handling the "controls" sub-menu
    console.log("Controls Sub-Menu Selected");
    // You can add more logic here to display controls options
    SceneManager.push(Scene_ControlsOptions);
    this._commandWindow.hide();
};

Scene_OptionsMenu.prototype.commandCustom = function() {
    // Add logic for handling the "custom" sub-menu
    console.log("Custom Sub-Menu Selected");
    // You can add more logic here to display custom options
    SceneManager.push(Scene_CustomOptions);
    this._commandWindow.hide();
};

Window_OptionsCommand.prototype.makeCommandList = function() {
    // Modify this section to include only the desired options
    this.addCommand('Audio', 'audio');
    this.addCommand('Language', 'language');
    this.addCommand('Controls', 'controls');
    this.addCommand('Custom', 'custom');
    this.addCommand('Back', 'back');
};

Window_OptionsCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_OptionsCommand.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

// Custom window class for the audio options
function Window_AudioOptions() {
    this.initialize.apply(this, arguments);
}

Window_AudioOptions.prototype = Object.create(Window_Command.prototype);
Window_AudioOptions.prototype.constructor = Window_AudioOptions;

Window_AudioOptions.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_AudioOptions.prototype.makeCommandList = function() {
    this.addCommand('BGM Volume', 'bgmVolume');
    this.addCommand('BGS Volume', 'bgsVolume');
    this.addCommand('ME Volume', 'meVolume');
    this.addCommand('SE Volume', 'seVolume');
    this.addCommand('Back', 'back');
};

Window_AudioOptions.prototype.windowClass = function() {
    return 'audio-options-menu'; // Add your custom class here
};


Window_AudioOptions.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_AudioOptions.prototype.itemTextAlign = function() {
    return 'center';
};

Window_AudioOptions.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

// Custom window class for the options command
function Window_OptionsCommand() {
    this.initialize.apply(this, arguments);
}

Window_OptionsCommand.prototype = Object.create(Window_Command.prototype);
Window_OptionsCommand.prototype.constructor = Window_OptionsCommand;

Window_OptionsCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_OptionsCommand.prototype.makeCommandList = function() {
    // Modify this section to include only the desired options
    this.addCommand('Audio', 'audio');
    this.addCommand('Language', 'language');
    this.addCommand('Controls', 'controls');
    this.addCommand('Custom', 'custom');
    this.addCommand('Back', 'back');
};

Window_OptionsCommand.prototype.itemTextAlign = function() {
    return 'center';
};

Window_OptionsCommand.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};



// Add a new scene for Audio Options sub-menu
function Scene_AudioOptions() {
    this.initialize.apply(this, arguments);
}

Scene_AudioOptions.prototype = Object.create(Scene_MenuBase.prototype);
Scene_AudioOptions.prototype.constructor = Scene_AudioOptions;

Scene_AudioOptions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAudioOptionsWindow();
};

Scene_AudioOptions.prototype.createAudioOptionsWindow = function() {
    this._audioOptionsWindow = new Window_AudioOptions();
    this._audioOptionsWindow.setHandler('bgmVolume', this.commandBGMVolume.bind(this));
    this._audioOptionsWindow.setHandler('bgsVolume', this.commandBGSVolume.bind(this));
    this._audioOptionsWindow.setHandler('meVolume', this.commandMEVolume.bind(this));
    this._audioOptionsWindow.setHandler('seVolume', this.commandSEVolume.bind(this));
    this._audioOptionsWindow.setHandler('back', this.popScene.bind(this));
    this.addWindow(this._audioOptionsWindow);
};

Scene_AudioOptions.prototype.commandBGMVolume = function() {
    // Add logic for handling the "BGM Volume" option
    console.log("BGM Volume Selected");
};

Scene_AudioOptions.prototype.commandBGSVolume = function() {
    // Add logic for handling the "BGS Volume" option
    console.log("BGS Volume Selected");
};

Scene_AudioOptions.prototype.commandMEVolume = function() {
    // Add logic for handling the "ME Volume" option
    console.log("ME Volume Selected");
};

Scene_AudioOptions.prototype.commandSEVolume = function() {
    // Add logic for handling the "SE Volume" option
    console.log("SE Volume Selected");
};

function Window_LanguageOptions() {
    this.initialize.apply(this, arguments);
}

Window_LanguageOptions.prototype = Object.create(Window_Command.prototype);
Window_LanguageOptions.prototype.constructor = Window_LanguageOptions;

Window_LanguageOptions.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_LanguageOptions.prototype.windowClass = function() {
    return 'language-options-menu'; // Add your custom class here
};

Window_LanguageOptions.prototype.makeCommandList = function() {
    // Add language commands here
    this.addCommand('English', 'english');
    // Add other language commands as needed
    this.addCommand('Back', 'back');
};

Window_LanguageOptions.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_LanguageOptions.prototype.itemTextAlign = function() {
    return 'center';
};

Window_LanguageOptions.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

function Scene_LanguageOptions() {
    this.initialize.apply(this, arguments);
}

Scene_LanguageOptions.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LanguageOptions.prototype.constructor = Scene_LanguageOptions;

Scene_LanguageOptions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    // Add code to create and set up sub-menus for "BGM Volume," "BGS Volume," etc.
    this.createLanguageOptionsWindow();
};

Scene_LanguageOptions.prototype.createLanguageOptionsWindow = function() {
    this._LanguageOptionsWindows = new Window_LanguageOptions();
    this._LanguageOptionsWindows.setHandler('English', this.commandEnglish.bind(this));
    this._LanguageOptionsWindows.setHandler('back', this.popScene.bind(this));
    this.addWindow(this._LanguageOptionsWindows);
};

Scene_LanguageOptions.prototype.commandEnglish = function() {
    // Add logic for handling the "English" option
    console.log("English selected");
};

// controls

function Window_ControlsOptions() {
    this.initialize.apply(this, arguments);
}

Window_ControlsOptions.prototype = Object.create(Window_Command.prototype);
Window_ControlsOptions.prototype.constructor = Window_ControlsOptions;

Window_ControlsOptions.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_ControlsOptions.prototype.windowClass = function() {
    return 'controls-options-menu'; // Add your custom class here
};

Window_ControlsOptions.prototype.makeCommandList = function() {
    // Add language commands here
    this.addCommand('Always Dash', 'always dash');
    // Add other language commands as needed
    this.addCommand('Back', 'back');
};

Window_ControlsOptions.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_ControlsOptions.prototype.itemTextAlign = function() {
    return 'center';
};

Window_ControlsOptions.prototype.selectLast = function() {
    // Add your logic for selecting the last option here
};

function Scene_ControlsOptions() {
    this.initialize.apply(this, arguments);
}

Scene_ControlsOptions.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ControlsOptions.prototype.constructor = Scene_ControlsOptions;

Scene_ControlsOptions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    // Add code to create and set up sub-menus for "BGM Volume," "BGS Volume," etc.
    this.createControlsOptionsWindow();
};

Scene_ControlsOptions.prototype.createControlsOptionsWindow = function() {
    this._ControlsOptionsWindows = new Window_ControlsOptions();
    this._ControlsOptionsWindows.setHandler('always dash', this.commandAlways_Dash.bind(this));
    this._ControlsOptionsWindows.setHandler('back', this.popScene.bind(this));
    this.addWindow(this._ControlsOptionsWindows);  // Fix the variable name here
};

Window_CustomOptions.prototype.windowClass = function() {
    return 'custom-options-menu'; // Add your custom class here
};


Scene_ControlsOptions.prototype.commandAlways_Dash = function() {
    // Add logic for handling the "English" option
    console.log("Always Dash selected");
};


// custom 
function Window_CustomOptions() {
    this.initialize.apply(this, arguments);
}

Window_CustomOptions.prototype = Object.create(Window_Command.prototype);
Window_CustomOptions.prototype.constructor = Window_CustomOptions;

Window_CustomOptions.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.selectLast();
};

Window_CustomOptions.prototype.makeCommandList = function() {
    this.addCommand('Command Remember', 'command remember');
    this.addCommand('Back', 'back');
};

Window_CustomOptions.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

Window_CustomOptions.prototype.itemTextAlign = function() {
    return 'center';
};

Window_CustomOptions.prototype.selectLast = function() {
};

function Scene_CustomOptions() {
    this.initialize.apply(this, arguments);
}

Scene_CustomOptions.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CustomOptions.prototype.constructor = Scene_CustomOptions;

Scene_CustomOptions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCustomOptionsWindow();
};

Scene_CustomOptions.prototype.createCustomOptionsWindow = function() {
    this._CustomOptionsWindow = new Window_CustomOptions();
    this._CustomOptionsWindow.setHandler('commmandRemember', this.commandCommand_Remember.bind(this));
    this._CustomOptionsWindow.setHandler('back', this.popScene.bind(this));
    this.addWindow(this._CustomOptionsWindow);  
};

Scene_CustomOptions.prototype.commandCommand_Remember = function() {
    // Add logic for handling the "command Remember" option
    console.log("Command Remember selected");
};
