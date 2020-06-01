<h1>Getting started</h1>
<p>There are a few simple guidelines to follow to get started, if you have never coded in React Native, please take a look at the official docs for a quick start</p>
<p>In this project we are aiming to create a clone of a popular beer ordering app. The App is built in React Native and connects to a backend
APi using GraphQL/Prisma and Apollo, the backend server can be found in /server</p>
<p>To begin with git clone the repo, and cd into the dir. From there you can run npm/yarn install</p>
<p>Once installed, you can use expo start to open the expo client, in another terminal cd into server and run $node src/index.js
this will fire up the backend server</p>
<p>The typical process for adding components would be to create the component and then add a reference to it in components.js</p>
<p>From there you can then import the component into the main App.js, this presumes your component is going to be a screen view.</p>
<p>Other things to be aware of include the colors.js file, any time you use a color for styling please create it in the colors file so we can import it whenever it is needed.</p>