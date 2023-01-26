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
