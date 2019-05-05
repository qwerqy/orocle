---
title: >-
  Implementing SSR to a production React (CRA) product (Part 2: Middleware &
  State Management)
date: 2019-02-24T09:47:46.794Z
description: >-
  Hello guys, welcome back! This is part 2 of the guide series on how to implent
  SSR to your ongoing production React product. Recap So in part 1 of the guide
  series, I showed you how I prepared the bootstrap file that will be the entry
  script to run our ...
---
<p>Hello guys, welcome back! This is part 2 of the guide series on <strong>how to implement SSR</strong> to your ongoing production React product.</p>

<h2>Recap</h2>

<p>So in part 1 of the guide series, I showed you how I prepared the <strong>bootstrap file</strong> that will be the entry script to run our project, and by using&nbsp;<strong>react-app-rewired&nbsp;</strong>how we can override the current CRA configs to enable some Webpack configs to work with SSR.</p>

<p>I will be breaking this guide into <strong>3 parts</strong>. Follow me on <a href="https://twitter.com/qwerqy_dev" rel="noopener" title="Twitter">Twitter</a> to get notified when the next part will come out:</p>

<ol>

<li><a href="https://aminroslan.com/posts/ssr-to-an-ongoing-production-react-product-part-1" rel="noopener" title="Implementing SSR to a production React (CRA) product (Part 1: Setting up Babel Register &amp; Override CRA script)">Implementing SSR to a production React (CRA) product (Part 1: Setting up Babel Register &amp; Override CRA script)</a></li>

<li><strong>Implementing SSR to a production React (CRA) product (Part 2: Creating a middleware to render &amp; SSR Enabled State Management Setup)</strong></li>

<li>Implementing SSR to a production React (CRA) product (Part 3: Finalizing the project) (Coming Soon)</li>

</ol>

<p>In this part, I will be sharing with you&nbsp;<strong>2 things:</strong></p>

<ol>

<li>Creating a middleware that will start the process of SSR.</li>

<li>State Management Setup, in this guide, we'll be using&nbsp;<a href="https://mobx.js.org/" target="_blank" rel="noopener" title="Mobx"><strong>Mobx</strong></a>&nbsp;as our state management framework.</li>

</ol>

<h2>Renderer Middleware</h2>

<p>Let's start off with creating a middleware that will be responsible for rendering all of our client-side code on the server side. Create a file <g class="gr_ gr_394 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="394" data-gr-id="394">called&nbsp;</g><code><strong>renderer.js</strong></code><g class="gr_ gr_394 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="394" data-gr-id="394"> and</g> place it in your&nbsp;<strong><code>middleware</code>&nbsp;</strong>folder.</p>

<p>Let's create an empty module to start off <g class="gr_ gr_733 gr-alert gr_gramm gr_inline_cards gr_run_anim Punctuation only-del replaceWithoutSep" id="733" data-gr-id="733">with,</g> since the project uses <strong>Koa for its backend</strong>, we'll mostly be using <strong>ctx</strong>.</p>

<pre class="language-javascript"><code>// middleware/renderer.js



import { StaticRouter } from "react-router-dom";

import { renderToString } from "react-dom/server";



// import our main Routes component. The main file for the project is routes.tsx

import Routes from "../../src/routes.tsx";



const path = require("path");

const fs = require("fs").promises;



// This is the module that will be responsible for most of the rendering.

export default async ctx =&gt; {

  const filePath = path.resolve("build", "index.html");

  let html = await fs.readFile(filePath, "utf8");



  let context = {};

  let component;



  try {

\    component = renderToString(

\    &lt;StaticRouter location={ctx.request.url} context={context}&gt;

\    &lt;Routes /&gt;

\    &lt;/StaticRouter&gt;

\    );

  } catch (err) {

\    // If something goes wrong with the component markup, this will light up.

\    console.log("Component Error: ", err.stack);

  }

  ctx.body = html

   .replace(

\    "&lt;/head&gt;",

\    \`&lt;script&gt;window.__INITIAL_STATE__ = ${dehydratedStore}; &lt;/script&gt;&lt;/head&gt;\`

   )

   .replace('&lt;div id="root"&gt;&lt;/div&gt;', \`&lt;div id="root"&gt;${component}&lt;/div&gt;\`);

};</code></pre>

<p>Okay, after cutting down most of the codes in this file, I manage to get the actual starting point from where I started when I was working on this project. We have a typical reusable middleware, let's go one by one on the stuff:</p>

<p>We use Node's built-in modules,&nbsp;<strong>fs&nbsp;</strong>and&nbsp;<strong>path&nbsp;</strong>(In this case, I am using an experimental module from&nbsp;<strong>fs&nbsp;</strong>which is async),&nbsp; and get the HTML that is generated when we run the build script.</p>

<pre class="language-javascript"><code>const filePath = path.resolve("build", "index.html");

let html = await fs.readFile(filePath, "utf8");</code></pre>

<p>Resolve the path <g class="gr_ gr_407 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="407" data-gr-id="407">to&nbsp;</g><code><strong>build/index.html</strong></code><g class="gr_ gr_407 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="407" data-gr-id="407"> .</g> If you don't see an&nbsp;<strong>index.html</strong> file in the&nbsp;<strong>build</strong> folder, <g class="gr_ gr_412 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="412" data-gr-id="412">run</g><code>&nbsp;<strong>npm run build</strong> </code><g class="gr_ gr_412 gr-alert gr_spell gr_inline_cards gr_disable_anim_appear ContextualSpelling ins-del multiReplace" id="412" data-gr-id="412">to</g> generate it.&nbsp;</p>

<p><strong>Secondly</strong>, we import&nbsp;<strong>StaticRendering&nbsp;</strong>from <strong>react-router-dom&nbsp;</strong>and&nbsp;<strong>renderToString</strong> from&nbsp;<strong>react-dom/server</strong> to be used in our HTML we create a component variable that consists of these following modules. We create it as such:</p>

<pre class="language-javascript"><code>const filePath = path.resolve("build", "index.html");

let html = await fs.readFile(filePath, "utf8");



let context = {};

let component;



try {

 component = renderToString(

\    &lt;StaticRouter location={ctx.request.url} context={context}&gt;

\    &lt;Routes /&gt;

\    &lt;/StaticRouter&gt;

 );

} catch (err) {

  // If something goes wrong with the component markup, this will light up.

  console.log("Component Error: ", err.stack);

}</code></pre>

<p>Based on the documentation from&nbsp;<strong>React Router</strong>, to enable rendering in server side, we use&nbsp;<strong>StaticRouter&nbsp;</strong>to render our routed components in the client-side to static lines of codes, this enables the project to render any pages inside of our Router component to static when we go from page to page. There are&nbsp;<strong>two props</strong> needed,&nbsp;<strong>location&nbsp;</strong>and <strong>context. </strong>put in&nbsp;<code><strong>ctx.request.url</strong> </code><g class="gr_ gr_480 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="480" data-gr-id="480">or&nbsp;</g><code><strong>ctx.url</strong></code><g class="gr_ gr_480 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="480" data-gr-id="480"> into</g> the <strong>location&nbsp;</strong>prop, and context as an empty object. This will be populated later when we actually use the renderer. Nested within the&nbsp;<strong>StaticRouter</strong> component will be the root file of our client-side app, in this case, is the <strong>Routes&nbsp;</strong>component. In your case, it can be&nbsp;<strong>App.js&nbsp;</strong>or usually, it's&nbsp;<strong>Index.js</strong> in most boilerplate CRA 2.0 app.</p>

<p>I place the logic inside of a <code><strong>try...catch</strong></code> function so that I can catch any errors related to SSR. This is really useful when you're in development. Once you have stabilized the renderer file, you can either remove it or just leave it as is in case you want to develop more stuff in it.</p>

<ul>

<li>Next, we'll send back a response body with the&nbsp;<strong>component&nbsp;</strong>and the&nbsp;<strong>HTML</strong> file.</li>

</ul>

<pre class="language-javascript"><code>ctx.body = html.replace('&lt;div id="root"&gt;&lt;/div&gt;', `&lt;div id="root"&gt;${component}&lt;/div&gt;`);</code></pre>

<p>I use <g class="gr_ gr_503 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="503" data-gr-id="503">the&nbsp;</g><code><strong>.replace</strong></code><g class="gr_ gr_503 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="503" data-gr-id="503"> method</g> which will add the component to the location I want. In this case, it's the div element with <g class="gr\_ gr_509 gr-alert gr_gramm gr_inline_cards gr_run\_anim Style multiReplace" id="509" data-gr-id="509"><g class="gr\_ gr_508 gr-alert gr_gramm gr_inline_cards gr_run_anim Grammar only-ins replaceWithoutSep" id="508" data-gr-id="508">id</g>&nbsp;</g><code><strong>root</strong></code><g class="gr_ gr_509 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="509" data-gr-id="509">.</g></p>

<p>Next, we'll go and add the middleware function into our controllers. I like to keep things neat, so in this project, I created separate folders for all the controllers needed in the server. Let's create the&nbsp;<strong>Index Controller</strong> and use it in our main server file.</p>

<pre class="language-javascript"><code>// controllers/index.js



import Router from "koa-router";

import serverRenderer from "../middleware/renderer";



const router = new Router();



router.get("/", serverRenderer);



export default router;</code></pre>

<p>Then in our server file.</p>

<pre class="language-javascript"><code>// server.js



import Koa from "koa";

import Router from "koa-router";

const serve = require("koa-static");



const koa = new Koa();

const router = new Router();



//....



// Root static page.

koa.use(indexController.routes());



//...



// Public Controllers

koa

  //... your other controllers

  // This is the static middleware.

  .use(

\    serve("build", {

\    hidden: true

\    })

  );



//...



// Renders other routes for SSR

koa.use(serverRenderer)



//...



// This is where your server listens to port..</code></pre>

<p>Make sure you are following this order when you are customizing your server file. Since Koa goes from top to bottom, it's important to have them in the correct position to reduce the errors that'll show later on as we progress.</p>

<p>Next, let's head over to the client-side and modify our entry file, in this project, it's <g class="gr_ gr_515 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="515" data-gr-id="515">in </g><code><strong>src/</strong></code><strong><code>index.tsx</code><g class="gr_ gr_515 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="515" data-gr-id="515">.</g></strong></p>

<pre class="language-javascript"><code>// src/index.tsx



//...declare imports



//...



ReactDOM.hydrate(

\    &lt;Router history={history}&gt;

\    &lt;Routes /&gt;

\    &lt;/Router&gt;,

  root

);</code></pre>

<p>Nothing much to change here, just change <g class="gr_ gr_530 gr-alert gr_gramm gr_inline_cards gr_run\_anim Style multiReplace" id="530" data-gr-id="530"><g class="gr\_ gr_529 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling multiReplace" id="529" data-gr-id="529">your</g>&nbsp;</g><strong><code>ReactDOM.render</code><g class="gr_ gr_530 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="530" data-gr-id="530">&nbsp;</g></strong><g class="gr\_ gr_530 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="530" data-gr-id="530"><g class="gr\_ gr_531 gr-alert gr_gramm gr_inline_cards gr_run\_anim Style multiReplace" id="531" data-gr-id="531">to</g></g><g class="gr\_ gr_531 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="531" data-gr-id="531">&nbsp;</g><strong><code>ReactDOM.hydrate</code><g class="gr_ gr_531 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="531" data-gr-id="531">.</g>&nbsp;</strong>This enables the client-side to take over the server-rendered static page once all of our JS files are loaded and set.</p>

<p>Lastly, before you start running your app, go to your<code><strong> package.json</strong></code> and add/modify the script you have that starts the server</p>

<pre class="language-javascript"><code>"scripts": {

  "build": "react-app-rewired build",

  "start": "node server/bootstrap.js"  //depending on where you put your bootstrap file, in this case i have it in my server folder.

}</code></pre>

<p>That is basically how I've set up the project that enables SSR. However, once you start your project, you are bound to get errors, so you can start debugging from there on, but believe me, once you've done debugging, you will understand more on how it all actually works.&nbsp;</p>

<p>Now, <g class="gr_ gr_550 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="550" data-gr-id="550">run&nbsp;</g><code><strong>npm run build &amp;&amp; npm run start</strong></code><g class="gr_ gr_550 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="550" data-gr-id="550"> and</g> see how it goes! If all goes well, you should start seeing your server listening to a port. Go to&nbsp;<strong>localhost:&lt;PORT&gt;&nbsp;</strong>and check your SSR app out!</p>

<p>If all works, great job! You've successfully integrated SSR into your project. However, it is not the end for me, since this project is quite big, it has to have a state management framework that runs above all, assuming you already have&nbsp;<strong>Mobx&nbsp;</strong>(or any other state management framework setup on the client-side), in the next step, I won't be showing you how to set it up from scratch, but on just how to enable it to work on the server-side.</p>

<h2>State Management on the Server-Side</h2>

<p>In this project, we are using&nbsp;<strong>Mobx</strong>&nbsp;as the state management framework. If you are not using&nbsp;<strong>Mobx&nbsp;</strong>as the state management framework, don't worry as we won't get into much detail on it. Regardless, they all bear the same logic, to have a global state stored somewhere in the HOC.</p>

<p>In Next.js, they have something called&nbsp;<strong>getInitialProps()</strong> where you can initialise the needed props before the client-side components hydrate in. This can include things like fetch, declaring new props and so on. In the next step, I will be doing the same thing, but better and modular.&nbsp;</p>

<p>In your&nbsp;<strong>renderer.js&nbsp;</strong>file, declare your&nbsp;<strong>Store</strong> and link it with a&nbsp;<strong>Provider&nbsp;</strong>component.&nbsp;</p>

<pre class="language-javascript"><code>export default async ctx =&gt; {

  // Initialize mobx store. Store will refresh everytime you jump

  // onto a new page or refreshing a page.

  const store = new AppStore();

  // Makes mobx work with SSR

  useStaticRendering(true);

  const filePath = path.resolve("build", "index.html");

  let html = await fs.readFile(filePath, "utf8");



  // ....



  // Dehydrate MobX store to be passed into client.

  const dehydratedStore = stringify(toJS(store));

  let context = {};

  let component;



  try {

\    component = renderToString(

\    &lt;Provider store={store}&gt;

\    &lt;StaticRouter location={ctx.request.url} context={context}&gt;

\    &lt;Routes /&gt;

\    &lt;/StaticRouter&gt;

\    &lt;/Provider&gt;

\    );

  } catch (err) {

\    // If something goes wrong with the component markup, this will light up.

\    console.log("Component Error: ", err.stack);

  }

  ctx.body = html

\    .replace(

\    "&lt;/head&gt;",

\    \`&lt;script&gt;window.__INITIAL_STATE__ = ${dehydratedStore}; &lt;/script&gt;&lt;/head&gt;\`

\    )

\    .replace('&lt;div id="root"&gt;&lt;/div&gt;', \`&lt;div id="root"&gt;${component}&lt;/div&gt;\`);

};</code></pre>

<p>Let's go one by one:</p>

<ul>

<li>I created a&nbsp;<strong>store&nbsp;</strong>variable.</li>

<li>I set&nbsp;<strong>useStaticRendering&nbsp;</strong>to true. This is exclusive to&nbsp;<strong>Mobx,</strong> please refer on how to do something similar with your prefered state management framework.</li>

<li>I wrap the component with a&nbsp;<strong>Provider&nbsp;</strong>component with one prop which is the&nbsp;<strong>store</strong>.</li>

<li>On the HTML, right before <g class="gr_ gr_854 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="854" data-gr-id="854">the&nbsp;</g><strong><code>&lt;/head&gt;</code><g class="gr_ gr_854 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="854" data-gr-id="854">&nbsp;</g></strong><g class="gr\_ gr_854 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="854" data-gr-id="854">tag</g>, <g class="gr\_ gr_603 gr-alert gr_tiny gr_spell gr_inline_cards gr_run\_anim ContextualSpelling multiReplace" id="603" data-gr-id="603">i</g> place a script <g class="gr\_ gr_862 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="862" data-gr-id="862">containing&nbsp;&nbsp;</g><strong><code>window.__INITIAL_STATE_\_</code><g class="gr\_ gr_862 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="862" data-gr-id="862">&nbsp;</g></strong><g class="gr\_ gr_862 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="862" data-gr-id="862">that</g> contains the dehydrated store we just created. This will be the transport of our server rendered props &amp; states to our client-side to hydrate. That being said, let's look at the client-side.</li>

</ul>

<pre class="language-javascript"><code>//...



const dehydratedStore = window.__INITIAL_STATE__;

// Rehydrate store

const root = document.getElementById("root") as HTMLElement;

const store = root.hasChildNodes()

  ? new AppStore(dehydratedStore)

  : new AppStore();



//...



ReactDOM.hydrate(

  &lt;Provider store={store}&gt;

\    &lt;Router history={history}&gt;

\    &lt;Routes /&gt;

\    &lt;/Router&gt;

  &lt;/Provider&gt;,

  root

);</code></pre>

<p>I grabbed <g class="gr_ gr_624 gr-alert gr_gramm gr_inline_cards gr_run\_anim Grammar only-del replaceWithoutSep" id="624" data-gr-id="624"><g class="gr\_ gr_626 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="626" data-gr-id="626">the&nbsp;</g></g><strong><code>window.__INITIAL_STATE_\_</code><g class="gr\_ gr_624 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Grammar only-del replaceWithoutSep" id="624" data-gr-id="624"><g class="gr\_ gr_626 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="626" data-gr-id="626">&nbsp;</g></g></strong><g class="gr\_ gr_624 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Grammar only-del replaceWithoutSep" id="624" data-gr-id="624"><g class="gr\_ gr_626 gr-alert gr_gramm gr_inline_cards gr_disable_anim\_appear Style multiReplace" id="626" data-gr-id="626"></g><g class="gr\_ gr_626 gr-alert gr_gramm gr_inline_cards gr_disable_anim_appear Style multiReplace" id="626" data-gr-id="626">and</g></g> place it in a variable called <strong>dehydratedStore.&nbsp;</strong>Then I replace the current AppStore state with the&nbsp;<strong>dehydratedStore.</strong> Moving on, we wrap our component with a&nbsp;<strong>Provider&nbsp;</strong>component. It is important to make sure the components are in the same order as the components in&nbsp;<strong>renderer.js</strong>.</p>

<pre class="language-javascript"><code>// In src/index.tsx



ReactDOM.hydrate(

  &lt;Provider store={store}&gt;

\    &lt;Router history={history}&gt;

\    &lt;Routes /&gt;

\    &lt;/Router&gt;

  &lt;/Provider&gt;,

  root

);





// in middleware/renderer.js



component = renderToString(

  &lt;Provider store={store}&gt;

\    &lt;StaticRouter location={ctx.request.url} context={context}&gt;

\    &lt;Routes /&gt;

\    &lt;/StaticRouter&gt;

  &lt;/Provider&gt;

);</code></pre>

<p>Lastly, in order for the Store to initialize the props properly, we need to add a constructor in the Store file. In this case, our project keeps all global state in&nbsp;<strong>app.store.tsx</strong></p>

<pre class="language-javascript"><code>class AppStore {

  // .... 



  constructor(initialState?) {

\    if (initialState) {

\    Object.assign(this, initialState);

\    }

  }



  // .....



}</code></pre>

<p>Let's add our little&nbsp;<strong>getInitialProps()</strong> logic into the mix. From here on, you should start on doing things based on what you want to be rendered on the server-side, in our case, we want information to be fetched even before the static page is rendered. This is so that we can eliminate a certain <em>loading screen.<strong> </strong></em>So I added a section in the <strong>renderer.js&nbsp;</strong>for&nbsp;<strong>plugins.</strong></p>

<h3>Plugins</h3>

<p>"Plugins" is really something I come up with out of the blue. It is where you can call your own custom functions to be executed on server-side for the client-side.</p>

<p>However, I will have to stop here. I will continue on how to write and create custom&nbsp;<strong>plugins</strong> that enable us to run functions on the server-side that will populate the store for our client-side, and perhaps eliminating the&nbsp;<em>loading screen<g class="gr_ gr_139 gr-alert gr_gramm gr_inline_cards gr_run_anim Style multiReplace" id="139" data-gr-id="139">... .</g>&nbsp;</em><em><strong></strong></em></p>

<p>Thank you for taking the time to read the guide. This the end of Part 2. I see you in Part 3!</p>

<p>I will be breaking this guide into <strong>3 parts</strong>. Follow me on <a href="https://twitter.com/qwerqy_dev" rel="noopener" title="Twitter">Twitter</a> to get notified when the next part will come out:</p>

<ol>

<li><a href="https://aminroslan.com/posts/ssr-to-an-ongoing-production-react-product-part-1" rel="noopener" title="Implementing SSR to a production React (CRA) product (Part 1: Setting up Babel Register &amp; Override CRA script)">Implementing SSR to a production React (CRA) product (Part 1: Setting up Babel Register &amp; Override CRA script)</a></li>

<li><strong>Implementing SSR to a production React (CRA) product (Part 2: Creating a middleware to render &amp; SSR Enabled State Management Setup)</strong></li>

<li>Implementing SSR to a production React (CRA) product (Part 3: Finalizing the project) (Coming Soon)</li>

</ol>
