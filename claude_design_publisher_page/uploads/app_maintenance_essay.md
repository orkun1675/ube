# App Maintenance

## The problem

In my personal experience, engineers allocate 10-30% of their time to maintaining existing apps. This might involve routine dependency upgrades, fixing exceptions that occur in production, or addressing user reported issues. While playing detective when trying to debug that one unique race condition that occurs during widget unmount is kind of fun, it starts feeling repetitive and low value quite quickly. And nothing is more exciting than adding more features\!

I see three common issues when doing maintenance work; (1) **engineers are less likely to test their changes**. Production exceptions come with a stacktrace (tools like Crashlytics and Sentry do a great job equipping us with all the context around a bug). Dependencies provide descriptive migration documentation, for example: replace function A with function B. When presented with such full context, the engineer is likely to assume their change will just work, and that there is no need to run an end-to-end test, only to realize after the next binary release that the bug is still there or their upgrade caused a regression.

Another thing that bothers me is that (2) **not all production issues are fixable**. This might be because the user is running old hardware with 2GB RAM (and yes you can limit in Play Console which devices are eligible to download your app), or that the issue is intermittent and very hard to reproduce, or worse yet, it is a problem with a dependency, out of our control. In the latter case, the right course of action is to search GitHub issues to look for a workaround, and if one doesn’t exist, report the issue ourselves. Not that’s a lot of work, since we need to untangle the dependency stacktrace from our own, and write a helpful bug report, ideally complete with a minimally reproducible sample app. How often have we done that vs. just deciding to ignore the bug?

Probably the most annoying issue is that (3) **maintenance work delays releases**. You likely perform some testing during development, and then cut an internal testing/beta release so that QA takes a look. QA might be directionally happy with the app, but there might be some minor bugs (such as a missing null check) that requires eng to be looped in again. I’m a bit hesitant to admit that this happens more often than not, and will delay an exciting new app release.

## The solution

I’d like to propose Ube, an agentic tool to remove the maintenance burden from mobile apps, while simultaneously addressing the three issues identified above. Let me try to describe how Ube might work.

**Intake**. Ube can listen to:

* Crashlytics/Sentry reported bugs, classify them by binary version, and stage (new, triaged, obsolete, muted);  
* Play Console reported ANRs and crashes;  
* User feedback via app store listings and support emails;  
* Dependency upgrades.

**Triage**. Ube can run a small DB to track each issue's state. Figuring out which binary (or dependency) versions contain the bug, whether the bug has been addressed, whether there is an open-source issue tracker for it, etc. Alleviating the need to spend repeated effort on the same bug.

**Fix**. Once an issue is deemed fixable, Ube could:

* Try to reproduce it by running your app on an emulator;  
* Deploy test-driven-development principles (if your app ships with tests);  
* Patch the fix;  
* Use the emulator again to validate the fix & check for regressions;  
* Open a PR.

**Report**. If Ube fails to identify the root cause or is unable to produce a fix it could:

* File a GitHub issue when dependency related;  
* Keep an eye on the issue until it impacts X%+ sessions;  
* Call your attention to the matter by filing an issue in your GitHub tracker.

Upon merge, if the issue was user reported, Ube can close the loop and message the user, driving up customer satisfaction.

## Moat

* TODO

## Why now?

Most tools (Crashlytics/Sentry/GitHub) provide MCP servers the agents can talk to, making integration a breeze. Browser agents can be used to bridge the last mile gap, for tools that do not provide MCP/APIs. CTS has developed agentic skills that allow agents to run apps in an emulated environment. The base models are smart enough to debug production issues, in some cases they are even more capable than human engineers.
