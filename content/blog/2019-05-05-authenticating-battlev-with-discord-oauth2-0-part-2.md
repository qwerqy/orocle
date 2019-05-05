---
title: 'Authenticating Battlev with Discord OAuth2.0 [Part 2]'
date: 2019-04-04T09:50:24.498Z
description: >-
  Hello my fellow readers! I am back with exciting news! I managed to get the
  OAuth2.0 thing working to log in into the dashboard of my project Battlev. It
  was hard at first to be honest. It was actually the first time I'm
  implementing authentication on Nodejs based server. Thanks ...
---
<p>Hello my fellow readers! I am back with exciting news!</p>

<p>I managed to get the OAuth 2.0 <em>thing</em> working to log in into the dashboard of my project <strong>Battlev</strong>. It was hard at first to be honest. It was actually the first time I'm implementing authentication on a <strong>Nodejs-based</strong> server.</p>

<p>Thanks to the help of <a href="https://passportjs.org" target="_blank" rel="noopener" title="Passportjs"><strong>Passport.js</strong></a>, I don't have to go through the whole process of creating sessions on the server and client. With that being said, do note that the client-side and the server are both running in separate ports. Had trouble with CORS but I solved it. In this post, I will try my best to explain the steps I took to implement this authentication feature.</p>

<h2>Why OAuth 2.0?</h2>

<p>In case if any of you are wondering why I am going for an OAuth 2.0 type of authentication, is because of <strong>2 things</strong>:</p>

<ul>

<li>The core feature of this whole project is the Discord bot, so having an authentication with Discord is crucial if I am integrating the analytics dashboard for the user to check on user interactions with the bot on his servers.</li>

<li>I hate having to type in my password. I feel like most of you feel the same thing.&nbsp;</li>

</ul>

<p>In my current job, I work on the respondent's app, both web and mobile. I also take part in maintaining it's server. Throughout my job, I had to deal with problems involving user authentication via phone number, logging in via a magic link sent to a respondent's email, authenticating in between, exposed endpoints and so on. To clarify even more, I had no experience in doing this; the whole authentication system for a Nodejs back-end. Hell I don't even remember how I got a Google OAuth 2.0 feature working back when I was coding in Ruby.</p>

<p>Starting off, I created a simple Login button on the homepage of my Nuxt app (Client-side). Then I exposed an endpoint&nbsp;<code>/api</code>&nbsp;and later continued with me reading through <strong>Passport.js's</strong> documentation in its dark website. I went through the documentations for about half an hour until I can understand it fundamentally. Afterwards, I started reading through <strong>Discord's</strong> OAuth 2.0 documentation on <a href="https://discordapp.com/developers/docs/topics/oauth2#shared-resources" target="_blank" rel="noopener" title="shared resources"><strong>Shared Resources</strong></a>, the endpoints they exposed for <code>authorize</code>, <code>token handling</code> &amp; <code>token revoke</code>.</p>

<blockquote>

<p><em>I said to myself "This ain't too bad, I can do this."</em></p>

</blockquote>

<p>There I was, trying to create a working authentication system using one of <strong>Passport.js's strategy</strong>,&nbsp;<code>passport-oauth2</code> . I don't know why but I kept on getting errors saying some of the properties returned undefined. So maybe Discord's OAuth 2.0 strategy is a little different? So I tried creating a strategy on my own using<code> passport-custom</code>.</p>

<p>I spent about a good 3 hours working on the callback logic, then the storage of access token and refresh token. I went to guides after guides on the internet, checking out how others would approach it and then finally, I was done. Started to test it out, it works! Clicking the login will redirect me to the authorize access page, then I got brought back to the callback URL. However, something was wrong.</p>

<p>The session wasn't stored on the back-end. I tried checking <code>req.user</code> and it returned undefined. What's happening? I continued working on it for another 4 hours, while being idle on my Discord server's voice channel, but nothing changes. Took a break, went to sleep, go to work, back home again. Next!</p>

<p>This time, I went on and installed a module called <code>passport-discord-oauth2</code>. It wasn't made officially by Jared but it's by another programmer, <a href="https://github.com/RafaelVidaurre/passport-discord-oauth2" target="_blank" rel="noopener" title="Rafael Vidaurre">Rafael Vidaurre</a>. Downloads count looked good, heck why not. I set it up, commenting all of my previous custom strategy and gave it go.&nbsp;</p>

<p>Oh nice. It works! And since it's based on the <code>passport-oauth2</code>, I can just slap it on my callback endpoint without much code. It fits good. However, the problem still persists; session still not working. After about a few hours trying to find out the problem, I finally did. It was because my session cookie depended on the memory storage of my server, so whenever I restart the server, the memory gets erased in the process. I integrated <a href="https://redis.io/" target="_blank" rel="noopener" title="Redis">Redis</a> as the store for my session cookies, and that solved my problem.</p>

<p>I managed to also get the front-end to work by utilising the <code>window.document.cookie</code> method to identify if a user is logged in or not. I feel like it's a hack, but still, if it works, it stays.&nbsp;</p>

<p>Anyway to sum it all up, I managed to integrate it in 2 days, I am now working on integrating the dashboard. I see you guys on the next post!</p>
