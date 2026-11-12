**Question: The test is still red. Read the error. Which schema stopped it, and why? Your editor probably shows a red line under menu[pizzaType] , yet Vitest still ran the code. What does that tell you about TypeScript types versus Zod checks?**

**Answer:** Its is the Zod schema for PizzaSchema that expects a price but it gets undefined when it tries to validate it, and then it stops. The price isn't in the menu yet. 

Typescript only checks the code in the editor and gives us the red underlines, and Zod and Vitest run in realtime when the code is executed. So typescript does not stop the tests.

**Question: This bug would never have been found without a test. What was it, and what does that tell
you about testing error messages?**

**Answer:**
The little bug was a little misspelling. When the test tests error messages exactly with .toThrow, it doesent only show that there is an error. It also shows exactly what the error says.