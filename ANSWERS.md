**Question 1: What do on , runs-on , strategy.matrix and steps do? Why did nothing happen when you only pushed the branch?**

**Answer:**
on: shows what events to be triggerd. Like push or pull request.
runs-on: decides what environment or OS the work will run on.
strategy.matrix: Lets me run the same workflow parallel to other configurations.
steps: Its a sequence of actions to be executed in an order. Like the ones we can see in our run-loop in actions tap.

**Question 2: Why can a test pass on your laptop but fail in CI? Think of why the video's first run failed.**

**Answer:**
It can be because of environmental differences like versions of node.js or dependencies and local settings in the project? Like my first build craches with node 18 but works on build 22 because its a new function/dependency in the later version that makes it work. 

**Question 3: Why is a red cross on the pull request better than one after merging?**

**Answer:**
It stops broken code before it merges into the main/root branch. When the code merges it ensures that the code in the base branch always works and are green. 

**Question 4: Would this step have caught the possibly null bug from Week 11, Exercise 9?**

**Answer:**
Yes it would. Typescript tsc --noEmit feels if the variable is null or undefined and stops the loop.

**Question 5: What's the difference between npm ci and npm install , and why does CI use npm ci ?**

**Answer:**
`npm install` is used for local development. it can update package-lock.json with new versions end dependencies if needed.
`npm ci` (clean install) is used for automated environments like CI. It must have package-lock.json to work.

CI is using it because it guarantees a completely reproducible and fast and reliable build.
It destroys the  risk of erreros caused by different versions of packages.

**Question: What does branch protection do that CI alone can't?**

**Answer:**
CI runs tests and checks the codes quality, but it can't prevent someone from merging. 
The branch protection rules is blocking the merge button so that broken code can't be merged to the main branch.