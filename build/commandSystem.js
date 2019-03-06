"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Target;
(function (Target) {
    Target[Target["Enemy"] = 0] = "Enemy";
    Target[Target["Ally"] = 1] = "Ally";
    Target[Target["Self"] = 2] = "Self";
})(Target || (Target = {}));
exports.Target = Target;
