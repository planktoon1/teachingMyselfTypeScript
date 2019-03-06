import Character from './Character';

export default abstract class Skill {
    caster:Character;
    name: string;
    cooldown: number;
    currentCooldown: number = 0;
    description: string = '';
    constructor(caster:Character, name:string, cooldown:number, description?:string) {
        this.caster = caster;
        this.name = name;
        this.cooldown = cooldown;
        if (description) this.description = description;
    }

    isReady():boolean {
        return (this.currentCooldown === 0) 
    }
    decrementCooldown(): void {
        if (this.currentCooldown > 0) {
            this.currentCooldown --;
        }
    }

    abstract activate(): void;
}

class Heal extends Skill {
    constructor(caster:Character){
        super(caster, 'Heal', 1);
    }
    activate() {
        const caster = this.caster;
        const target = caster.targets[0];
        target.currentHP += caster.baseDamage;
        console.log(`${caster.name} used ${this.name} on ${target.name} for ${caster.baseDamage}`);
    }
}

class DeathKick extends Skill {
    constructor(caster:Character){
        super(caster, 'Death Kick', 2);
    }
    activate() {
        const caster = this.caster;
        const target = caster.targets[0];
        target.currentHP -= caster.baseDamage * 2;
        console.log(`${caster.name} used ${this.name} on ${target.name}`);
    }
}

class Kick extends Skill {
    constructor(caster:Character){
        super(caster, 'Kick', 0);
    }
    activate() {
        const caster = this.caster;
        const target = caster.targets[0];
        target.currentHP -= caster.baseDamage;
        console.log(`${caster.name} used ${this.name} on ${target.name}`);
    }
}

export {Kick, Heal, DeathKick}