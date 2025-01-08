// == Plugin Parameters ==
var parameters = PluginManager.parameters('CustomMenuStyle');

// == Common Customization Logic ==
function applyCustomMenuStyle(window, textColor, fontSize, x, y) {
    window.changeTextColor(textColor);
    window.contents.fontSize = fontSize;
    window.x = x;
    window.y = y;
}

// == Custom Menu Style Plugin ==
(function() {
    // Get parameters
    var textColor = String(parameters['Text Color'] || '#ffffff');
    var fontSize = parseInt(parameters['Font Size'] || 24);
    var menuX = parseInt(parameters['Menu X'] || 100);
    var menuY = parseInt(parameters['Menu Y'] || 100);

    // Override Scene_MenuBase
    var _Scene_MenuBase_create = Scene_MenuBase.prototype.create;
    Scene_MenuBase.prototype.create = function() {
        _Scene_MenuBase_create.call(this);
        this.createCustomMenuStyle();
    };

    Scene_MenuBase.prototype.createCustomMenuStyle = function() {
        // Reuse the common logic
        applyCustomMenuStyle(this._commandWindow, textColor, fontSize, menuX, menuY);
    };

    Scene_OptionsMenu.prototype.createCustomMenuStyle = function() {
        // ...

        // Reuse the common logic
        applyCustomMenuStyle(this._commandWindow, textColor, fontSize, menuX, menuY);

        // ...
    };
})();

