import Character, * as CharInterfaces from './Character';

interface CharWrapper {
    character: Character;
    isInTeam1: boolean;
}

class Fight {
    fightOrder: Array<CharWrapper>;
    team1: CharInterfaces.team;   
    team2: CharInterfaces.team;

    constructor(team1: CharInterfaces.team, team2: CharInterfaces.team){
        this.team1 = team1;
        this.team2 = team2;
        this.setFightOrder();
    }

    setFightOrder() {
        const team1Wrapped = this.team1.members.map((m) => ({character: m, isInTeam1: true}))
        const team2Wrapped = this.team2.members.map((m) => ({character: m, isInTeam1: false}))
        this.fightOrder = team1Wrapped.concat(team2Wrapped).sort((a ,b) => b.character.speed - a.character.speed);
    }

    printFightOrder() {
        this.fightOrder.forEach( (e) => e.character.print())
    }
    
    finished(): boolean {
        if (this.fightOrder.length <= 0) return true;

        if (this.team1.members.length <= 0) {
            console.log(`Team 2 vandt, alle på team 1 er døde`);
            return true;
        }
        if (this.team2.members.length <= 0) {
            console.log(`Team 1 vandt, alle på team 2 er døde`);
            return true;
        }

        return false;
    }

    fight() {
        while (!this.finished()) {
            this.performTurn();
        }
    }

    performTurn() {
        const currentChar = this.fightOrder[0].character;
        const allies = this.fightOrder[0].isInTeam1 ? this.team1 : this.team2;
        const enemies = this.fightOrder[0].isInTeam1 ? this.team2 : this.team1;

        for (const command of currentChar.strategy) {
            const {target, condition, action} = command;
            
            let realTarget:Character = null; // target = self
            if (target == CharInterfaces.Target.Self) {
                if (condition(currentChar)) {
                    realTarget = currentChar;
                }
            } 
            else if (target == CharInterfaces.Target.Enemy) {
                const possibleTargets:Array<Character> = enemies.members.filter((m) => condition(m));
                if (possibleTargets.length > 0) {
                    realTarget = possibleTargets[0];
                }
            }
            else if (target == CharInterfaces.Target.Ally) {
                const possibleTargets:Array<Character> = allies.members.filter((m) => condition(m));
                if (possibleTargets.length > 0) {
                    realTarget = possibleTargets[0];
                }
            }

            if (realTarget) {
                const boundAction = action.bind(currentChar);
                currentChar.targets = [realTarget]
                boundAction();

                if (realTarget.currentHP <= 0) {
                    console.log(`${realTarget.name} died!`);
                    this.team1.members = this.team1.members.filter((char) => (char != realTarget))
                    this.team2.members = this.team2.members.filter((char) => (char != realTarget))
                    this.setFightOrder();
                }

                this.fightOrder.push(this.fightOrder.shift());
                break;
            }
        }
    }

}


export {Fight};