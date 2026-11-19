### Exercise 1

**Question: What does docker ps show you? Which columns tell you that SonarQube is running, and on which port?**

**Answer:**
docker ps shows a list of all running containers and the details.
Status shows how long the containers have been running.
Ports shows what port the containers listens to.

**Question: Why run SonarQube in Docker instead of installing it directly on your computer?**

**Answer:**
To run sonarwube in a container makes the environment consistent and makes it work the same way on different computers.  its easy to start and stop and the system is not affecting the rest ov the computer.
<hr>

### Exercise 2

**Question: Did your project pass or fail the quality gate? How many issues did SonarQube find?**

**Answer:**
Yes, my project passed the quality gate, and zero issues. 
I dont know anything about the duplications...? It must be a hoax.
<hr>

### Exercise 3

**Question : Depending on the version, SonarQube groups issues either by the quality they affect (Security, Reliability, Maintainability) or by type (Vulnerability, Bug, Code Smell). Explain each of the three groups your SonarQube uses, with an example.**

**Answer:**


**Question : SonarQube, your tests and Sentry all help you find problems. What does each one find that the others can't?**

**Answer:**
<hr>

### Exercise 4 

**Question: Your package.json goes to GitHub. What could someone do with your SonarQube token if they found it there? What about a database password or a Sentry DSN?**

**Answer:**
Well, a token is a token and is unique to my project. If someone gets it they can use it themselfs and send in data and reports into my project or get data and anlysis from my project that not should be public.
If someone gets a databese-password, its the same thing there and worse. They'd get access to vulnerable data and they can destroy the hole project/website if its a big database. 
With Sentry-DSN someone could send wrong reports or spam to my project which make it harder for me to use Sentry the way it should be using.

**Question: Why is it better to put settings like the project key in sonar-project.properties than in a long command?**

**Answer:**
Its easier and more secure than a long terminal command that can be misspellings and forget some texts.
Its the same configuration for all and easy to use for the team mates.
Its easier to separe config and secret keys in different files. Also it will never be outed in the terminal.

<hr>

### Exercise 5

**Question: What changed in the numbers, and why? Why is it a problem when a tool reports issues in code you didn't write?**

**Answer:**
Nothing happend when i included:
sonar.exclusions=node_modules/**,dist/**,coverage/**<br>
sonar.tests=.<br>
sonar.test.inclusions=**/*.test.ts<br>
into sonar-project.properties file?

It was the same files scanning before and after.

* models
* utils
* index.ts
* instrument.ts
* sequelize.ts

Already my own code files?
<hr>

### Exercise 6

**Question: Why run your tests after every fix, even when the change looks small?**

**Question: Choose one of your fixes. Is the code easier to read now? Explain why or why not.**

