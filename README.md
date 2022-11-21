# TechBot_
A discord bot designed to provide complete nonsense. 

It is mostly just a fun javascript playground for myself that intergrates into discrod.

# Features
   * Statistics:
      - Server logs
      - per user message count
      - Server-wide word count*
      - Message filtering
   * Avatar pull - get a users profile icon
   * Info - get user and server information

# How to setup
   Make a file called ```config.json``` and append the following information from discord developer portal
   ```
   // config.json
   {
       "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
       "guilds": ["XXXXXXXXXXXX", "XXXXXXXXXXXX"],
       "clientId": "XXXXXXXXXXXX"
   }
   ```
   Replace the "X"s with your own information. Guilds are a list so multiple discord servers can be added. 
   If there is only one guild use this format: ```"guilds": ["XXXXXXXXXXXX"]```
      
   Next if you don't have nodejs get it: https://nodejs.org/en/
   
   run ```npm update``` in the root to get pacakges required.
   
   Then launch the bot with ```node index.js``` and hope everything works!
   
