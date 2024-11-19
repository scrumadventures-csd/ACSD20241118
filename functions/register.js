const axios = require("axios");

const registerGame = async (frames=10,pins=10,rolls=2,test="1234") => {
    //call pinsetter to register game
    let myUrl = '';

    myUrl = `http://pinsetter.herokuapp.com/pinsetter/?action=register&frames=${frames}&pins=${pins}&rolls=${rolls}&test=${test}`;
    console.log  ("[Register REQUEST:] " + myUrl)
    const res = await axios.get(myUrl);
    console.log  ("[Register RESPONSE:] " + res.data);

    return res.data;
};

module.exports = {
  registerGame,
};
