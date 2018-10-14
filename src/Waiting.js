import React, { Component } from "react";
import styled from 'styled-components';

class Waiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Put the actual scores here
            score: 0,
            friendScore: 0,
        };
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
