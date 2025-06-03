/*
  ALL TASKS MUST BE IMPLEMENTED WITH TYPESCRIPT!
  Use interfaces and data types in all cases to explicitly specify the types
  for variables, function parameters, function return values and object structures. 
*/

/*
Task 1 - Food class
Create a class called Food. The class should have the following properties:
- name (string)
- calories (number)
The class should have the following methods:
- getName(): string, returns the name of the food
- getFoodInfo(): string, returns a string in the following format: "<name> has <calories> calories"
*/
/* Write your Task 1 solution here */



/* Task 2 - Create a class Refrigerator. The purpose of the class is to store Food objects. 
  The Refrigerator should be able to store an unlimited amount of Food objects.
  The Refrigerator should offer capabilities to add Food objects to the refrigerator,
  get the contents of the refrigerator and eat a Food object from the refrigerator.
  The Refrigerator should also offer method to calculate the total calories of all the Food objects in the refrigerator.

  The class should have the following methods:
  - addFood(food: Food): void, adds a Food object to the refrigerator
  - getContents(): string[], returns an array of strings containing the names of the Food objects in the refrigerator
  - eatFood(foodName: string): string, finds Food object with foodName from the refrigerator, removes a Food object from the refrigerator and
                         returns a string in the following format: "You ate <name> with <calories> calories". If 
                         the Food object is not in the refrigerator, return a string in the following format:
                         "There is no <name> in the refrigerator".
  - getTotalCalories(): number, returns the total calories of all the Food objects in the refrigerator
  - getNumberOfFoodItems(): number, returns the number of Food objects in the refrigerator
  

  Note you can use an array method splice to remove an element from an array.
  You can read more about the splice method here: 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
*/
/* Write your Task 2 solution here */

export { Food, Refrigerator };



//task 3:
// Implement a simple battle simulation between two armies using TypeScript.
//Tips: The simulation should include classes for Soldier and Army, with methods for attacking and checking the status of the armies.

// Step 1: 
// Create two classes: Soldier and Army. Soldiers can be formed to an army. Soldier has hp, attackStrength and hitPercentage. 
// When hp goes to zero, the soldier dies. 
// The armies can be put to fight each other. The armies fight in sequential manner. First army A attacks and then army B attacks. 

export class Soldier {
  hp: number;
  attackStrength: number;
  hitPercentage: number;
  hitChance: number; 
  isAlive: boolean;


  constructor(hp: number, attackStrength: number, hitPercentage: number) {
    this.hp = hp;
    this.attackStrength = attackStrength;
    this.hitPercentage = Math.max(0, Math.min(100, hitPercentage)); // Clamp between 0 and 100
    this.isAlive = true;
  }

  takeDamage(damage: number): void {

    //Write your solution here

  }

  // Step 2: 
  // One soldier can attack another soldier, the parameter target is the soldier to be attacked. 
  // hitChance = Math.random() * 100. The attack only happens if the hitChance is less or equal to this soldier's hitPercentage (hitChance <= this.hitPercentage)
  // The attack method should check if the soldier is alive before attacking. If the soldier is dead, the attack should not happen.  
  // If the attack happens, the method target.takeDamage should be called. The target soldier takes the damage which is equal to the attacking soldier's attack strength.
  attack(target: Soldier): void {

  //Write your solution here
  
  }

}

export class Army {
  name: string;
  soldiers: Soldier[];

  constructor(name: string, soldiers: Soldier[]) {
    this.name = name;
    this.soldiers = soldiers.filter(soldier => soldier.isAlive);
  }

  // Step 3: 
  // Get the current status of the army, including the number of alive soldiers and their total HP
  // The method should return an object with soldierCount and totalHP properties
  // soldierCount is the number of alive soldiers in the army
  // totalHP is the sum of HP of all alive soldiers in the army
  getStatus(): { soldierCount: number; totalHP: number } {
    
    //Write your solution here

  }

  // Step 4:
  // Get the combined attack strength of all alive soldiers in the army
  // The method should return the sum of attack strengths of all alive soldiers
  getCombinedAttackStrength(): number {

    //Write your solution here
  }

  // Step 5:
  // Attack another army. Each soldier in this army attacks a random soldier in the enemy army.
  // The method should iterate through all alive soldiers in this army, and each alive soldier attacks a random alive soldier in the enemy army.
  // If the enemy soldier is killed, it should be removed from the enemy army's soldiers array.
  // The method should not return anything.
attackEnemy(enemyArmy: Army): void {
  
  //Write your solution here

}


// Step 6:
// Check if the army is defeated, meaning all soldiers are dead
  isDefeated(): boolean {

    //Write your solution here

  }
}


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