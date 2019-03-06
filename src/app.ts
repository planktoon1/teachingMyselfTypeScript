import Character, * as CharInterfaces from './Character';
import * as skills from './skills';
import {Fight} from './FightController';

const skillSet1:CharInterfaces.skillSet = { 
    skill1: skills.Kick, 
    skill2: skills.Heal, 
    skill3: skills.DeathKick
}

const bob = new Character('Bob', 40, 15, 100, skillSet1);
const lars = new Character('Lars', 50, 12, 90, skillSet1);
const bjarke = new Character('Bjarke',55, 12, 95, skillSet1);

const fred = new Character('Fred', 70, 15, 100, skillSet1);
const morten = new Character('Morten', 35, 16, 80, skillSet1);
const ib = new Character('Ib', 55, 12, 85, skillSet1);

const team1: CharInterfaces.team = {members: [bob, lars, bjarke]};
const team2: CharInterfaces.team = {members: [fred, morten, ib]};

const fight1:Fight = new Fight(team1, team2);
fight1.printFightOrder();
fight1.fight();
fight1.printFightOrder();