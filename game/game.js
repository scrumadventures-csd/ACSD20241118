
class Game {
    maxRolls = 2;
    maxFrames = 10;
    id = "";
    frames;
    currentFrame = 1;
    currentRollInFrame = 1;
  
    constructor(id, maxFrames, maxRolls)
    {
      this.id = id;
      this.maxFrames = maxFrames;
      this.maxRolls = maxRolls;
      this.frames = new Array(maxFrames);
    }
  
    addRoll(pins)
    {
        let frame = this.getCurrentFrame();
        frame.addRoll(pins);

        this.currentRollInFrame++;

        if(this.currentRollInFrame > this.maxRolls)
        {
            this.currentRollInFrame = 1;
            this.currentFrame++;
        }
    }
  
    getCurrentFrame()
    {
      if (this.frames[this.currentFrame -1] == null)  
      {
        this.frames[this.currentFrame-1 ] = new Frame(); 
      }
      return this.frames[this.currentFrame -1];
    }
  
    getScore()
    {
        let score = 0;
        this.frames.forEach((e) => score += e.getScore())
        return score;
    }

    getFrameScore(index) {
        return this.frames[index].getScore();
    }
  }
  


  class Frame {
    rolls;
    constructor()
    {
      this.rolls = new Array();
    }
  
    addRoll(pins)
    {
      this.rolls.push(new Roll(pins));
    }
  
    getScore()
    {
        let score = 0;
        this.rolls.forEach((e) => score += e.pins)
        return score;
    }
  }
  



  class Roll {
    pins = 0;

    constructor(pins)
    {
      this.pins = pins;
    }
  }




  module.exports = {
    Roll,
    Frame,
    Game
  };
