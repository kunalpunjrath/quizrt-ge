# Quiz RT 
Contains both packages: 
* Game Engine (gE) 
* Matching Engine (mE) 
 
## Package details
__gE__ contains _Game Engine_ code pointing to PORT: 3000  
__mE__ contains _Matching Engine_ code pointing to PORT: 3001  
__gE__ [swagger endpoints](http://localhost:3000/api-docs) 
 
## How to install 
___npm i___ from inside both packages to install dependencies 
 
## How to run 
* ___npm start___ from inside both packages to start local servers from 3000 & 3001  
* open browser & launch __http://localhost:3001/startgame__   
    -   Click 'Start Game' button as player atleat 2 times to begin game (post 20 secsonds of first player joining).
    On 4 clicks a game will start instantly.
 
### Events 
* "INITIATEGAME": "Client Event trigger to start game" 
* "GAMEID": "Server Event trigger on generating game ID" 
* "STARTQUIZ": "Client Event trigger to fetch questions" 
* "QUESTION": "Server Event trigger on sending across question" 
* "ENDGAME": "Client Event trigger to abruptly end game" 
 
### Design Doc 
Detailed design is present in [Design](https://www.draw.io/#Hkunalpunjrath%2Fquizrt-ge%2Fmaster%2FGameEngine) 
