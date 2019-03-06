import Skill from './skills';
enum Target {
    Enemy,
    Ally,
    Self
}

interface Command {
    target: Target;
    condition(target: Character): boolean;
    action(): void;
}

interface SkillDefinition {
    new (caster): Skill;
}

interface skillSet {
    skill1: SkillDefinition;
    skill2: SkillDefinition;
    skill3: SkillDefinition;
}

interface team {
    members: Array<Character>;
}

export default class Character {
    // Stats
    name: string;
    maxHP: number;
    baseDamage: number;
    speed: number;

    // Skills
    private skill1?: Skill;
    private skill2?: Skill;
    private skill3?: Skill;

    // Combat specific stats
    currentHP:number;
    targets: Array<Character> = [];
    strategy: Array<Command> = [
        {target: Target.Enemy, condition: (target) => (target.currentHP < target.maxHP / 2), action: this.activateSkill3},
        {target: Target.Ally, condition: (target) => (target.currentHP < target.maxHP / 2), action: this.activateSkill2},
        {target: Target.Enemy, condition: (target) => true, action: this.activateSkill1}
    ];

    constructor(name:string, maxHP:number, baseDamage:number, speed:number, skillSet:skillSet) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = maxHP
        this.baseDamage = baseDamage;
        this.speed = speed;
        this.setSkill1( skillSet.skill1);
        this.setSkill2( skillSet.skill2);
        this.setSkill3( skillSet.skill3);
    }

    decrementSkillCooldowns() {
        this.skill1.decrementCooldown();
        this.skill2.decrementCooldown();
        this.skill3.decrementCooldown();
    }

    activateSkill1() {
        if (this.skill1) {
            this.skill1.activate();
            this.decrementSkillCooldowns();
        } else console.log(`No skill assigned to ${this.name}'s SKILL1`);
    }

    activateSkill2() {
        if (this.skill2) {
            this.skill2.activate();
            this.decrementSkillCooldowns();
        } else console.log(`No skill assigned to ${this.name}'s SKILL2`);
    }

    activateSkill3() {
        if (this.skill3) {
            this.skill3.activate();
            this.decrementSkillCooldowns();
        } else console.log(`No skill assigned to ${this.name}'s SKILL3`);
    }

    setSkill1(skill:SkillDefinition) {
        this.skill1 = new skill(this); 
    }

    setSkill2(skill:SkillDefinition) {
        this.skill2 = new skill(this);
    }

    setSkill3(skill:SkillDefinition) {
        this.skill3 = new skill(this);
    }

    print(){
        console.log(`${this.name} | HP: ${this.currentHP} Base damage: ${this.baseDamage} Speed: ${this.speed}`);
    }

    printDetails() {
        const skill1Name = (this.skill1) ? this.skill1.name : 'No skill assigned'; 
        const skill2Name = (this.skill2) ? this.skill2.name : 'No skill assigned';
        const skill3Name = (this.skill3) ? this.skill3.name : 'No skill assigned';

        console.log(`${this.name} | maxHP: ${this.maxHP} Base damage: ${this.baseDamage} Speed: ${this.speed}`);
        console.log(`   Skill1: ${skill1Name}`)
        console.log(`   Skill2: ${skill2Name}`)
        console.log(`   Skill3: ${skill3Name}`)
    }
}

export {SkillDefinition, skillSet, team, Target};