"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Target;
(function (Target) {
    Target[Target["Enemy"] = 0] = "Enemy";
    Target[Target["Ally"] = 1] = "Ally";
    Target[Target["Self"] = 2] = "Self";
})(Target || (Target = {}));
exports.Target = Target;
var Character = /** @class */ (function () {
    function Character(name, maxHP, baseDamage, speed, skillSet) {
        this.targets = [];
        this.strategy = [
            { target: Target.Enemy, condition: function (target) { return (target.currentHP < target.maxHP / 2); }, action: this.activateSkill3 },
            { target: Target.Ally, condition: function (target) { return (target.currentHP < target.maxHP / 2); }, action: this.activateSkill2 },
            { target: Target.Enemy, condition: function (target) { return true; }, action: this.activateSkill1 }
        ];
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = maxHP;
        this.baseDamage = baseDamage;
        this.speed = speed;
        this.setSkill1(skillSet.skill1);
        this.setSkill2(skillSet.skill2);
        this.setSkill3(skillSet.skill3);
    }
    Character.prototype.decrementSkillCooldowns = function () {
        this.skill1.decrementCooldown();
        this.skill2.decrementCooldown();
        this.skill3.decrementCooldown();
    };
    Character.prototype.activateSkill1 = function () {
        if (this.skill1) {
            this.skill1.activate();
            this.decrementSkillCooldowns();
        }
        else
            console.log("No skill assigned to " + this.name + "'s SKILL1");
    };
    Character.prototype.activateSkill2 = function () {
        if (this.skill2) {
            this.skill2.activate();
            this.decrementSkillCooldowns();
        }
        else
            console.log("No skill assigned to " + this.name + "'s SKILL2");
    };
    Character.prototype.activateSkill3 = function () {
        if (this.skill3) {
            this.skill3.activate();
            this.decrementSkillCooldowns();
        }
        else
            console.log("No skill assigned to " + this.name + "'s SKILL3");
    };
    Character.prototype.setSkill1 = function (skill) {
        this.skill1 = new skill(this);
    };
    Character.prototype.setSkill2 = function (skill) {
        this.skill2 = new skill(this);
    };
    Character.prototype.setSkill3 = function (skill) {
        this.skill3 = new skill(this);
    };
    Character.prototype.print = function () {
        console.log(this.name + " | HP: " + this.currentHP + " Base damage: " + this.baseDamage + " Speed: " + this.speed);
    };
    Character.prototype.printDetails = function () {
        var skill1Name = (this.skill1) ? this.skill1.name : 'No skill assigned';
        var skill2Name = (this.skill2) ? this.skill2.name : 'No skill assigned';
        var skill3Name = (this.skill3) ? this.skill3.name : 'No skill assigned';
        console.log(this.name + " | maxHP: " + this.maxHP + " Base damage: " + this.baseDamage + " Speed: " + this.speed);
        console.log("   Skill1: " + skill1Name);
        console.log("   Skill2: " + skill2Name);
        console.log("   Skill3: " + skill3Name);
    };
    return Character;
}());
exports.default = Character;
