---
title: Refining the Battlev Project
date: 2019-03-24T09:48:56.716Z
description: >-
  Hello again, in this short blog post I will be sharing about my thoughts on
  one of my side projects, Battlev . (If you guys don't know what Battlev is,
  check out this post here .) For the past 1 month, I've setup a semi-production
  build of Battlev on Heroku ...
---
<p>Hello again, in this short blog post I will be sharing about my thoughts on one of my side projects, <strong><g class="gr_ gr_30 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="30" data-gr-id="30">Battlev</g></strong>.&nbsp;</p>

<p>(If you guys don't know what <g class="gr_ gr_32 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="32" data-gr-id="32">Battlev</g>&nbsp;is, check out this post <a href="https://aminroslan.com/posts/battlev" target="_blank" rel="noopener" title="battlev">here</a>.)</p>

<p>For the past 1 month, I've <g class="gr_ gr_28 gr-alert gr_spell gr_inline_cards gr_run\_anim ContextualSpelling ins-del" id="28" data-gr-id="28">setup</g> a semi-production build of <g class="gr\_ gr_33 gr-alert gr_spell gr_inline_cards gr_run\_anim ContextualSpelling ins-del multiReplace" id="33" data-gr-id="33">Battlev</g> on Heroku alongside it's landing page. There are two components, the page and the bot itself. For the bot, I've placed it in 4 servers where all of them are my friends'. The bot is mostly used for <g class="gr\_ gr_31 gr-alert gr_spell gr_inline_cards gr_run\_anim ContextualSpelling multiReplace" id="31" data-gr-id="31">it's</g> <g class="gr\_ gr_29 gr-alert gr_gramm gr_inline_cards gr_run_anim Grammar only-ins doubleReplace replaceWithoutSep" id="29" data-gr-id="29">ability</g> to play music in voice channels, and having light chats via the Cleverbot API integration. However, it only lasted until last week as my free dyno for this month has depleted. So I'm taking this project a bit further.&nbsp;</p>

<p>For the next iteration, I will extend this project with the knowledge I have by creating a proper <g class="gr_ gr_27 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="27" data-gr-id="27">webapp</g> for users to<strong> interact with the bot's config</strong>, and to <strong>see the logs of the bot interaction</strong> (on the user's server).</p>

<p><img src="https://cdn.buttercms.com/X90NvS2wQ1CPQNEtcZUF" alt="undefined" /></p>

<p>I plan on creating a <em>Microservices-based architecture within a Monolith Architecture.&nbsp;</em>I know&nbsp;this is a&nbsp;debatable&nbsp;topic,&nbsp;but&nbsp;it's basically a Monolith Architecture as a whole. I just like calling it microservices of how I define them. By this I mean, I will be having 3 directories in a single project, each with their own node modules and package.json. The project will be deployed in <strong>a single Docker container with a load balancer application.</strong> (I will be playing around with <a href="https://traefik.io/" target="_blank" rel="noopener" title="traefik"><g class="gr_ gr_35 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace" id="35" data-gr-id="35">Traefik</g></a>.).</p>

<p>There is a private Trello board for this project that I will use to keep track of the project.</p>

<p>I am planning to <strong>stream this project live on Twitch</strong> as I am doing it (<a href="https://twitch.tv/greencheese" target="_blank" rel="noopener" title="twitch">Channel</a>). It will mostly be on the weekend. I will also blog about the project bit by bit here on this blog. I hope everything goes well for this project!</p>

<p></p>
