# Thought process
These are some typical interview questions that I have been asked in the past and if I were to be asked again, these are the answers I would give.

I put these here with the purpose of revealing my thought process so as to give a better idea of how I work.

## What architectural decisions have you made in your previous roles?

### Refactoring of unit tests
While working on a large task for hey.car (React code base), I refactored the unit tests which were growing very large in number and complexity.

I was able to refactor these to reduce the number of lines of code and thus, the complexity.

While testing a component, I noticed that each of the tests would mount a component with Enzyme, and the same properties would be repeated for each unit test.

The code block below illustrates the problem:

```
describe ('component tests', () => {
	it('should do something', () => {
		const wrapper = mount(
			<MyComponent
				firstProp="One"
				secondProp={{ two: true }}
				thirdProp
				fourthProp={() => {}}
				fifthProp={<p>Hello</p>}
			/>
		);

		// unit test code in here
	});

	it('should execute the callback', () => {
		const spyCallback = sinon.spy();
		const wrapper = mount(
			<MyComponent
				firstProp="One"
				secondProp={{ two: true }}
				fourthProp={spyCallback}
				fifthProp={<p>Hello</p>}
			/>
		);

		// unit test code in here
	});
	
	// then we repeat these tests to reach full coverage
});
```

That's a lot of code for just two tests, when you compare it to the solution below:

```
const noop = () => {};
const defaultProps = {
	firstProp: 'One'
	secondProp: { two: true },
	thirdProp: true,
	fourthProp: {noop}
	fifthProp: <p>Hello</p>
};

describe ('component tests', () => {
	it('should do something', () => {
		const wrapper = mount(
			<MyComponent {...defaultProps} />
		);

		// unit test code in here
	});

	it('should do something else given...', () => {
		const wrapper = mount(
			<MyComponent
				{...defaultProps}
				thirdProp={false}
			/>
		);

		// unit test code in here

		expect(wrapper.find('something')).toBeTruthy();
	});
});
```

You can already see the difference. All we need to do with this second approach is override a default property and then we can check the outcome of doing so.

Others were in agreement with this approach and were more than happy to adopt it moving forward. Given we had time to manage technical debt, we were able to refactor older unit tests to adopt this approach on a phases basis.

The platform ultimately became better because the maintenance effort was reduced significantly. If we needed to change the prop types for a component, we could do so in one place.

### Better use of connected components
The fulcrum of the product we were working on in hey.car was the vehicle detail page which started out simple - display pictures and specs for a vehicle the user is interested in.

That should be simple enough, right? Fetch vehicle data including the images (in one API call), then display to the user when the fetch has completed.

For this, we used the basic Redux set up (actions, constants, reducer, connected component, the component itself).

As the product grew, so did the complexity of the code. We needed to include functionality to contact a car dealer and calculate the cost of finance for the user based on parameters such as loan amount, duration and vehicle trade-in value.

We initially kept all this functionality as part of the main Vehicle component / module, but it became unwieldily and overly complex.

We had actions relating to finance calculations and dealer contact being passed into the <Vehicle /> component and then through to the <DealerContact /> and <Finance /> components as props.

Very tightly coupled. Lots of intertwined dependencies. Lots of potential for bugs.

I presented a solution to the team whereby we would remove the Redux set up from the vehicle for anything relating to finance / dealer contact, and move this into their own Redux set up.

We would include these in the Vehicle component as connected components, so they could plug directly into redux without needing to know much about their parent component.

This was a simple enough solution to present to other team mates as it involved moving code around more than having to re-invent the wheel. This would be a quick refactor that would have little negative impact.

We ended up with much better performance and less bugs as a result of this, and implementing new features was much easier with the separation of concerns.

### Improving server side rendering performance
I just released by own website from scratch as a personal project. With this, I have set up the whole front and back end, as well as the CI / CD flow.

This project used React, Redux, TypeScript and Node. I encountered a significant performance bottleneck when working on server side rendering (this being my first run at rolling my own SSR).

React has built-in functionality to mount a component and render its contents to string output, which can then be delivered using ExpressJS.

This is all well and good, but the `renderToString(<Component {...props} />)` can be prohibitively expensive, given that it is a blocking async call.

When I started out with this, I was able to use the Chrome developer tools to measure the FTTB (first time to byte), which is a good indicator of how long it took the server to process the request before the client received anything.

On a slow DigitalOcean droplet ($5 a month) you could be waiting a few seconds for a response.

I decided to do two things here. Firstly, I replaced `renderToString(...)` with `renderToNodeStream(...)` which is async and non-blocking (plays better with the event loop). I saw some good performance gains here.

To make them even better, I added the response to these requests to an in-memory cache to be served without needing to be rendered to a string. This sped things up significantly and made performance much faster.

## What is the hardest architectural problem you had to solve, and how did you solve it?
The trickiest problem I had to solve (by far) was to try to shoehorn a one hundred page Word97 document into a mobile application.

In 2012, my team started on a project to create a mobile application (cross platform with Sencha Touch 2) that would be used by doctors and nurses in a hospital in Galway.

This app contained medical guidelines (which were classified according to various topics) and a BMI calculator.

The simplest solution was to present each of the main topics in the document as a tile on the landing page, then each subsection would be presented as a list with a detail view. Simple enough.

The real challenges came when we needed to solve the following, and I present the solutions below:

### How do we reliably parse a 15 year old Ms Word document, especially when it has been edited by several people over that time.
A suggestion was made to do this from within the app itself, but that was ruled out almost immediately. In place, we built a parser in C# .Net which could extract the text content and image assets.

We put this together into a content tree and created the relevant components, mapping these across the app and creating the basics of a list and detail view.

### Displaying text is fine, but what about images? How do we reliably allow pinch and zoom in a webview with Javascript, so that it is performant and error-free?
This was a real challenge. The webiews on iOS and Android devices were much slower than their browser based counterparts, and rendering reliably was challenging.

Providing a smooth experience for scaling and translating an image was simply not going to be possible within a Javascript webview, so instead we opted to hand over control of this to a native view, which was much smoother.

We needed to write the functionality for this twice, once for iOS and then again for Android. If a user was in the app reading text content, then they wanted to tap on an image, they would segue into this image view. If they exited the image, they would be taken back into the app.

### How do we offer deep linking into certain sections of the app?
Given the level of content in the app, we added a bookmarking feature with deep linking which worked well because it would behave much the same way as a web application.

Bookmarking an image was trickier because you were no longer in the web application. We needed to create a bridge between the image viewer (native) and the Javascript running in the app and we wrote a feature whereby a button tap event that was fired would be caught with the Javascript.

### How do we handle content updates seamlessly, especially given app store lead times for approvals?
We spiked a few approaches for this, such fetching and caching with local storage. These needed to be ruled out, because there was no budget to set up and maintain a server that would deliver content to the app.

The content would need to be bundled for full offline capability. Even if we went with this approach, storing the content locally in the application store (which uses LocalStorage) would not be a good idea, because if the user clears out their browser cache, this would remove all the app content as well. The risk of data loss from an external source was not a good way to go.

In the end, we opted to generate the JSON content with the images as part of a build step, then bundle everything together locally as part of the application bundle. We were still able to keep the bundle size down to a respectable level and preserve app data.

The downside to this was that any time content needed to be updated, a new version of the app would need to be released. Since content updates were infrequent, we were happy enough to live with this solution.

### Conclusion
These cross-platform solutions for mobile application development promised a seamless single code base with a performant solution for building products.

The idea sounded great on paper and the decision was made to use Sencha Touch 2. After our first project, we could quickly see the limitations presented to us.

The workarounds we needed to come up with often outweighed the benefit of having a single code base, which after a time became three, with three different languages being used.

After some debate, we decided that we would only build native applications. We might have to deal with two completely separate code bases, but we have excellent documentation, tried and tested solutions, community support and tonnes of resources at our disposal.

## What are the main concepts you have promoted, and give evidence of them in previous roles?

### Simplicity
I only work with simple solutions to problems no matter how complex they appear to be. In fact, I am still learning about this.

Any code I write should be easy to test and refactor. If it isn't, then I go back to the drawing board. Without that, there are plenty of rabbit holes to go down.

In terms of the bigger picture and overall architecture of the app, I want to be able to get 90% of what is going on across to someone in five minutes.

The easier it is to map your mind around the basic concepts, and hold onto those, the easier it is to see the rest and ramp up in good time.

I wouldn't want to try to climb a mountain of spaghetti, and so I wouldn't want to leave that to someone else to do either.

### Team
A good team chemistry is essential, and with this will come better alignment on ideas and approaches to take to problems. This will bring about better productivity and knowledge sharing.

I like to be able to bounce ideas off someone when it comes to tackling a particular problem. This someone should have a mindset of taking joy in solving complex puzzles in a simple manner.

Outside stakeholders also appreciate taking time to come up with good solutions and nothing should be rushed. Tight deadlines should be a great rarity, and time should always be set aside to manage technical debt and spike new approaches.

Team members of all levels should be encouraged to explore. A project manager who wants to dabble in code should feel comfortable in doing so, with the willing help of an engineer.

A team member with an appreciation for other facets of the job will be more effective in their decision making, and a stronger camraderie will form between everyone.

Transparency, honesty and team spirit go hand in hand. Socialising is very important too.

### Growth
Personal growth is a huge motivator for me and I like to apply that to people I work with.

Sticking to the same tried and tested ways is good within reason, but some room must be made for continuous professional development.

Never throw anyone in at the deep end, but encourage those in a more junior position to participate in some tasks normally assigned to someone more senior.

A prime example would be to allow someone in a junior role to participate in a candidate interview and then the post de-briefing.

You never know what insights they can provide, and how much of a learning opportunity this is for them.

### Tools
Hardware is expensive. Fast hardware is even more so, but cheaper and slower hardware is the most expensive.

You might think you are saving by buying the machines with slower CPUs and less ram, but this speed impact is slowing work down and costing in the long run.

Those seconds added to build times really add up! Buy the best tools you can within reason. You don't need a €60,000 Mac Pro, but keep an eye out for the point of diminishing returns.

I have a 16" MacBook Pro with 32gb of ram and a Core i9 cpu. This is perfectly comfortable for me and I don't need to keep looking at my phone while waiting ten minutes for a build to run.

### Leaders
We work with you and trust in your experience and skills to steer the ship in the right direction. We are all equals and so should do the best for each other. Being honest and transparent goes very far.






