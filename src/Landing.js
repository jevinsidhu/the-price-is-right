import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';
var database = firebase.database();
var gameData = database.ref('/')

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player1: false,
      player2: false
    }
  }

  componentDidMount = () => {
    gameData.child("game/").on('value', (snapshot) => {
       var data = snapshot.val()
       this.setState({player1: data["player1"].active})
       this.setState({player2: data["player2"].active})
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
      grid-template-rows: 140px 80px 80px 100px;
  `;

    const Header = styled.h1`
      font-size: 24px;
      color: #FFF;
      font-weight: 900;
      align-self: center;
      align-self: end;
      padding-bottom: 5px;
    `;

    const Description = styled.p`
        color: rgba(0,0,0,0.40);
        width: 450px;
        text-align: center;

        @media (max-width: 600px) {
          width: 300px;
        }
    `;

    const LinkedWrapper = styled.div`
        font-weight: 900;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        font-size: 20px;
        color: #fff;
        line-height: 100px;
        text-align: center;
        background: #7AACA6;
        box-shadow:0 0 20px rgba(0,0,0,.12);
    `;


    const Img = styled.img`
      width: 300px;
    `;

    var startLink;

    if(!this.state.player1) {
      startLink = (<Link to="/player1">
      <LinkedWrapper>PLAY</LinkedWrapper>
</Link>)
    } else {
      startLink = (<Link to="/player2">
      <LinkedWrapper>PLAY</LinkedWrapper>
</Link>)
    }


    

    return (
      <Wrapper>
        <Img alt="Logo" src="https://i.imgur.com/UC5hkx6.png"/>
        <Header>The Price is Right</Header>
        <Description>
          A game that pits you against your friend to select the correct bidding price of the top trending sneakers on StockX.
          </Description>
        {startLink}
      </Wrapper>
    )
  }
}

export default Landing;
