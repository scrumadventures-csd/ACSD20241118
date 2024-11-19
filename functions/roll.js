const axios = require("axios");

const getRoll = async (id) => {
    //call pinsetter action roll
    let myUrl = '';
    let pins = '';

    myUrl = `http://pinsetter.herokuapp.com/pinsetter/?action=roll&id=${id}`;
    console.log ("[Roll REQUEST:] " + myUrl)
    const res = await axios.get (myUrl);
    pins = String(res.data);
    console.log ("[Roll RESPONSE:] " + pins)

    return pins;

  };
  
  module.exports = {
    getRoll,
  };
  