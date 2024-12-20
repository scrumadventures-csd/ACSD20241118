const express = require("express");
const router = express.Router();
const mCache = require('memory-cache');

const { registerGame } = require("../../../functions/register");
const { getRoll } = require("../../../functions/roll");
//const { getGameScore, getFrameScore } = require("../../../functions/score");
const {Game, Frame, Roll} = require("../../../game/game");


var game = null;

//@route    GET api/mbc/register
//@desc     REGISTER a new game
//@access   Public
router.get("/register", async (req,res) => {
    try {
        //Register With Server
        let id = await registerGame(req.query.frames,req.query.pins,req.query.rolls,req.query.test);
        
        //Create New Game Object
        game = new Game(id);

        //Cache New Game Object
        mCache.put(id, JSON.stringify(game));
        mCache.put("ballInFrame", 0);
        mCache.put("frameNumber", 1);
        mCache.put("totalInFrame", 0);
        mCache.put("ball1", 0);
        mCache.put("ball2", 0);

        res.json({ id });
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server: Registration Error");
    }
});

//@route    GET api/mbc/roll
//@desc     GET pins for one ball
//@access   public
router.get("/roll", async (req, res) => {
    try {
        let counter = 0;
        let ballInFrame = mCache.get("ballInFrame");
        let totalInframe = mCache.get("totalInFrame");
        let frameNumber = mCache.get("frameNumber");
        let ball1 = mCache.get("ball1");
        let ball2 = mCache.get("ball2");
        ballInFrame = ballInFrame +1;

        let myPins = await getRoll(req.query.id);
        console.log("ballInFrame =>"+ballInFrame);
        console.log("totalInframe =>"+totalInframe);
        console.log("frameNumber=>"+frameNumber);

        if ( ballInFrame <= 1)
        {
            console.log("Ball1 pins dropped:" + myPins);
            ball1 = parseInt(myPins);
            ball2 = 0;
        }
        else if ( ballInFrame >= 2 )
        {
            console.log("Ball2 pins dropped:" + myPins);
            ball2 = parseInt(myPins);
        }
        else
        {
            console.log("Pins dropped:" + myPins);
        }

        var bullPins="";
        switch(myPins) {
            case "X":
            case "/":
                bullPins = 10;
                break;
            case "-":
                bullPins = 0;
                break;
            default:
                bullPins = parseInt(myPins);
        }
        
        
        if (myPins == "X") {
            game.addRoll(10);
        }
        else if (myPins == "/") {
            game.addRoll(10);
        }
        else if (myPins == "-") {
            game.addRoll(0);
        }
        else {
            game.addRoll(parseInt(myPins));
        }
        let pins = game.getScore();
        

        totalInframe = totalInframe + bullPins;
        if(ballInFrame>=2)
        {
            mCache.put("totalInFrame",0);
            mCache.put("frameNumber",frameNumber+1);
            mCache.put("ballInFrame",0);
        }
        else
        {
            mCache.put("totalInFrame",totalInframe);
            mCache.put("ballInFrame",ballInFrame);
        }

        //Display balls rolled 
        mCache.put("ball1",ball1);
        mCache.put("ball2",ball2);

        //res.json({ pins,frameNumber,ballInFrame,bullPins,myPins,totalInframe});
        res.json({ball1,ball2,pins,frameNumber,ballInFrame,bullPins,myPins,totalInframe});

    } 
    catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error");
    }
});

module.exports = router;
