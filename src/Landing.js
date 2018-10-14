import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    const Wrapper = styled.div`
      font-family: "Lato";
      background-color: #9DC2BE;
      height: 100%;
      display: grid;
      justify-content: center;
      justify-items: center;
      grid-template-rows: 230px 100px 100px;
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

    const Linked = styled.h1`
      color: #FFF;
    `;

    const Img = styled.img`
      padding-top: 100px;
      width: 300px;
    `;

    return (
      <Wrapper>
        <Img src="https://i.imgur.com/JL5iiGd.png"/>
        <Header>The Price is Right</Header>
        <Link to="/start">
          <Linked> PLAY </Linked>
        </Link>
      </Wrapper>
    )
  }
}

export default Landing;
