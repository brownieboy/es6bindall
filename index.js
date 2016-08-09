(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.es6bindall = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function es6BindAll(context, methodNames) {
        methodNames.map(function (methodName) {
            context[methodName] = context[methodName].bind(context);
        });
    }

    exports.default = es6BindAll;
});
