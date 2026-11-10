**Question: Why must instrument.js be imported before everything else?**

**Answer:** Because Sentry needs to be already up running before every else framework imports och runs. 
When Sentry.init() runs from instrument.js Sentry adds controllers/listners into the code that checks for errors and unhandled business.

**Question: Why do we keep the DSN in .env instead of in the code?**

**Answer:** Because the dsn url works like a key just like the url to ex MongoDB. For security, we dont want it on the run in public. Keys are always a big value and we want them as secrets. And for flexibility if we want to shange it or have more projects, its esy to change them in one place in the env file.

**Question: You didn't add any extra information to this error yourself. List everything Sentry recorded
anyway**

**Answer:**
Stack Trace,
Breadcrumps,
HTTP-requests and Headers, Tags like versions and OS and hardware info.

**Question: What happened when the handler was above the routes, and why? (Think about the order in
which Express runs middleware.)**


**Answer:** I actually could not see any changes? I did not know what was supposed to happen so i googled and the line "Sentry.setupExpressErrorHandler(app);" is not needed in newer updates of Sentry v8 fixes it itselfs. I also tried without the line at the end and there were no changes. Everything still worked?  

**Question: Why didn't the errors inside your try/catch reach setupExpressErrorHandler by
themselves?**

**Answer:**
When there is a try/catch in the routes that sends an error message by itself like res.status(500) then it catches the error itself and express thinks the route solved it with the client, so its never sent to Sentry.

**Question: Several requests failed for the same reason. Did Sentry show them as separate issues, or
group them? Why is that useful?**

**Answer:**
Sentry grouped them all together in the issue SequelizeConnectionError because the reason to all the errors where the same.
Its useful because its easier to see and read in the dashboard in Sentry that its one issue with a lot of events going on.

**Question: Explain the difference between a breadcrumb and a tag in your own words. Give one
example of when each one would help your team.**

**Answer:**

Breadcrumb: is like a screenshot showing what happend right before the error.
Tag: is a key-value you can search for. Like a label.

A Breadcrumb would be useful if someone kills the application, then we can see what happend right before, so the error is more traceable.
A Tag that is searchable is useful when you need to filter the errors into different categories.


**You now send each error to Sentry. What does each tool give you that the other doesn't?**

**Answer:**
I dont really know what you mean by each tool but if you mean the difference between console.error and reportError then console.error gives me a realtime feedback and error log right now into the console and showing the stack trace.

Sentry gives me better and more details in the error log, it groups errors together and inform me by mail (goddamnit) when something is wrong.