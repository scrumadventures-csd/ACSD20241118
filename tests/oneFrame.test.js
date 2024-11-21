const app = require("../server");
const supertest = require("supertest");
const { getRoll } = require("../functions/roll");
const { registerGame } = require("../functions/register");
const {Game, Frame, Roll} = require("../game/game");

//rolling 2 then a 4
test("getRoll(return one frame - value=24)", async () => {

    let id     = '';
    let myPins = 0;
    let frameTotal = 0;

    var game = null;
 
    id = await registerGame(10,10,2,"24");
    //Create New Game Object
    game = new Game(id);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("oneFrame.test Roll1 = " + myPins);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("oneFrame.test Roll2 = " + myPins);

    frameTotal = game.getScore();

    console.log("oneFrame.test Frame Total = " + frameTotal);

    expect(frameTotal == "6").toBe(true);
});

//rolling 6 then a 4
test("getRoll(return one frame - value=64)", async () => {

    let id     = '';
    let myPins = 0;
    let frameTotal = 0;

    var game = null;
 
    id = await registerGame(10,10,2,"64");
    //Create New Game Object
    game = new Game(id);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("oneFrame.test Roll1 = " + myPins);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("oneFrame.test Roll2 = " + myPins);

    frameTotal = game.getScore();

    console.log("oneFrame.test Frame Total = " + frameTotal);

    expect(frameTotal == "10").toBe(true);
});