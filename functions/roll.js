const axios = require("axios");

const getRoll = async (id) => {
    //call pinsetter action roll
    let myUrl = '';
    let pins = 0;

    myUrl = `http://pinsetter.herokuapp.com/pinsetter/?action=roll&id=${id}`;
    //console.log ("[Roll REQUEST:] " + myUrl)
    const res = await axios.get (myUrl);
    pins = parseInt(res.data, 10);
    console.log ("[Roll Pins Dropped:] " + pins)

    return pins;

  };
  
  module.exports = {
    getRoll,
  };
  