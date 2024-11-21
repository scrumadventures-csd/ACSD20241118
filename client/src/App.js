import './App.css';
import axios from 'axios';
import {useState} from 'react';

//import logo from './logo.svg';
import bowling from '../src/bowling.png';

// Configuration parameters
//let myServerRoot = "http://localhost:5000";
let myLocalMode = false;
let myClassDate = "20241118";
let myServerRoot = (myLocalMode)
    ? "http://localhost:5000"
    : `https://acsd${myClassDate}-b95715324c92.herokuapp.com/`;


function App() {
  const [gameId, setGameId] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [pins, setPins] = useState();
  const [ballPins, setBallPins] = useState(0);
  const [ballRolled, setBallRolled] = useState(false);
  const [name, setName] = useState("");
  const [frameNumber, setFrameNumber] = useState(0);
  const [myPins, setMyPins] = useState(0);
  const [ballNumber, setBallNumber] = useState(0);
  const [totalInframe, setTotalInframe] = useState(0);
  const [ball1, setball1] = useState(0);
  const [ball2, setball2] = useState(0);

  const startGame = e => {
    var myRegisterUrl = `${myServerRoot}/api/mbc/register`;
    //alert (myRegisterUrl);

    axios.get(myRegisterUrl).then(response => {
        //console.log(response.data);
        //alert (response.data);
        setGameId(response.data.id);
        setGameStarted(true);
        setball1(0);
        setball2(0);
        setTotalInframe(0);
        setPins(0);
        setFrameNumber(0);
    })
}

const rollOneBall = e => {
    var myRollUrl = `${myServerRoot}/api/mbc/roll?id=${gameId}`;
    //alert (myRollUrl);

    axios.get(myRollUrl).then(response => {
        console.log("[App.js Roll Response:] " + response.data)

        setBallRolled(true)
        setPins(response.data.pins)        
        setBallPins(response.data.bullPins)
        setFrameNumber(response.data.frameNumber)
        setBallNumber(response.data.ballInFrame)
        setMyPins(response.data.myPins)
        setTotalInframe(response.data.totalInframe)
        setball1(response.data.ball1)
        setball2(response.data.ball2)
    })
}

  return (
    <div className="App">
      {/*<img src={logo} className="App-logo" alt="logo" />*/}
      <img src={bowling} className="App-logo" alt="bowling" />
      <p>
          My Bowling Center
      </p>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>

        {!gameStarted && 
          <>
            <input size={50} onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name your game"
                    required
            />
            <>&nbsp;</>
            <button onClick={startGame}>Go!</button>
          </>
        }

        {gameStarted && 
          <>
            <button onClick={startGame}>Start New Game</button>
          </>
        }

        {gameStarted && <p>Welcome! to game: {name}</p>}
        {/*gameStarted && <p>Your game, {name}, has unique id which  {gameId}</p>*/}
        {gameStarted &&
            <>
                <button onClick={rollOneBall}>Roll Ball</button>
                {ballRolled && <p>Frame no:  {frameNumber}</p>}
                
                {ballRolled && 
                  <table>
                    <tr>
                        <th></th>
                        <th>Frame {frameNumber}</th>
                    </tr>
                    <tr>
                        <td>Ball1</td>
                        <td>{ball1}</td>
                    </tr>
                    <tr>
                        <td>Ball2</td>
                        <td>{ball2}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{totalInframe}</td>
                    </tr>
                    <tr>
                        <td>Game</td>
                        <td>{pins}</td>
                    </tr>
                  </table>
                }
                {ballRolled && <p>Ball no:  {ballNumber}</p>}
                {ballRolled && <p>You got {myPins}; That's a total of {ballPins} pins ! </p>}
                {ballRolled && <p>Your total in frame is: {totalInframe}</p>}
                {ballRolled && <p>Your total score is: {pins}</p>}

            </>
        }

      </div>
    </div>
  );
}

export default App;
