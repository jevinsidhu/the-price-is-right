import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Landing extends Component {
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

    return (
      <Wrapper>
        <Img alt="Logo" src="https://i.imgur.com/UC5hkx6.png"/>
        <Header>The Price is Right</Header>
        <Description>
          A game that pites you against your friend to guess the correct bidding price of the top trending sneakers on StockX.
          </Description>
        <Link to="/start">
          <LinkedWrapper>PLAY</LinkedWrapper>
        </Link>
      </Wrapper>
    )
  }
}

export default Landing;
