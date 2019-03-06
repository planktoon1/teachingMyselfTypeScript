"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Skill = /** @class */ (function () {
    function Skill(caster, name, cooldown, description) {
        this.currentCooldown = 0;
        this.description = '';
        this.caster = caster;
        this.name = name;
        this.cooldown = cooldown;
        if (description)
            this.description = description;
    }
    Skill.prototype.isReady = function () {
        return (this.currentCooldown === 0);
    };
    Skill.prototype.decrementCooldown = function () {
        if (this.currentCooldown > 0) {
            this.currentCooldown--;
        }
    };
    return Skill;
}());
exports.default = Skill;
var Heal = /** @class */ (function (_super) {
    __extends(Heal, _super);
    function Heal(caster) {
        return _super.call(this, caster, 'Heal', 1) || this;
    }
    Heal.prototype.activate = function () {
        var caster = this.caster;
        var target = caster.targets[0];
        target.currentHP += caster.baseDamage;
        console.log(caster.name + " used " + this.name + " on " + target.name + " for " + caster.baseDamage);
    };
    return Heal;
}(Skill));
exports.Heal = Heal;
var DeathKick = /** @class */ (function (_super) {
    __extends(DeathKick, _super);
    function DeathKick(caster) {
        return _super.call(this, caster, 'Death Kick', 2) || this;
    }
    DeathKick.prototype.activate = function () {
        var caster = this.caster;
        var target = caster.targets[0];
        target.currentHP -= caster.baseDamage * 2;
        console.log(caster.name + " used " + this.name + " on " + target.name);
    };
    return DeathKick;
}(Skill));
exports.DeathKick = DeathKick;
var Kick = /** @class */ (function (_super) {
    __extends(Kick, _super);
    function Kick(caster) {
        return _super.call(this, caster, 'Kick', 0) || this;
    }
    Kick.prototype.activate = function () {
        var caster = this.caster;
        var target = caster.targets[0];
        target.currentHP -= caster.baseDamage;
        console.log(caster.name + " used " + this.name + " on " + target.name);
    };
    return Kick;
}(Skill));
exports.Kick = Kick;
