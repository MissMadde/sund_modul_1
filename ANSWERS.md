**Question: The test is still red. Read the error. Which schema stopped it, and why? Your editor probably shows a red line under menu[pizzaType] , yet Vitest still ran the code. What does that tell you about TypeScript types versus Zod checks?**

**Answer:**
Its is the Zod schema for PizzaSchema that expects a price but it gets undefined when it tries to validate it, and then it stops. The price isn't in the menu yet.

Typescript only checks the code in the editor and gives us the red underlines, and Zod and Vitest run in realtime when the code is executed. So typescript does not stop the tests.

**Question: This bug would never have been found without a test. What was it, and what does that tell
you about testing error messages?**

**Answer:**
The little bug was a little misspelling. When the test tests error messages exactly with .toThrow, it doesent only show that there is an error. It also shows exactly what the error says.

**Question: Why use toEqual and not toBe when you compare objects?**

**Answer:**
toEqual compare the contents of the objects if its the same.
toBe checks if it is the exact same object.
So if to customers orders same object margherita and two margheritas show up on to diffrent tables in the pizza shop, toEqual would say its the same object so it would be valid.
ToBe would say no, its not the same pizza, so it would not work with toBe.

**Question: Your "between 1000 and 9999" test uses a random number. Could it pass by luck even if the
code were wrong? What could you do to make it more trustworthy?**

**Answer:**
Yes if you only do the test one time or a few, it could pass by luck.
if we would do the test in a loop in multiple times like 100 or so, if the code is broken it would eventually be revealed. 