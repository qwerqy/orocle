---
title: 'Authenticating Battlev with Discord OAuth2.0 [ Part 1 ]'
date: 2019-04-02T09:49:46.051Z
description: >-
  This is the first progress post on the Battlev project. I am about halfway
  done on solidifying the auth system. All the authentications are being done in
  the backend. Starts off by calling the /login endpoint on the front-end. This
  will redirect the page to Discord's Base authorization page where ...
---
This is the first progress post on the Battlev project. I am about halfway done on solidifying the auth system. All the authentications are being done in the backend. 



Starts off by calling the /login endpoint on the front-end. This will redirect the page to Discord's Base authorization page where the user will have to authorize the app, in result, they will redirect back via the callback URL, with a response that includes 2 important tokens in which I will use as a way to authenticate the user's session. Hmmm...



I may have a solution for this, but I will need to draw it down.
