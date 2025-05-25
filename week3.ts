
export class Soldier {
  hp: number;
  attackStrength: number;
  hitPercentage: number;
  isAlive: boolean;

  constructor(hp: number, attackStrength: number, hitPercentage: number) {
    this.hp = hp;
    this.attackStrength = attackStrength;
    this.hitPercentage = Math.max(0, Math.min(100, hitPercentage)); // Clamp between 0 and 100
    this.isAlive = true;
  }

  takeDamage(damage: number): void {
    this.hp = Math.max(0, this.hp - damage);
    if (this.hp === 0) {
      this.isAlive = false;
    }
  }

  attack(target: Soldier): void {
    if (!this.isAlive) return;
    const hitChance = Math.random() * 100;
    if (hitChance <= this.hitPercentage) {
      target.takeDamage(this.attackStrength);
    }
  }
}

// army.ts
export class Army {
  name: string;
  soldiers: Soldier[];

  constructor(name: string, soldiers: Soldier[]) {
    this.name = name;
    this.soldiers = soldiers.filter(soldier => soldier.isAlive);
  }

  addSoldier(soldier: Soldier): void {
    if (soldier.isAlive) {
      this.soldiers.push(soldier);
    }
  }

  getStatus(): { soldierCount: number; totalHP: number } {
    const aliveSoldiers = this.soldiers.filter(soldier => soldier.isAlive);
    const totalHP = aliveSoldiers.reduce((sum, soldier) => sum + soldier.hp, 0);
    return {
      soldierCount: aliveSoldiers.length,
      totalHP,
    };
  }

  getCombinedAttackStrength(): number {
    return this.soldiers
      .filter(soldier => soldier.isAlive)
      .reduce((sum, soldier) => sum + soldier.attackStrength, 0);
  }

  attackEnemy(enemyArmy: Army): void {
    const aliveSoldiers = this.soldiers.filter(soldier => soldier.isAlive);
    const enemyAliveSoldiers = enemyArmy.soldiers.filter(soldier => soldier.isAlive);

    if (aliveSoldiers.length === 0 || enemyAliveSoldiers.length === 0) return;

    // Each soldier attacks a random enemy soldier
    for (const soldier of aliveSoldiers) {
      if (enemyAliveSoldiers.length === 0) break;
      const randomIndex = Math.floor(Math.random() * enemyAliveSoldiers.length);
      const target = enemyAliveSoldiers[randomIndex];
      soldier.attack(target);
      // Update enemy alive soldiers after attack
      enemyArmy.soldiers = enemyArmy.soldiers.filter(s => s.isAlive);
      enemyAliveSoldiers.splice(randomIndex, 1, target); // Update the target in the temp array
    }
  }

  isDefeated(): boolean {
    return this.soldiers.every(soldier => !soldier.isAlive);
  }
}

// battle.ts
export function fightArmies(armyA: Army, armyB: Army): string {
  let round = 1;
  while (!armyA.isDefeated() && !armyB.isDefeated()) {
    console.log(`Round ${round}:`);
    console.log(`${armyA.name} Status: ${JSON.stringify(armyA.getStatus())}`);
    console.log(`${armyB.name} Status: ${JSON.stringify(armyB.getStatus())}`);

    // Army A attacks Army B
    armyA.attackEnemy(armyB);
    if (armyB.isDefeated()) {
      return `${armyA.name} wins!`;
    }

    // Army B attacks Army A
    armyB.attackEnemy(armyA);
    if (armyA.isDefeated()) {
      return `${armyB.name} wins!`;
    }

    round++;
  }
  return armyA.isDefeated() ? `${armyB.name} wins!` : `${armyA.name} wins!`;
}