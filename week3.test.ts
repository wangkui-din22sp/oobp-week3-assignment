// @ts-nocheck
import {
  Food,
  Refrigerator
} from "./week3";

// Tests for Food
describe("Food", () => {
  test("Food constructor", () => {
    const food = new Food("Banana", 150);
    expect(food.name).toBe("Banana");
    expect(food.calories).toBe(150);
  });

  test("getName with Banana", () => {
    const food = new Food("Banana", 150);
    expect(food.getName()).toBe("Banana");
  });

  test("getName with Apple", () => {
    const food = new Food("Apple", 100);
    expect(food.getName()).toBe("Apple");
  });

  test("getFoodInfo with Banana", () => {
    const food = new Food("Banana", 150);
    expect(food.getFoodInfo()).toBe("Banana has 150 calories");
  });

  test("getFoodInfo with Apple", () => {
    const food = new Food("Apple", 100);
    expect(food.getFoodInfo()).toBe("Apple has 100 calories");
  });
});

// Tests for Refrigerator with no food
describe("Refrigerator with no food", () => {
  const fridge = new Refrigerator();

  test("getContents", () => {
    expect(fridge.getContents()).toEqual([]);
  });
});

// Tests for Refrigerator with five potatoes and three bananas
describe("Refrigerator with five potatoes and three bananas", () => {
  const fridge = new Refrigerator();
  fridge.addFood(new Food("Potato", 100));
  fridge.addFood(new Food("Potato", 100));
  fridge.addFood(new Food("Potato", 100));
  fridge.addFood(new Food("Potato", 100));
  fridge.addFood(new Food("Potato", 100));
  fridge.addFood(new Food("Banana", 150));
  fridge.addFood(new Food("Banana", 150));
  fridge.addFood(new Food("Banana", 150));

  test("Refrigerator constructor", () => {
    expect(fridge.food.length).toBe(8);
  });

  test('getTotalCalories', () => {
    expect(fridge.getTotalCalories()).toBe(950);
  })

  test("getContents", () => {
    expect(fridge.getContents()).toEqual([
      "Potato",
      "Potato",
      "Potato",
      "Potato",
      "Potato",
      "Banana",
      "Banana",
      "Banana",
    ]);
  });

  test("eatFood with Potato", () => {
    expect(fridge.eatFood("Potato")).toEqual("You ate Potato with 100 calories");
    expect(fridge.getContents()).toEqual([
      "Potato",
      "Potato",
      "Potato",
      "Potato",
      "Banana",
      "Banana",
      "Banana",
    ]);    
  });

  test("eatFood with Banana", () => {
    expect(fridge.eatFood("Banana")).toEqual("You ate Banana with 150 calories");
    expect(fridge.getContents()).toEqual([
      "Potato",
      "Potato",
      "Potato",
      "Potato",
      "Banana",
      "Banana",
    ]);
  });

  test("eatFood with nonexisting food", () => {
    expect(fridge.eatFood("Apple")).toEqual("There is no Apple in the refrigerator");
    expect(fridge.getContents()).toEqual([
      "Potato",
      "Potato",
      "Potato",
      "Potato",
      "Banana",
      "Banana",
    ]);
  });

  test('getTotalCalories after eating', () => {
    expect(fridge.getTotalCalories()).toBe(700);
  });

  test('getNumberOfFoodItems', () => {
    expect(fridge.getNumberOfFoodItems()).toBe(6);
  });


});


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
  const initialHP = target.hp;

  soldier.attack(target);

  if (soldier.hitChance<= soldier.hitPercentage) {
    // Attack should happen and HP should decrease
    expect(target.hp).toBeLessThan(initialHP);
  } else {
    // Attack should not happen, HP should stay the same
    expect(target.hp).toBe(initialHP);
  }
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

  const initialCount = enemyArmy.getStatus().soldierCount;
  
  army.attackEnemy(enemyArmy);

  // After the attack, the number of soldiers should not increase
  expect(enemyArmy.getStatus().soldierCount).toBeLessThanOrEqual(initialCount);
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
