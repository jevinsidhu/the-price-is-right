import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';
var database = firebase.database();
var gameData = database.ref('/')

class Tie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Put the actual scores here
            score: this.props.location.score,
            friendScore: this.props.location.friendScore,
            id: this.props.location.id
        };

        this.resetGame =  this.resetGame.bind(this)
    }

    resetGame = () => {
        gameData.child(`game/`).update({
            gameOver: false,
            player1: {score: 0, turn: true, active: false},
            player2: {score: 0, turn: false, active: false},
            round: 1
          });
    }

    render() {
        const Wrapper = styled.div`
            border-top: 8px #7AACA6 solid;
            font-family: "Lato";
            background-color: #9DC2BE;
            height: 100%;
            display: grid;
            justify-content: center;
            justify-items: center;
            align-content: center;
            grid-template-rows: 80px 100px 35px 60px 100px;
        `;

        const Header = styled.h1`
            font-size: 24px;
            color: #FFF;
            font-weight: 900;
            padding: 10px;
            background-color: #7AACA6;
            align-self: center;
            text-transform: uppercase;
        `;

        const Score = styled.h3`
            color: rgba(0,0,0,0.25);
            font-size: 15px;
            text-transform: uppercase;
            font-weight: 900;
            padding-bottom: 5px;
        `;

        const Img = styled.img`
        width: 90px;
        `;

        const LinkedWrapper = styled.div`
            font-weight: 900;
            font-size: 16px;
            color: rgba(0,0,0,0.55);
            text-align: center;
            text-decoration: underline;
        `;

        var newGame;

        if(this.state.id === 1) {
            newGame = (
                <Link to="/player1" onClick={this.resetGame}>
                <LinkedWrapper>PLAY AGAIN</LinkedWrapper>
                </Link>
            )
        } else {
            newGame = (
                <Link to="/player2" onClick={this.resetGame}>
                <LinkedWrapper>PLAY AGAIN</LinkedWrapper>
                </Link>
            )
        }

        
        return (
            <Wrapper>
                <Img alt="crying" src="https://i.imgur.com/bTf4R47.png" />
                <Header>IT'S A TIE!</Header>
                <Score>YOUR SCORE IS: {this.state.score}</Score>
                <Score>YOUR FRIEND'S SCORE IS: {this.state.friendScore}</Score>
                {newGame}
            </Wrapper>
        )
    }
}

export default Tie;
