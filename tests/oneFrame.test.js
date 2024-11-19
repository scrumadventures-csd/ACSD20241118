const app = require("../server");
const supertest = require("supertest");
const { getRoll } = require("../functions/roll");
const { registerGame } = require("../functions/register");

//rolling 2 then a 4
test("getRoll(return one ball - value=2)", async () => {

    let id     = await registerGame(10,10,2,"24");
    let myPins = await getRoll(id);

    console.log("My Pins = " + myPins);

    expect(myPins == "6").toBe(true);
});