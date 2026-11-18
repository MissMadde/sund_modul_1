**Question 1: What do on , runs-on , strategy.matrix and steps do? Why did nothing happen when you only pushed the branch?**

**Answer:**
on: shows what events to be triggerd. Like push or pull request.
runs-on: decides what environment or OS the work will run on.
strategy.matrix: Lets me run the same workflow parallel to other configurations.
steps: Its a sequence of actions to be executed in an order. Like the ones we can see in our run-loop in actions tap.

**Question 2: Why can a test pass on your laptop but fail in CI? Think of why the video's first run failed.**

**Answer:**
It can be because of environmental differences like versions of node.js or dependencies and local settings in the project? Like my first build craches with node 18 but works on build 22 because its a new function/dependency in the later version that makes it work. 

**Question: Would this step have caught the possibly null bug from Week 11, Exercise 9?**

**Answer:**
Yes it would. Typescript tsc --noEmit feels if the variable is null or undefined and stops the loop.