---
title: >-
  Implementing SSR to a production React (CRA) product (Part 1: Setting up Babel
  Register & Override CRA script)
tags:
  - react
  - javascript
  - ''
date: 2019-02-21T09:46:23.656Z
description: >-
  There I was, trying to find out what the heck is SSR on google. I get server
  side rendering, that's basically what backend frameworks like Laravel and
  Rails do, but what do you mean with React? Isn't React already good enough?
  Turns out I was wrong. So I started studying ...
---
<p>There I was, trying to find out what the heck is <strong>SSR</strong> on google. I get server-side rendering, that's <strong>basically what backend frameworks like Laravel and Rails do</strong>, but what do you mean with React? <em>Isn't React already good enough?</em></p>

<p>Turns out I was wrong. So I started studying and researching about it. Guides after guides. Finally, I got a bit of a grasp on what it is.&nbsp;</p>

<p>The company I am working at now has very highly scaled products. Products that are meant to withstand the traffic they are getting every minute.</p>

<blockquote>

<p>So I figured, <em>"Cool, I get to maintain one of these products and learn how big projects like these were built like. How tough they are and what tools &amp; technologies are behind the driving force"</em></p>

</blockquote>

<p>I was appointed to the respondent product. This product is basically where our respondents/panel go to check their dashboard and do surveys, so you can expect this app gets very high traffic, daily.&nbsp;</p>

<p><strong>The product was built in React (with Typescript) as the front end, Koa as the API server framework &amp; MongoDB for the database</strong>. Sounds good. React, Koa, Mongo... RKM.&nbsp;<em>I can't make a word out of the 3 <g class="gr_ gr_170 gr-alert gr_gramm gr_inline_cards gr_run_anim Grammar multiReplace" id="170" data-gr-id="170">combine</g>. I tried.&nbsp;</em><strong>React has been ejected</strong>, so <strong>custom Webpacks</strong> were built to maintain the source code. At that time when I checked, the product was on <strong>React 15.5+</strong>.</p>

<p>I was given 2 tasks, which were upgrading it to the latest React module and un-eject it, which means <strong>get it to CRA 2.0</strong>, and then <strong>combining the API server and the client side into one with SSR</strong>.</p>

<blockquote>

<p>Ok...</p>

</blockquote>

<p>Sounds good enough. So in this article/post, I will be sharing with you <strong>how to integrate an existing React SPA project into a Universal app</strong>. Let's begin!</p>

<p>There are <strong>4 things that you need</strong> to prepare:</p>

<ul>

<li><strong>Babel Register module</strong></li>

<li><span style="text-decoration: line-through;"><strong>A react-script replacement called react-app-rewired &amp; customize-cra.</strong></span></li>

<li><strong>A middleware to render the incoming requests</strong></li>

<li><strong>A state management framework, in this case, we are using MobX for our React project.</strong></li>

<li><strong>A good understanding of the 3 things I mention above.</strong></li>

</ul>

<p>Now as we go through this journey of discovery, I assume you know all those things, If not, please gain a good grasp of the things you lack first, before proceeding. But if you are the type that learns fast, sure let's do this.</p>

<p>I will be breaking this guide into <strong>3 parts</strong>. Follow me on <a href="https://twitter.com/qwerqy_dev" rel="noopener" title="Twitter">Twitter</a> to get notified when the next part will come out:</p>

<ol>

<li><strong>Implementing SSR to a production React (CRA) product</strong> <strong>(Part 1: Setting up Babel Register &amp; Override CRA script)</strong></li>

<li><a href="https://aminroslan.com/posts/implementing-ssr-to-a-production-react-cra-product-part-2-setting-up-babel-register-override-cra-scr" title="Implementing SSR to a production React (CRA) product (Part 2: Creating a middleware to render &amp; SSR Enabled State Management Setup)">Implementing SSR to a production React (CRA) product (Part 2: Creating a middleware to render &amp; SSR Enabled State Management Setup)</a></li>

<li>Implementing SSR to a production React (CRA) product (Part 3: Finalizing the project) (Coming Soon)<strong></strong></li>

</ol>

<h2>Babel Register</h2>

<p>In this project we will be using a module from <strong>babel</strong> called&nbsp;</p>

<pre class="language-javascript"><code>@babel/register</code></pre>

<p>You may start to wonder, <em>"Why Babel? Why not just go ahead and compile our own Webpack with custom config?"</em>. That my friend is a good idea too. However, <strong>CRA comes built in with their own optimized Webpack config</strong>, which means, this <strong>saves us a lot of time</strong> rather than trying to figure own what type of plugins should we go for in building a Webpack. Remember, this is <strong>not a new project. </strong>This is upgrading an existing project that has been scaled up for <strong>more than 2 years</strong>.</p>

<p>Create a new file in the root<strong>&nbsp;</strong>folder of your server directory, call it&nbsp;<strong>bootstrap.js&nbsp;</strong>or whatever you want to call it. Let's have a look at how it looks like shall we?</p>

<pre class="language-javascript"><code>// server/bootstrap.js



const md5File = require("md5-file");

const path = require("path");



// Ignore CSS styles for loading.

const ignoreStyles = require("ignore-styles");

const register = ignoreStyles.default;



// Ignore image requests for loading.

const extensions = \[".gif", ".jpeg", ".jpg", ".png", ".svg"];



// Override the default style ignorer, also modifying all image requests

register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) =&gt; {

  if (!extensions.find(f =&gt; filename.endsWith(f))) {

\    // If we find a style

\    return ignoreStyles.noOp();

  } else {

\    // If we find an image

\    const hash = md5File.sync(filename).slice(0, 8);

\    const bn = path.basename(filename).replace(/(\.\w{3})$/, \`.${hash}$1\`);



\    mod.exports = \`/static/media/${bn}\`;

  }

});



require("@babel/register")({

  presets: [

\    [

\    "@babel/preset-env",

\    {

\    targets: {

\    node: "10"

\    }

\    }

\    ],

\    [

\    "@babel/preset-typescript",

\    {

\    isTSX: true,

\    allExtensions: true

\    }

\    ],

\    "@babel/preset-react"

  ],

  extensions: \[".js", ".jsx", ".ts", ".tsx"],

  plugins: [

\    \["@babel/plugin-proposal-decorators", { legacy: true }],

\    \["@babel/plugin-proposal-class-properties", { loose: true }],

\    "syntax-dynamic-import",

\    \["dynamic-import-node", { noInterop: true }],

\    "react-loadable/babel",

\    "@babel/plugin-transform-async-to-generator"

  ]

});

require.extensions\[".vcf"] = () =&gt; {};



require("@babel/polyfill");

require("./app");</code></pre>

<p>Now don't be scared! Don't just copy whatever that is in the file just yet. Let's go through one by one.</p>

<h3>Handling static files</h3>

<pre class="language-javascript"><code>const md5File = require("md5-file");

const path = require("path");



// Ignore CSS styles for loading.

const ignoreStyles = require("ignore-styles");

const register = ignoreStyles.default;



// Ignore image requests for loading.

const extensions = \[".gif", ".jpeg", ".jpg", ".png", ".svg"];



// Override the default style ignorer, also modifying all image requests

register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) =&gt; {

  if (!extensions.find(f =&gt; filename.endsWith(f))) {

\    // If we find a style

\    return ignoreStyles.noOp();

  } else {

\    // If we find an image

\    const hash = md5File.sync(filename).slice(0, 8);

\    const bn = path.basename(filename).replace(/(\.\w{3})$/, \`.${hash}$1\`);



\    mod.exports = \`/static/media/${bn}\`;

  }

});

// .....</code></pre>

<p>This section of the file is to <strong>handle the image parsing to be returned as something readable once it's rendered on the static page before hydration</strong>. Now I am not the best when it comes to explaining what's happening here, but basically, without these lines of codes, your images won't show properly on the static page render server side before the client hydrates the page. You can do your own personal touchup on the configs here, feel free to experiment around.</p>

<pre class="language-javascript"><code>//....

require("@babel/register")({

  presets: [

\    [

\    "@babel/preset-env",

\    {

\    targets: {

\    node: "10"

\    }

\    }

\    ],

\    [

\    "@babel/preset-typescript",

\    {

\    isTSX: true,

\    allExtensions: true

\    }

\    ],

\    "@babel/preset-react"

  ],

  extensions: \[".js", ".jsx", ".ts", ".tsx"],

  plugins: [

\    \["@babel/plugin-proposal-decorators", { legacy: true }],

\    \["@babel/plugin-proposal-class-properties", { loose: true }],

\    "syntax-dynamic-import",

\    \["dynamic-import-node", { noInterop: true }],

\    "react-loadable/babel",

\    "@babel/plugin-transform-async-to-generator"

  ]

});

require.extensions\[".vcf"] = () =&gt; {};



require("@babel/polyfill");

require("./app");</code></pre>

<p>This side of the script is where the heart of SSR lives. This is basically where you'll need to spend extra time in tweaking. I have <strong>3 presets</strong> set which are</p>

<ul>

<li><strong>@babel/preset-env&nbsp;</strong>- I set a custom option&nbsp;<strong>targets&nbsp;</strong>to&nbsp;<strong>node 10.&nbsp;</strong>This enables the ES6+ syntaxes we're using the project. We tested going from&nbsp;<strong>11 to 6</strong>, but for our project, the sweet spot was&nbsp;<strong>10</strong>. <a href="https://babeljs.io/docs/en/babel-preset-env" rel="noopener" title="babel preset env">Source</a></li>

<li><strong>@babel/preset-typescript&nbsp;</strong>- The project uses Typescript, and the component files are&nbsp;<strong>.tsx,&nbsp;</strong>so I enabled&nbsp;<strong><g class="gr_ gr_158 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="158" data-gr-id="158">isTSX</g></strong> &amp;&nbsp;<strong><g class="gr_ gr_159 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="159" data-gr-id="159">allExtensions</g></strong>. <a href="https://babeljs.io/docs/en/babel-preset-typescript" rel="noopener" title="babel preset typescript">Source</a></li>

<li><strong>@babel/preset-react&nbsp;</strong>- Pretty obvious in this situation, no custom options for this one. You need this preset for a React app. <a href="https://babeljs.io/docs/en/babel-preset-react" rel="noopener" title="babel preset react">Source</a></li>

</ul>

<p>I set&nbsp;<strong>extensions&nbsp;</strong>to an array of the file formats that exist in the app. Then for plugins, let's go through it.</p>

<ul>

<li><strong>@babel/plugin-proposal-decorators&nbsp;</strong>- In this project, we use decorators provided by MobX. I also have to include&nbsp;<strong><g class="gr_ gr_184 gr-alert gr_gramm gr_inline_cards gr_run_anim Grammar only-ins doubleReplace replaceWithoutSep" id="184" data-gr-id="184">legacy</g></strong> mode for certain decorators to work. <a href="https://www.npmjs.com/package/@babel/plugin-proposal-decorators" rel="noopener" title="plugin proposal decorators">Source</a></li>

<li><strong>@babel/plugin-proposal-class-properties&nbsp;</strong>- Set&nbsp;<strong>loose&nbsp;</strong>to true.&nbsp;<a href="https://www.npmjs.com/package/@babel/plugin-proposal-class-properties" rel="noopener" title="plugin proposal class properties">Source</a></li>

<li><strong>syntax-dynamic-import&nbsp;</strong>-&nbsp;<a href="https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import" rel="noopener" title="plugin syntax dynamic import">Source</a></li>

<li><strong>dynamic-import-node&nbsp;</strong>- Set&nbsp;<strong>noInterop</strong> to true. <a href="https://www.npmjs.com/package/babel-plugin-dynamic-import-node" rel="noopener" title="dynamic import node">Source</a></li>

<li><strong>react-loadable/babel&nbsp;</strong>- If you are planning to code-split, have this as well, in our case, this wasn't needed as we didn't need code-split.&nbsp;<a href="http://GitHub%20- jamiebuilds/react-loadable: A higher order component for ... https://github.com/jamiebuilds/react-loadable" rel="noopener" title="react loadable">Source</a></li>

<li><strong>@babel/plugin-transform-async-to-generator&nbsp;</strong>-&nbsp;<a href="http://babel/plugin-transform-async-to-generator%20&middot; Babel https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator" rel="noopener" title="transform async to generator">Source</a></li>

</ul>

<p>We included the&nbsp;<strong>.vcf</strong> extension for some files in our project, it's fine to not include this.</p>

<p>In our instance, we need&nbsp;<strong><a href="https://babeljs.io/docs/en/babel-polyfill" rel="noopener" title="babel polyfill">@babel/polyfill</a>&nbsp;</strong>for half of the functions included in this project. Lastly, you will need to require your server file where you set all your endpoints, authentications, etc. <strong>Basically, it's the file that starts your backend.&nbsp;</strong></p>

<p>Our app is not ready yet to start. So let's save the time tweaking the settings and continue onto the next step.</p>

<h2>Override CRA scripts</h2>

<h4>Continue doing this if you use decorators in your project. Since I use Mobx in this project, we require to have decorators enabled. CRA 2.0 doesn't come with that yet.&nbsp;</h4>

<p>Alright, in this step, it's quite straightforward, this is where we procure a module that enables us to <strong>override the CRA built-in Webpack config.</strong> CRA 2.0 is a beast! With built-in Typescript &amp; Webpack, but there are things we need to adjust in order to make the SSR process go smoothly. Before going forward, I assume you understand what are the modules we'll be needing.</p>

<ul>

<li><strong>react-app-rewired&nbsp;</strong>- <a href="https://github.com/timarney/react-app-rewired" rel="noopener" title="react app rewired">Source</a></li>

<li><strong>customize-cra&nbsp;</strong>- We need this second file because&nbsp;<strong>react-app-rewired&nbsp;alone does not support CRA 2.0</strong> (As of that moment). However, it still depends on&nbsp;<strong>react-app-rewired.&nbsp;</strong><a href="https://github.com/arackaf/customize-cra" rel="noopener" title="customize cra">Source</a></li>

</ul>

<p>Create a file in your CRA&nbsp;<strong>src&nbsp;</strong>file and call it&nbsp;<strong>config-overrides.js&nbsp;</strong>and take a look at how I did in mine.</p>

<pre class="language-javascript"><code>// src/config-overrides.js



const {

  override,

  addBabelPlugin,

  addDecoratorsLegacy,

  disableEsLint

} = require("customize-cra");



module.exports = override(

  addBabelPlugin("babel-plugin-styled-components"),

  addDecoratorsLegacy(),

  disableEsLint()

);</code></pre>

<p>As you can see, I pulled out some modules from&nbsp;<strong>customize-cra&nbsp;</strong>then create a custom module to be used when we init the scripts, will get to that later.</p>

<ul>

<li><strong>addBabelPlugin("babel-plugin-styled-components")&nbsp;</strong>- To add support on styled components when we init script.&nbsp;</li>

<li><strong>addDecoratorLegacy()&nbsp;</strong>- Need this to enable decorators legacy.</li>

<li><strong>disableEslint()&nbsp;</strong>- Disables CRA 2.0 built-in eslint so that it won't complain about the&nbsp;<em>unorthodox&nbsp;</em>method we are going to do.&nbsp;</li>

</ul>

<p>Next, let's customize your scripts in&nbsp;<strong>package.json</strong> to use the modified script.</p>

<pre class="language-javascript"><code>"scripts": {

\    "build": "react-app-rewired build", // this file here

\    "build:android": "...",

\    "server:android": "...",

\    "server:dev": "...",

\    "start:dev": "...",

\    "start:dev:android": "...",

\    "start": "node server/bootstrap.js"

  },</code></pre>

<p>Ignore the empty scripts I did that on purpose. On the&nbsp;<strong>build</strong> script it was initially&nbsp;<strong>react-script build</strong>, change the <strong>"react-script" </strong>to<strong> "react-app-rewired"</strong>.&nbsp;</p>

<p>And that's about it from my side. Have a look at their guides on how you can customize more.&nbsp;</p>

<p>Once you have set up these 2 things, you are prepared to face what's coming. Do remember, if anything happens when you are trying to start the project, refer to these 2 files because these 2 files are <strong>involved heavily in transpiling your whole project</strong>. But let's not worry about that now.&nbsp;</p>

<p>I will continue in the next post. On&nbsp;<strong>setting up the middleware&nbsp;</strong>and&nbsp;<strong>server-side state management.&nbsp;</strong>I will post on <a href="https://twitter.com/qwerqy_dev" rel="noopener" title="twitter">Twitter</a> when the next part of this guide to be out. Until then, this is Part 1. See you on the next one!</p>

<p>I will be breaking this guide into<strong> 3 parts</strong>. Follow me on <a href="https://twitter.com/qwerqy_dev" rel="noopener" title="twitter">Twitter</a> to get notified when the next part will come out:</p>

<ol>

<li><strong>Implementing SSR to a production React (CRA) product</strong> <strong>(Part 1: Setting up Babel Register &amp; Override CRA script)</strong></li>

<li><a href="https://aminroslan.com/posts/implementing-ssr-to-a-production-react-cra-product-part-2-setting-up-babel-register-override-cra-scr" title="Implementing SSR to a production React (CRA) product (Part 2: Creating a middleware to render &amp; SSR Enabled State Management Setup)">Implementing SSR to a production React (CRA) product (Part 2: Creating a middleware to render &amp; SSR Enabled State Management Setup)</a></li>

<li>Implementing SSR to a production React (CRA) product (Part 3: Finalizing the project) (Coming Soon!)</li>

</ol>
