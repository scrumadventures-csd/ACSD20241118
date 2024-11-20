const app = require("../server");
const supertest = require("supertest");
const { getRoll } = require("../functions/roll");
const { registerGame } = require("../functions/register");

//rolling
test("getRoll(return one ball - value=2)", async () => {

    let id     = await registerGame(10,10,2,"2");
    let myPins = await getRoll(id);
    console.log("oneBall.test Pins Dropped = " + myPins);
    expect(myPins == "2").toBe(true);
});

test("getRoll(return one ball - value=4)", async () => {

    let id     = await registerGame(10,10,2,"4");
    let myPins = await getRoll(id);
    console.log("oneBall.test Pins Dropped = " + myPins);
    expect(myPins == "4").toBe(true);
});