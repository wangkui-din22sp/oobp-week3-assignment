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

  test("Refrigerator constructor", () => {
    expect(fridge.food).toEqual([]);
  });

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



