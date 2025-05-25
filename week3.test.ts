
import { Soldier, Army, fightArmies } from './week3';

describe('Army and Soldier', () => {
  let armyA: Army;
  let armyB: Army;

  beforeEach(() => {
    // Reset armies before each test
    armyA = new Army('Army A', [
      new Soldier(100, 20, 80), // Soldier with 100 HP, 20 attack, 80% hit chance
      new Soldier(100, 20, 80),
    ]);
    armyB = new Army('Army B', [
      new Soldier(50, 10, 90), // Soldier with 50 HP, 10 attack, 90% hit chance
      new Soldier(50, 10, 90),
    ]);
  });

  test('should initialize soldier correctly', () => {
    const soldier = new Soldier(100, 20, 80);
    expect(soldier.hp).toBe(100);
    expect(soldier.attackStrength).toBe(20);
    expect(soldier.hitPercentage).toBe(80);
    expect(soldier.isAlive).toBe(true);
  });

  test('soldier should die when HP reaches zero', () => {
    const soldier = new Soldier(20, 10, 100);
    soldier.takeDamage(20);
    expect(soldier.hp).toBe(0);
    expect(soldier.isAlive).toBe(false);
  });

  test('soldier should not attack if dead', () => {
    const soldier = new Soldier(0, 10, 100);
    soldier.isAlive = false;
    const target = new Soldier(100, 10, 100);
    soldier.attack(target);
    expect(target.hp).toBe(100); // No damage dealt
  });

  test('army should return correct status', () => {
    const status = armyA.getStatus();
    expect(status).toEqual({ soldierCount: 2, totalHP: 200 });
  });

  test('army should return correct combined attack strength', () => {
    expect(armyA.getCombinedAttackStrength()).toBe(40); // 2 soldiers * 20 attack
  });

  test('army should not add dead soldier', () => {
    const deadSoldier = new Soldier(0, 10, 100);
    deadSoldier.isAlive = false;
    armyA.addSoldier(deadSoldier);
    expect(armyA.getStatus().soldierCount).toBe(2); // No change
  });

  test('fightArmies should declare a winner', () => {
    // Mock console.log to capture output
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    // Since combat is probabilistic, we test that a result is returned
    const result = fightArmies(armyA, armyB);
    expect(['Army A wins!', 'Army B wins!']).toContain(result);
    consoleSpy.mockRestore();
  });

  test('army should be defeated when all soldiers are dead', () => {
    armyA.soldiers.forEach(soldier => soldier.takeDamage(100));
    expect(armyA.isDefeated()).toBe(true);
  });
});