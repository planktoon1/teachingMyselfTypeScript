"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharInterfaces = require("./Character");
var Fight = /** @class */ (function () {
    function Fight(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
        this.setFightOrder();
    }
    Fight.prototype.setFightOrder = function () {
        var team1Wrapped = this.team1.members.map(function (m) { return ({ character: m, isInTeam1: true }); });
        var team2Wrapped = this.team2.members.map(function (m) { return ({ character: m, isInTeam1: false }); });
        this.fightOrder = team1Wrapped.concat(team2Wrapped).sort(function (a, b) { return b.character.speed - a.character.speed; });
    };
    Fight.prototype.printFightOrder = function () {
        this.fightOrder.forEach(function (e) { return e.character.print(); });
    };
    Fight.prototype.finished = function () {
        if (this.fightOrder.length <= 0)
            return true;
        if (this.team1.members.length <= 0) {
            console.log("Team 2 vandt, alle p\u00E5 team 1 er d\u00F8de");
            return true;
        }
        if (this.team2.members.length <= 0) {
            console.log("Team 1 vandt, alle p\u00E5 team 2 er d\u00F8de");
            return true;
        }
        return false;
    };
    Fight.prototype.fight = function () {
        while (!this.finished()) {
            this.performTurn();
        }
    };
    Fight.prototype.performTurn = function () {
        var currentChar = this.fightOrder[0].character;
        var allies = this.fightOrder[0].isInTeam1 ? this.team1 : this.team2;
        var enemies = this.fightOrder[0].isInTeam1 ? this.team2 : this.team1;
        var _loop_1 = function (command) {
            var target = command.target, condition = command.condition, action = command.action;
            var realTarget = null; // target = self
            if (target == CharInterfaces.Target.Self) {
                if (condition(currentChar)) {
                    realTarget = currentChar;
                }
            }
            else if (target == CharInterfaces.Target.Enemy) {
                var possibleTargets = enemies.members.filter(function (m) { return condition(m); });
                if (possibleTargets.length > 0) {
                    realTarget = possibleTargets[0];
                }
            }
            else if (target == CharInterfaces.Target.Ally) {
                var possibleTargets = allies.members.filter(function (m) { return condition(m); });
                if (possibleTargets.length > 0) {
                    realTarget = possibleTargets[0];
                }
            }
            if (realTarget) {
                var boundAction = action.bind(currentChar);
                currentChar.targets = [realTarget];
                boundAction();
                if (realTarget.currentHP <= 0) {
                    console.log(realTarget.name + " died!");
                    this_1.team1.members = this_1.team1.members.filter(function (char) { return (char != realTarget); });
                    this_1.team2.members = this_1.team2.members.filter(function (char) { return (char != realTarget); });
                    this_1.setFightOrder();
                }
                this_1.fightOrder.push(this_1.fightOrder.shift());
                return "break";
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = currentChar.strategy; _i < _a.length; _i++) {
            var command = _a[_i];
            var state_1 = _loop_1(command);
            if (state_1 === "break")
                break;
        }
    };
    return Fight;
}());
exports.Fight = Fight;
