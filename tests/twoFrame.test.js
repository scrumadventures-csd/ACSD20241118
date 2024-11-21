const app = require("../server");
const supertest = require("supertest");
const { getRoll } = require("../functions/roll");
const { registerGame } = require("../functions/register");
const {Game, Frame, Roll} = require("../game/game");

//test for getting total of 2 frames rolling 2 then a 4
test("getRoll(return score for two frames - value=2444)", async () => {

    let id     = '';
    let myPins = 0;
    let frameTotal = 0;

    var game = null;
 
    id = await registerGame(10,10,2,"2444");
    //Create New Game Object
    game = new Game(id);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("twoFrame.test Roll1 = " + myPins);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("twoFrame.test Roll2 = " + myPins);

    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("twoFrame.test Roll3 = " + myPins);
    
    myPins = await getRoll(id);
    game.addRoll(myPins);
    console.log("twoFrame.test Roll4 = " + myPins);

    frameTotal = game.getScore();

    console.log("twoFrame.test Game Score = " + frameTotal);

    expect(frameTotal == "14").toBe(true);
});