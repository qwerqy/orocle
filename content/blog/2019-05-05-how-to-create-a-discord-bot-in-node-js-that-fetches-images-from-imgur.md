---
title: How to create a Discord bot in Node.js that fetches images from Imgur
tags:
  - node
  - ''
date: 2019-02-16T09:44:59.730Z
description: Learn how to create a Discord bot in Nodejs that fetches images from Imgur
---
<p>It's the weekend now and I just got back from a Chinese New Year party. I always thought of building my own Discord bot and have it in my Discord channel where it's convenient for us to request anything from it. I know there are <g class="gr_ gr_110 gr-alert gr_spell gr_inline_cards gr_run\_anim ContextualSpelling ins-del multiReplace" id="110" data-gr-id="110">alot</g> <g class="gr\_ gr_117 gr-alert gr_gramm gr_inline_cards gr_run\_anim Grammar replaceWithoutSep" id="117" data-gr-id="117">more</g> better Discord bots out there, <g class="gr\_ gr_118 gr-alert gr_gramm gr_inline_cards gr_run_anim Punctuation only-ins replaceWithoutSep" id="118" data-gr-id="118">however</g> I just felt having a bot that is built personally by me. It's like having my own child!</p>

<p>For the finished <g class="gr_ gr_111 gr-alert gr_gramm gr_inline_cards gr_run_anim Punctuation only-ins replaceWithoutSep" id="111" data-gr-id="111">project</g> you can head over to this <a href="https://github.com/qwerqy/battlev-discord-bot" target="_blank" rel="noopener"><g class="gr_ gr_103 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="103" data-gr-id="103">github</g> repo</a>.&nbsp;</p>

<h3><g class="gr_ gr_104 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="104" data-gr-id="104">Prequisites</g>:&nbsp;</h3>

<ol>

<li>Node.js. Get it <a href="https://nodejs.org">here</a>.</li>

<li>Text Editor (Notepad, Sublime Text, Atom, VSCode or any that you prefer)</li>

<li>A Discord account. Create one <a href="https://discord.com">here</a> if you haven't.</li>

<li>An Imgur account. Create one <a href="https://imgur.com">here</a> if you haven't.</li>

</ol>

<h3><strong>Getting Started:</strong></h3>

<p>Create a folder/directory anywhere of your choice &amp; name the project to your liking, for this guide, let's call it&nbsp;<strong>discord-bot</strong>.</p>

<p>If you are familiar with the terminal on OSX/Ubuntu, go<strong>&nbsp;</strong>to your preferred location and run the following:&nbsp;</p>

<pre class="language-undefined"><code>mkdir discord-bot &amp;&amp; cd discord-bot</code></pre>

<p>You will be brought into the folder/directory.</p>

<p>Next, assuming you have installed Node.js, let's initialize the folder with:</p>

<pre class="language-undefined"><code>npm init</code></pre>

<p>Once you've answered all the questions, there will be a new file created in your project folder called&nbsp;<strong>package.json</strong>&nbsp;and inside it will look something like this:</p>

<pre class="language-undefined"><code>{

  "name": "discord-bot",

  "version": "1.0.0",

  "description": "A discord bot",

  "main": "bot.js",

  "scripts": {

\    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"

  },

  "author": "&lt;Your Name Here&gt;",

  "license": "ISC",

}</code></pre>

<p></p>

<h3>Get Discord ID &amp; Secret</h3>

<p>Before we start coding the bot, let's get the&nbsp;<strong>Client_ID&nbsp;</strong>&amp;&nbsp;<strong>Client_Secret&nbsp;</strong>from Discord.</p>

<p>1. Go to the <a href="https://discordapp.com/developers/applications/me">developer's page</a> and click&nbsp;<strong>New Application.</strong></p>

<p><strong><img src="https://cdn.buttercms.com/Sst1QVQaScWeOJJytk57?webp" alt="undefined" width="696" height="403" /></strong></p>

<p>2. Name your bot and click <strong>Create.</strong></p>

<p>3. You will be directed into a panel where you can see your <g class="gr_ gr_108 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" id="108" data-gr-id="108">bot's</g> information. You may fill the description field to your liking. Save the&nbsp;<strong>CLIENT ID&nbsp;</strong>&amp;&nbsp;<strong>CLIENT SECRET</strong> as we will be using that.</p>

<p><img src="https://cdn.buttercms.com/Yr2UPYGLRxiOrgq6D6Nk?webp" alt="undefined" width="711" height="412" /></p>

<p>4. Click&nbsp;<strong>Bot&nbsp;</strong>on the left panel and click&nbsp;<strong>Add Bot.&nbsp;</strong>You will be prompt with a message, read it and then click&nbsp;<strong>Yes, do it!&nbsp;</strong>You will see a message saying <em>"A wild <g class="gr_ gr_105 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" id="105" data-gr-id="105">bot</g> has appeared!"&nbsp;</em>indicating you've successfully created a bot. Grab the&nbsp;<strong>TOKEN&nbsp;</strong>and save it with your other secrets to be used later.</p>

<p><img src="https://cdn.buttercms.com/mJnFpgWRwCnHKQgR337I?webp" alt="undefined" width="718" height="416" /></p>

<p><strong></strong></p>

<p>Now we have all 3 tokens needed from Discord which are<strong> CLIENT ID, CLIENT SECRET </strong>&amp;<strong> BOT TOKEN.&nbsp;</strong><g class="gr_ gr_113 gr-alert gr_gramm gr_inline_cards gr_run_anim Punctuation only-ins replaceWithoutSep" id="113" data-gr-id="113">Next</g> we will test the bot in your server. Create a server in Discord.</p>

<p>Once you have your server set up in Discord. Go back to your Developer panel and click&nbsp;<strong>OAuth2&nbsp;</strong>on the left panel. Under&nbsp;<strong>SCOPES,&nbsp;</strong>check <strong>bot</strong> and copy the URL. Open a new tab and paste the URL.</p>

<p><img src="https://cdn.buttercms.com/df7mUpiQlSgDhH9RjMkj?webp" alt="undefined" width="765" height="443" /></p>

<p>Add your bot to the server you created and click&nbsp;<strong>Authorize</strong>.</p>

<p><img src="https://cdn.buttercms.com/F1aBvv8FThCXksMyHaRp?webp" alt="undefined" width="828" height="608" /></p>

<p>You will see your bot pop into your server.&nbsp;</p>

<h3>Setup Imgur API&nbsp;</h3>

<p>Next, let's <g class="gr_ gr_106 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del" id="106" data-gr-id="106">setup</g> a Dev account with Imgur to get hold of our tokens. Head over to <a href="https://apidocs.imgur.com/#intro">Imgur API Docs</a> and follow the guide. You will need&nbsp;<strong>Postman</strong> to test the API endpoints but don't worry as that will be included in their guide.</p>

<p>By the end, you should get hold of 4 tokens:</p>

<ol>

<li>Refresh Token</li>

<li>Client ID</li>

<li>Client Secret</li>

<li>Postman Token</li>

</ol>

<h3>Programming the bot</h3>

<p>Assuming you have gotten all tokens needed, let's start building our bot.</p>

<p>Install these packages:</p>

<pre class="language-undefined"><code>npm i discord.js dotenv node-fetch --save</code></pre>

<p>Create the following files in your root directory:</p>

<p><em><strong>.env</strong></em></p>

<pre class="language-undefined"><code>DISCORD_CLIENT_ID="&lt;your discord client id&gt;"

DISCORD_SECRET="&lt;your discord secret&gt;"

POSTMAN_TOKEN="&lt;your postman token&gt;"

IMGUR_REFRESH_TOKEN="&lt;your imgur refresh token&gt;"

IMGUR_CLIENT_ID="&lt;your imgur client id&gt;"

IMGUR_CLIENT_SECRET="&lt;your imgur client secret&gt;"</code></pre>

<h4><em>bot.js</em></h4>

<pre class="language-javascript"><code>require("dotenv").config();

const Discord = require("discord.js");

const fetch = require("node-fetch");



// creates Client instance

const client = new Discord.Client();



client.on("ready", () =&gt; {

  console.log(\`Logged in as ${client.user.tag}!\`);

});



client.on("message", async msg =&gt; {

  // Sets commands that start with '!'

  if (msg.content.substring(0, 1) == "!") {

\    let args = msg.content.substring(1).split(" ");

\    let cmd = args\[0];

\    let q = args\[1];



\    args = args.splice(1);

\    switch (cmd) {

\    // !ping

\    case "ping":

\    msg.reply("pong!");

\    break;

\    case "help":

\    const embed = new Discord.RichEmbed({

\    title: "Need Help?",

\    color: 0xff0000,

\    description: "Commands:",

\    fields: [

\    {

\    name: "!ping",

\    value:

\    "To test bot. Successful test will result in a reply 'pong!"

\    },

\    {

\    name: "!imgur &lt;query&gt;",

\    value: "Search for an image on Imgur"

\    }

\    ]

\    });



\    msg.channel.send(embed);

\    break;

\    case "imgur":

\    // Fetch image from Imgur API

\    const options = {

\    method: "GET",

\    headers: {

\    "Postman-Token": process.env.POSTMAN_TOKEN,

\    "cache-control": "no-cache",

\    Authorization: \`Client-ID ${process.env.IMGUR_CLIENT_ID}\`

\    }

\    };



\    try {

\    const req = await fetch(

\    \`https://api.imgur.com/3/gallery/search/?q=${q}\`,

\    options

\    );

\    const res = await req.json();



\    function getRandom(max) {

\    return Math.floor(Math.random() * Math.floor(max));

\    }



\    let _data = res.data\[getRandom(res.data.length)];

\    let _gif = _data.images\[getRandom(_data.images.length)].link;

\    let parsedGif = new Discord.Attachment(_gif);

\    msg.reply(parsedGif);

\    } catch (err) {

\    console.log("Error occured: ", err);

\    msg.channel.send(

\    new Discord.RichEmbed({

\    title: "Your search returned empty!",

\    description: "eg. !imgur &lt;your search&gt;"

\    })

\    );

\    }

\    }

  }

});

client.login(process.env.DISCORD_SECRET);

</code></pre>

<p>And we're good to go. Let's test it out.</p>

<p>Start your bot from the root directory in the terminal:</p>

<pre class="language-undefined"><code>node bot.js</code></pre>

<p>You should see a message in your terminal like this:&nbsp;</p>

<pre class="language-undefined"><code>battlemachine:discord-bot amin$ node bot.js

Logged in as Discord Bot#XXXX!</code></pre>

<p>Now on your Discord server, type in&nbsp;<strong>!ping</strong> to test your bot. If all goes well, your bot will reply back with a "Pong!". Here you can see me testing my own bot.</p>

<p><img src="https://cdn.buttercms.com/1burN69Rp6L4oIAIgfBd?webp" alt="undefined" width="721" height="256" /></p>

<p></p>

<p>Okay good! Your bot is working, now for the real test, let's request an image from Imgur via your bot. Type&nbsp;<strong>!<g class="gr_ gr_107 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling" id="107" data-gr-id="107">imgur</g> cat&nbsp;</strong>and let's see if it will return a picture/video of a cat.</p>

<p><img src="https://cdn.buttercms.com/IARYdXJLSLyhXGRAmyeV?webp" alt="undefined" width="790" height="583" /></p>

<p>There you have it! The bot replied with a picture of a cat(sorta). You can play around with the code to your liking. I just have it choose a random data from the array and get the picture. So this means <g class="gr_ gr_126 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling multiReplace" id="126" data-gr-id="126">everytime</g> you request the same query again, it will always return a different picture of your query.&nbsp;</p>

<p></p>

<p>Congratulations! If everything went well, you have just created your own discord bot that can get images from Imgur! Feel free to add more codes in the future such as linking Youtube API to play video in your Voice Channel. The possibilities are endless!</p>

<p>Do check out the <a href="https://github.com/qwerqy/battlev-discord-bot"><g class="gr_ gr_109 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="109" data-gr-id="109">github</g> repo</a> on this. If you feel like contributing any features, send a PR! If you like the project, leave a Star!&nbsp;</p>

<p></p>
