# TechBot_
A discord bot designed to provide complete nonsense. 

It is mostly just a fun javascript playground for myself that intergrates into discrod.

# Features
   * Statistics:
      - Server logs
      - per user message count
      - Server-wide word count*
      - Message filtering
   * Score - User activity score (messages sent)
   * Avatar pull - get a users profile icon
   * Info - get user and server information
   * Audio player - Play an audio source into a voice channel.
   * Playlist manager - Create playlists (play via audio player)

# Will-Do
    * Better first time setup.

# How to setup
   Make a file called ```config.json``` and append the following information from discord developer portal
   ```
   // config.json
   {
       "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
       "clientId": "XXXXXXXXXXXX"
   }
   ```
   Replace the "X"s with your own information.
      
   Next if you don't have nodejs get it: https://nodejs.org/en/
   
   run ```npm update``` in the root to get pacakges required.
   
   Then launch the bot with ```node index.js``` and hope everything works!
   
