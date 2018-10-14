import React, { Component } from "react";
import styled from 'styled-components'
import firebase from './firebase.js';
var database = firebase.database();
var gameData = database.ref('/')

const Image = styled.img`
  max-width: 300px;
`;


class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameData: undefined,
            id: this.props.isOne ? 1 : 2
        }
        this.handleWrong = this.handleWrong.bind(this)
        this.handleRight = this.handleRight.bind(this)
        this.handleReset = this.handleReset.bind(this)


    }

    componentDidMount = () => {

         gameData.on('value', (snapshot) => {
            var data = snapshot.val()
            this.setState({gameData: data.game})
            console.log(this.state.gameData.player1)
         })
    }

    handleWrong(e) {
        e.preventDefault();
        alert("Wrong!")

        var otherPlayerID;
        if(this.state.id === 1) {
            otherPlayerID = 2
        } else {
            otherPlayerID = 1

            if(this.state.gameData.round >= 10)  {
                gameData.child("game").update({
                    gameOver: true
                })
            }

            gameData.child("game").update({
                round: this.state.gameData.round + 1
            })

            fetch('https://shrouded-sea-47046.herokuapp.com/https://gateway.stockx.com/public/v1/browse?limit=200', { 
                method: 'GET', 
                headers: new Headers({
                  'x-api-key': "B1sR9t386d6UVO6aI7KRf91gLaUywqEK1TLBGsXv",
                  'Content-Type': 'application/json'
                }), 
              })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                var shoeNumber = Math.floor(Math.random() * (199 - 0)) + 0
                var wrongPrices = []
                for (let index = 0; index < 3; index++) {
                    console.log(shoeNumber)
                    var wrongPrice = data.Products[shoeNumber].market.lastSale + (Math.floor(Math.random() * (200 - -200)) -200)
                    while(wrongPrice < 0) {wrongPrice = data.Products[shoeNumber].market.lastSale + (Math.floor(Math.random() * (200 - -200)) -200) }
                    wrongPrices.push(wrongPrice)
                } 
                gameData.child(`game/shoe/`).update({
                        name: data.Products[shoeNumber].title,
                        price: data.Products[shoeNumber].market.lastSale,
                        image: data.Products[shoeNumber].media.imageUrl,
                        wrongPrices: wrongPrices
                  });
            });
        }

        gameData.child(`game/player${this.state.id}/`).update({
            turn: false
          });

          gameData.child(`game/player${otherPlayerID}/`).update({
            turn: true
          });
    }

    handleRight(e) {
        e.preventDefault();
        alert("Right!")

        var otherPlayerID;
        if(this.state.id === 1) {
            otherPlayerID = 2
        } else {
            otherPlayerID = 1

            if(this.state.gameData.round >= 10)  {
                gameData.child("game").update({
                    gameOver: true
                })
            }
            gameData.child("game").update({
                round: this.state.gameData.round + 1
            })

            fetch('https://shrouded-sea-47046.herokuapp.com/https://gateway.stockx.com/public/v1/browse?limit=200', { 
                method: 'GET', 
                headers: new Headers({
                  'x-api-key': "B1sR9t386d6UVO6aI7KRf91gLaUywqEK1TLBGsXv",
                  'Content-Type': 'application/json'
                }), 
              })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                var shoeNumber = Math.floor(Math.random() * (199 - 0)) + 0
                var wrongPrices = []
                for (let index = 0; index < 3; index++) {
                    var wrongPrice = data.Products[shoeNumber].market.lastSale + (Math.floor(Math.random() * (200 - -200)) -200)
                    wrongPrices.push(wrongPrice)
                } 
                gameData.child(`game/shoe/`).update({
                        name: data.Products[shoeNumber].title,
                        price: data.Products[shoeNumber].market.lastSale,
                        image: data.Products[shoeNumber].media.imageUrl,
                        wrongPrices: wrongPrices
                  });
            });
        }
        gameData.child(`game/player${this.state.id}/`).update({
            score: this.state.gameData[`player${this.state.id}`].score + 1,
            turn: false
          });

          gameData.child(`game/player${otherPlayerID}/`).update({
            turn: true
          });

    }

    handleReset(e) {
        e.preventDefault();

        gameData.child(`game/`).update({
            gameOver: false,
            player1: {score: 0, turn: true},
            player2: {score: 0, turn: false},
            round: 1
          });
    }

  render() {
      var playerTitle;


        if(this.props.isOne) {
            
            playerTitle = <h1> Player One </h1>
                
        } else {
            
              playerTitle = <h1> Player Two </h1>
            
        }

        if(this.state.gameData === undefined) {
            return(
            <div>
              {playerTitle}
          
                <p> Loading... </p>
          </div>
            )
        }
         
        else {

            if(this.state.gameData.gameOver) {
                var winner;
                if(this.state.gameData["player1"].score > this.state.gameData["player2"].score) {
                    winner = "one";
                } else if(this.state.gameData["player1"].score === this.state.gameData["player2"].score) {
                    winner = "tie"

                    return(
                    <div>
                    <h1> The game is a tie!</h1>
                    <h1> {this.state.gameData["player1"].score} - {this.state.gameData["player2"].score}</h1>
                    <button type="button" onClick={this.handleReset}> New Game? </button>
                    </div>
                    )
                }
                else {
                    winner = "two";
                }

                
                return(
                    <div>
                    <h1> The winner is player {winner}!</h1>
                    <h1> {this.state.gameData["player1"].score} - {this.state.gameData["player2"].score}</h1>
                    <button type="button" onClick={this.handleReset}> New Game? </button>

                    </div>
                    
                )
            }

            let active = (
                <div>
                     <h3>{this.state.gameData.shoe.name}</h3>
                     <Image src={this.state.gameData.shoe.image} alt="shoe"/>
                     <button type="button" onClick={this.handleWrong}>${this.state.gameData.shoe.wrongPrices[0]}</button>
                     <button type="button" onClick={this.handleWrong}>${this.state.gameData.shoe.wrongPrices[1]}</button>
                     <button type="button" onClick={this.handleWrong}>${this.state.gameData.shoe.wrongPrices[2]}</button>
                     <button type="button" onClick={this.handleRight}>${this.state.gameData.shoe.price}</button>

                 </div>
                 )

            if(this.state.gameData["player" + this.state.id].turn === false) {
                active = (<h2> Waiting for other players turn... </h2>)
            }

            return(
                <div>
                    {playerTitle}
                <p> Round {this.state.gameData.round} </p>
                <p> Score: {this.state.gameData["player" + this.state.id].score} </p>
            
                {active}
                
                </div>
                
            )
        }

     
  }
}

export default Player;