"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Character_1 = require("./Character");
var skills = require("./skills");
var FightController_1 = require("./FightController");
var skillSet1 = {
    skill1: skills.Kick,
    skill2: skills.Heal,
    skill3: skills.DeathKick
};
var bob = new Character_1.default('Bob', 40, 15, 100, skillSet1);
var lars = new Character_1.default('Lars', 50, 12, 90, skillSet1);
var bjarke = new Character_1.default('Bjarke', 55, 12, 95, skillSet1);
var fred = new Character_1.default('Fred', 70, 15, 100, skillSet1);
var morten = new Character_1.default('Morten', 35, 16, 80, skillSet1);
var ib = new Character_1.default('Ib', 55, 12, 85, skillSet1);
var team1 = { members: [bob, lars, bjarke] };
var team2 = { members: [fred, morten, ib] };
var fight1 = new FightController_1.Fight(team1, team2);
fight1.printFightOrder();
fight1.fight();
fight1.printFightOrder();
