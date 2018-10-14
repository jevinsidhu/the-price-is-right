import React, { Component } from "react";
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import firebase from './firebase.js';
var database = firebase.database();
var gameData = database.ref('/')

class Waiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Put the actual scores here
            score: this.props.location.score,
            friendScore: this.props.location.friendScore,
            id: this.props.location.id,
            otherPlayerID: this.props.location.id === 1 ? 2 : 1,
            gameData: this.props.location.gameData
        };
    }

    componentDidMount = () => {
        gameData.on('value', (snapshot) => {
           var data = snapshot.val()
           this.setState({gameData: data.game})
        })
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
            grid-template-rows: 150px 35px 35px;
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

        if(this.state.gameData[`player${this.state.id}`].turn) {
            if(this.state.id === 1) {
                return ( <Redirect to="/player1"/> )
            } else {
                return ( <Redirect to="/player2"/> )
            }
        }

        if(this.state.gameData.gameOver) {

            var score = this.state.gameData[`player${this.state.id}`].score
            var friendScore = this.state.gameData[`player${this.state.otherPlayerID}`].score

            if(score > friendScore ) {
                return(
                    <Redirect to={{
                        pathname: '/winner',
                        score: score,
                        friendScore: friendScore,
                        id: this.state.id,
                    }} />
                )
            } else if (score === friendScore ) {
                return(
                    <Redirect to={{
                        pathname: '/tie',
                        score: score,
                        friendScore: friendScore,
                        id: this.state.id,
                    }} />
                )
            } else {
                return(
                    <Redirect to={{
                        pathname: '/loser',
                        score: score,
                        friendScore: friendScore,
                        id: this.state.id,
                    }} />
                )
            }
        }

        return (
            <Wrapper>
                <Header>WAITING FOR YOUR FRIEND...</Header>
                <Score>YOUR SCORE IS: {this.state.score}</Score>
                <Score>YOUR FRIEND'S SCORE IS: {this.state.friendScore}</Score>
            </Wrapper>
        )
    }
}

export default Waiting;
