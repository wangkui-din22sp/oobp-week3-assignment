import { Soldier } from './week3';

describe('Soldier', () => {
  let soldier: Soldier;

  beforeEach(() => {
    soldier = new Soldier(100, 20, 80); // HP = 100, Attack Strength = 20, Hit Percentage = 80
  });

  test('should be initialized with correct properties', () => {
    expect(soldier.hp).toBe(100);
    expect(soldier.attackStrength).toBe(20);
    expect(soldier.hitPercentage).toBe(80);
    expect(soldier.isAlive).toBe(true);
  });

  test('should take damage correctly', () => {
    soldier.takeDamage(30);
    expect(soldier.hp).toBe(70); // 100 - 30 = 70
    expect(soldier.isAlive).toBe(true);

    soldier.takeDamage(70);
    expect(soldier.hp).toBe(0); // 70 - 70 = 0
    expect(soldier.isAlive).toBe(false);
  });

  test('should only attack if alive', () => {
    const target = new Soldier(50, 10, 90);
    
    soldier.takeDamage(100); // Kill the soldier
    soldier.attack(target);
    expect(target.hp).toBe(50); // The attack should not happen because soldier is dead.
  });

  test('should attack correctly with hit chance', () => {
    const target = new Soldier(50, 10, 90);
    soldier.attack(target);
    expect(target.hp).toBeLessThan(50); // Attack should happen with 80% chance
  });
});


import { Army } from './week3';

describe('Army', () => {
  let army : Army;

  beforeEach(() => {
    army = new Army('Army A', [
      new Soldier(100, 20, 80),
      new Soldier(100, 20, 80),
    ]);
  });

  test('should be initialized with correct properties', () => {
    expect(army.name).toBe('Army A');
    expect(army.soldiers.length).toBe(2);
    expect(army.getStatus().soldierCount).toBe(2);
  });

  test('should calculate total HP correctly', () => {
    expect(army.getStatus().totalHP).toBe(200); // 100 + 100
  });

  test('should calculate combined attack strength correctly', () => {
    expect(army.getCombinedAttackStrength()).toBe(40); // 20 + 20
  });

  test('should remove dead soldiers correctly after battle', () => {
    army.soldiers[0].takeDamage(100); // Kill first soldier
    expect(army.getStatus().soldierCount).toBe(1); // One soldier should be left alive
  });

  test('should handle attack on enemy army', () => {
    const enemyArmy = new Army('Army B', [
      new Soldier(50, 10, 90),
      new Soldier(50, 10, 90),
    ]);
    army.attackEnemy(enemyArmy);

    // After the attack, the enemy should have fewer living soldiers
    expect(enemyArmy.getStatus().soldierCount).toBeLessThan(2);
  });
});



import { fightArmies } from './week3';

describe('Battle Simulation', () => {
  test('should simulate battle correctly and determine the winner', () => {
    const armyA = new Army('Army A', [
      new Soldier(100, 20, 80),
      new Soldier(100, 20, 80),
    ]);
    const armyB = new Army('Army B', [
      new Soldier(50, 10, 90),
      new Soldier(50, 10, 90),
    ]);

    const result = fightArmies(armyA, armyB);

    // Army A should win because it has more total HP and attack strength
    expect(result).toBe('Army A wins!');
  });

  test('should handle edge case of both armies losing all soldiers', () => {
    const armyA = new Army('Army A', [
      new Soldier(50, 10, 50),
      new Soldier(50, 10, 50),
    ]);
    const armyB = new Army('Army B', [
      new Soldier(50, 10, 50),
      new Soldier(50, 10, 50),
    ]);

    // After multiple rounds, it's possible that both armies will lose all soldiers
    const result = fightArmies(armyA, armyB);

    expect(result).toBe("It's a draw!");
  });

  test('should handle cases with one army having no soldiers left at the beginning', () => {
    const armyA = new Army('Army A', []);
    const armyB = new Army('Army B', [
      new Soldier(50, 10, 90),
      new Soldier(50, 10, 90),
    ]);

    const result = fightArmies(armyA, armyB);

    expect(result).toBe('Army B wins!');
  });
});
