import React, { Component } from "react";
import styled from 'styled-components'

class Landing extends Component {

  render() {
    const Wrapper = styled.div`
      background-color: #000;
      height: 100%;
      display: grid;
      gridTemplateColumns: 40px 40px 40px;
      gridTemplateRows: 40px 40px;
      justifyItems: center;
  `;

    const Header = styled.h1`
      color: #FFF;
    `;

    return (
      <Wrapper>
        <Header> Welcome to The Price is Right!</Header>
      </Wrapper>
    )
  }
}

export default Landing;