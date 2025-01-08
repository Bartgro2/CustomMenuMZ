// Custom title command window
var customMenuTextColor = '#0000FF';
var customMenuFontSize = 30;
var customMenuX = 300;
var customMenuY = 300;

class Window_CustomTitleCommand extends Window_TitleCommand {
  // Title-specific logic and appearance
  resetTextColor() {
    Window_Base.prototype.resetTextColor.call(this);
    this.changeTextColor(customMenuTextColor);
  }

  standardFontSize() {
    return customMenuFontSize;
  }

  changeTextColorByIndex(index) {
    this.changeTextColor(this.textColor(index));
  }

  makeCommandList() {
    this.addCommand('New Game', 'newGame');
    this.addCommand('Continue', 'continue');
    this.addCommand('Options', 'options');
    this.addCommand('Exit', 'exit');
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

    this._commandWindow.x = customMenuX;
    this._commandWindow.y = customMenuY;

    this._commandWindow.changeTextColorByIndex(17);
  },

  commandOptions: function () {
    SceneManager.push(Scene_OptionsMenu);
  }
});

class Window_OptionsCommand extends Window_Command {
  makeCommandList() {
    this.addCommand('Audio', 'audio');
    this.addCommand('Language', 'language');
    this.addCommand('Controls', 'controls');
    this.addCommand('Custom', 'custom');
  }
}

class Scene_OptionsMenu extends Scene_MenuBase {
  create() {
    super.create();
    this.createOptionsCommandWindow();
    this._commandWindow.activate();
    this._commandWindow.show();
  }

  start() {
    super.start();
    this._commandWindow.refresh();
  }

  createOptionsCommandWindow() {
    this._commandWindow = new Window_OptionsCommand();
    this._commandWindow.setHandler('audio', () => this.commandAudio());
    this._commandWindow.setHandler('language', () => this.commandLanguage());
    this._commandWindow.setHandler('controls', () => this.commandControls());
    this._commandWindow.setHandler('custom', () => this.commandCustom());
    this._commandWindow.setHandler('back', () => this.popScene());
    this.addWindow(this._commandWindow);
  }

  commandAudio() {
    console.log("Audio Sub-Menu Selected");
    SceneManager.push(scene_AudioOptions);
    this._commandWindow.hide();
  }

  commandLanguage() {
    console.log("Language Sub-Menu Selected");
    SceneManager.push(Scene_LanguageOptions);
    this._commandWindow.hide();
  }

  commandControls() {
    console.log("Controls Sub-Menu Selected");
    SceneManager.push(Scene_ControlsOptions);
    this._commandWindow.hide();
  }

  commandCustom() {
    console.log("Custom Sub-Menu Selected");
    SceneManager.push(Scene_CustomOptions);
    this._commandWindow.hide();
  }
}


class Window_AudioOptions extends Window_Command {
  makeCommandList() {
    this.addCommand('BGM Volume', 'bgmVolume');
    this.addCommand('BGS Volume', 'bgsVolume');
    this.addCommand('ME Volume', 'meVolume');
    this.addCommand('SE Volume', 'seVolume');
    this.addCommand('Back', 'back');
  }
}

class scene_AudioOptions extends Scene_MenuBase {
  create() {
    super.create();
    this.createAudioOptionsWindow();
}

  createAudioOptionsWindow() {
      this._audioOptionsWindow = new Window_AudioOptions();
      this._audioOptionsWindow.setHandler('bgmVolume',() => this.commandBGMVolume());
      this._audioOptionsWindow.setHandler('bgsVolume',() => this.commandBGSVolume());
      this._audioOptionsWindow.setHandler('meVolume', () => this.commandMEVolume());
      this._audioOptionsWindow.setHandler('seVolume', () => this.commandSEVolume());
      this._audioOptionsWindow.setHandler('back', () => this.popScene());
      this.addWindow(this._audioOptionsWindow);
  }
   commandBGMVolume() {
    console.log("BGM Volume Selected");
  }

  commandBGSVolume() {
    console.log("BGS Volume Selected");
  }

  commandMEVolume() {
    console.log("ME Volume Selected");
  }

  commandSEVolume() {
    console.log("SE Volume Selected");
  }
}

class Window_LanguageOptions extends Window_Command {
  makeCommandList() {
  this.addCommand('English', 'english');
  this.addCommand('Back', 'back');
  }
}

class Scene_LanguageOptions extends Scene_MenuBase  {
  create() {
    super.create();
    this.createLanguageOptionsWindow();
  }

  createLanguageOptionsWindow() {
  this._languageOptionsWindows = new Window_LanguageOptions();
  this._languageOptionsWindows.setHandler('English', () => this.commandEnglish());
  this._languageOptionsWindows.setHandler('back', () => this.popScene());
  this.addWindow(this._languageOptionsWindows);
  }
  commandEnglish() {
  // Add logic for handling the "English" option
  console.log("English selected");
  }
}

class Window_ControlsOptions extends Window_Command {
  makeCommandList() {
      this.addCommand('Always Dash', 'always dash');
      this.addCommand('Back', 'back');
  }
}

class Scene_ControlsOptions extends Scene_MenuBase {
  create() {
    super.create();
    this.createControlsOptionsWindow();
  }

  createControlsOptionsWindow() {
      this._controlsOptionsWindow = new Window_ControlsOptions();
      this._controlsOptionsWindow.setHandler('always dash', () => this.commandAlwaysDash());
      this._controlsOptionsWindow.setHandler('back', () => this.popScene());
      this.addWindow(this._controlsOptionsWindow);
  }

  commandAlwaysDash() {
      // Add logic for handling the "Always Dash" option
      console.log("Always Dash selected");
  }
}

// custom 
class Window_CustomOptions extends Window_Command {
  makeCommandList() {
  this.addCommand('Command Remember', 'command remember');
  this.addCommand('Back', 'back');
  } 
} 

class Scene_CustomOptions extends Scene_MenuBase{
  create() {
    super.create();
    this.createCustomOptionsWindow();
  }

  createCustomOptionsWindow() {
  this._customOptionsWindow = new Window_CustomOptions();
  this._customOptionsWindow.setHandler('commmandRemember', () => this.commandRemember());
  this._customOptionsWindow.setHandler('back', () => this.popScene());
  this.addWindow(this._customOptionsWindow);  
  }

  commandRemember() {
  // Add logic for handling the "command Remember" option
  console.log("Command Remember selected");
  }
}
