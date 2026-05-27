# App Distribution

## The problem

**I built an app, now what?** The number of people asking this question is increasing in above-linear rates, due to the rise of vibe-coding platforms like Loveable, Replit, Base44, and so on.

As frequently brought up on Twitter/Reddit, the bottleneck is no longer building, but rather distribution. That phrase has likely been true even before the LLM era, but it is felt more strongly ever since. App distribution is not an easy task, people build careers around it (see publishers, ad account managers, creative managers, data analysts, etc.). App distribution involves a multitude of tasks, both technical and non-technical and requires some amount of know-how to get started in.

The first step is typically **(1) annotating the app with analytics**. This involves integrating with an analytics platform (e.g. Amplitude) and sending behavioral data, allowing us to understand which users are using the app, in what patterns, which features are they interacting with, how often they engage, and when do they churn. This information is critical for optimizing the app and measuring campaign performance downstream. The most difficult decision to make here is **(a) picking the analytics SDKs**, more often than not, one needs multiple, since Firebase might be better suited for tracking ad revenue vs. RevenueCat presents a source of IAP & subscriptions. Then **(b) initializing them in the right order**, so that users can be associated across multiple platforms, we want to match the RevenueCat user ID with the Amplitude user ID with the app’s own user ID. The final piece is **(c) deciding which actions to annotate**, here less is more, annotating everything will create a data soup, that is hard to reason, or using logging everything is first-part events while under utilizing parameters will again lead to parsing trouble during data analysis.

The second step is **(2) setting up attribution tracking**. The goal here is to measure how people are discovering our app and installing it. On the surface this sounds simple, but due to the fragmented nature of click & view attribution data, multiple channels being involved, and Apple’s new privacy rules introduced in iOS 14.5, it is far from it. These new privacy practices are great for the user, but make it practically impossible to get deterministic install data, thus pushing the industry to employ probabilistic (and sometimes sketchy) tracking tricks. To get this right, the app developer needs to **(a) pick an MMP** (mobile-measurement-partner) that is both affordable, easy to set up, and works (Amplitude did for us, Branch, despite months of effort & support tickets did not). Next, they need to **(b) set up the SDK in their app**, allowing the MMP to receive as much first-party data as possible. Forwarded data is always going to be inferior in quality compared to data collected directly via the MMPs SDK. After that the developer needs to **(c) set up data forwarding/imports** to get MMP access to onboarding events \+ revenue metrics. The onboarding events will allow us to set up install & engagement campaigns, while the revenue metrics will allow us to run ROAS campaigns. Next they need to **(d) configure their iOS SKAdNetwork schema**, so that Apple can share (in a flaky manner) iOS metrics with the MMP with campaign breakdown information. Finally, the developer needs to **(e) configure their MMP to send these metrics to Ad networks** which they intend to run campaigns on. This last piece closes the feedback loop, now Ad networks can show a creative to a user, check if they downloaded the app, engaged with it, spent money on it, to inform them if they want to show ads to similar users (targeting).

Next, we want to make all this data we collected useful, which brings us to step three (**3\) setting up analytics dashboards**. We utilize the UI of the analytics platform, picked in step (1), to hand-craft dashboards to track our top-line metrics, the ones most useful to the business. That is the most critical decision: **(a) picking which metrics to pay attention to**. There is a lot of industry knowledge we can rely on here, for example tracking D7/D30, avg. time per session, CAC, and LTV for most gaming apps. The next cumbersome task is to **(b) create the dashboards** which is difficult, not because the UI is ugly \- it’s not, but because there are a lot of caveats, such as filtering out internal/beta users, knowing that D7 means users who return exactly on day 7 (not on day 7 or after), and figuring out which graph type to use. There are some templates one can use out of the box, but they still require substantial tuning. And that is because **(c) configuring dashboards requires deep knowledge of annotation code**. Your app is sending \~20 character event names to your analytics dashboard, which is not sufficient information to decode what that event means (nuances around when it’s triggered). So the person writing the code has to be, at minimum, in the room while the dashboards are being created.

At this point we have an app, and can track user behavioral patterns & use that to power both our analytics dashboard and ad networks.

The next step is to start **(4) acquiring users via ad campaigns**. This is a closed loop system driven by two metrics: CAC and ROAS. We first **(a) create creatives**: still images, videos, and playables. Today, there are dozens of startups like Creatify AI that allows one to generate images & videos given app assets. There are tools like Claude Code and Sett AI to help spin-up playables. From my experience, with some design thinking, it’s not super difficult to come up with decent creatives, but it is super time consuming. Once the creatives are ready we **(b) create and set up ad network accounts**. Facebook Ad Manager, Google Ads, Reddit Ads, Snapchat, TikTok, and so on and so forth… each require independent account creation, billing, MMP integration, and come with a steep UI learning curve. (Honestly, I would pay someone high 3 digits to set all this up for me.) The most annoying part here is that you don’t know if you are doing it right, there are no public guides in this space, and the platform documentation seems intentionally cryptic, as if they are gatekeeping the job industry here. Next, we upload the creatives and **(c) launch the campaigns**. The basic setup is easy, but requires distinct campaigns for iOS and Android. The get-your-money-worth setup is super complicated for a newcomer requiring things like demographic targeting, look-alike audiences, re-engagement, prospective customer segmentation, etc. A nightmare to deal with as a startup. The journey doesn’t end here, since we need to **(d) monitor and tune the campaigns**. The simplest version of this might look like this: adjust creatives and demographic targeting to optimize for CAC. But you would be risking missing out on PMF (product-market-fit) if you didn’t try things like seasonal campaigns. For example, what if you could get your pomodoro app in-front of college students during finals week?

Now that we have users flowing in at a steady pace, say we are spending $20/day on ads which bring in 300 users per week, we are ready to tune our apps performance\!

This step is called **(5) retention tuning using A/B tests**. Since we have some numbers to work with, we can spin up our analytics dashboard and look at our onboarding funnel. Are users dropping off before signing up? Maybe we can make sign up optional? Two hurdles to deal with: **(a) extracting actionable insights from data** is no easy task; **(b) setting up independent A/B tests**, which requires picking a remote config provider (such as Firebase) and deploying multiple tests simultaneously that minimally interfere with each other. Doing this once is fun, but having to follow-up on A/B tests that have been running for weeks is not fun, since at this point you’ve likely forgotten the context.

Once we have a sticky, habit-forming app, and ONLY THEN, we move on to monetization. Step 6 is **(6) monetization tuning**. This step might involve paywall UI tuning using RevenueCat or running pricing A/B tests to identify willingness to pay. Unfortunately I have limited experience with this step, and will only be able to say that **(a) it is a recursively long process**.

## The solution

Ube is your distribution orchestrator. It acts as the company brain for your mobile app studio. It does not re-invent the wheel, but sets up and uses market leading tools to scale your app from zero to one.

Ube bridges the context gap between your code, your MMP provider, your analytics engine, and your ad campaigns. It comes with an opinionated stack and works with:

* Firebase Analytics  
* Firebase Remote Config  
* Firebase A/B Tests  
* Amplitude  
* Microsoft Clarity  
* Google AdMob  
* RevenueCat  
* AppsFlyer  
* Google Ads  
* Facebook Ads Manager  
* TikTok Ads

Ube can read and write data to all these platforms, using MCP calls and APIs where available (90%), and browser automation for the last mile (remaining 10%).

Ube can set up your entire distribution stack, including:

* Adding SDK integrations to your app  
* Annotating your aps code with events  
* Telling you to create an account at X (no we cannot automate this), then give it service account access.  
* Setup Amplitude dashboards  
* Setup AppsFlyer integrations  
* Route all your critical events to a central data lake  
* Design creatives (image, video, playable) via providers  
* Run and adjust campaigns  
* Recommend A/B tests to improve retention or monetization  
* Deploy A/B tests and generate reports (via RevenueCat or Firebase)

When you are ready to take it to the next level, you can look under the hood, and start tinkering with the powerful tools Ube set up for you. If your app takes off, you are already using the market leading tools, allowing you to hyper-scale. If it doesn’t take off, well at least you didn’t spend months setting all this up (unlike me).

## Moat

No platform's agent will ever recommend spending less on its own platform. Meta won't shift budget to Google, Apple won't tune your Play Console listing, Adapty won't suggest ad-supported tooling. Cross-platform optimization can only live in a tool whose incentives sit outside these closed platforms.

Similarly, every monetization specialist in this space picks a monetization lane and stays there. Adapty and RevenueCat ignore ad-supported apps, AppLovin MAX and IronSource ignore subscriptions. Ube doesn't need to pick a lane, which is why a hybrid app (subscription \+ ads \+ IAP, increasingly the default) can run on Ube as one stack.

UA tradecraft lives in a few hundred mobile UA managers' minds, and is not often publicized and even hard to pick up. Ube provides a handbook and step-by-step execution to democratize this practice.

## Constraints

Ube first audits and instruments a customers application to a known substrate (SDK init order, event taxonomy, ATT/SKAdNetwork wiring, Play Console setup, etc.) so it knows the codebase quite well.

## Why now?

Building has become democratized, everyone can build an app now, which makes the distribution pain even more pronounced. Base models are super smart, and given full context, can write SQL queries to understand user behaviour, and suggest features and future direction, better than most non-marketing folks can. Most tools listed above have workable APIs and the remaining gap can be bridged thanks to the recent advancements in browser automation. Based on a brief survey of API capabilities and ToS, there are only a few actions we are unable to automate.

## Known Risks

1. Vibe Coding platforms are starting to eat into the pie.  
2. Vibe Coding platforms are trying to create their own distribution network. Instead of relying on App Store distribution, they are trying to prompt the app-in-app distribution model.  
3. Marketing Ube is hard, because time from payment to perceived value is long – weeks\!  
4. The account manager model is hard to execute, due to competing internal priorities.

## Future Work

* Fastlane setup for automated App Store & Play Store distribution.  
  * Sub-agent takes screenshots & polishes them.  
  * Store listing (keywords, description) is generated and internationalized.  
  * One click deployment.
