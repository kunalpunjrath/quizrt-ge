# Quiz RT 
Contains both packages: 
Markup : * Game Engine (gE) 
         * Matching Engine (mE) 
 
## Package details
Markup : __gE__ contains _Game Engine_ code pointing to PORT: 3000 
Markup : __mE__ contains _Matching Engine_ code pointing to PORT: 3001 
Markup : __gE__ swagger end points [http://localhost:3000/api-docs] 
 
## How to install 
Markup : _npm i_ from inside both packages to install dependencies 
 
## How to run 
Markup : _npm start_ from inside both packages to start local servers from 3000 & 3001  
 
### Events 
Markup : * "INITIATEGAME": "Client Event trigger to start game" 
         * "GAMEID": "Server Event trigger on generating game ID" 
         * "STARTQUIZ": "Client Event trigger to fetch questions" 
         * "QUESTION": "Server Event trigger on sending across question" 
         * "ENDGAME": "Client Event trigger to abruptly end game" 
 
### Design Doc 
GameEngine (draw.io file) 
Detailed design is present in [https://www.draw.io/#Hkunalpunjrath%2Fquizrt-ge%2Fmaster%2FGameEngine] 
