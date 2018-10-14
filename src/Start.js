import React, { Component } from "react";
import styled from 'styled-components';
import Countdown from 'react-countdown-now';
import { Redirect } from 'react-router-dom';
import firebase from './firebase.js';
var database = firebase.database();
var gameData = database.ref('/')

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            round: 1,
            clicked: false,
            bg: 0,
            // Put the actual answer here
            answer: 99,
            bgColor1: '#7AACA6',
            bgColor2: '#7AACA6',
            bgColor3: '#7AACA6',
            bgColor4: '#7AACA6',
            bgToPrice: {
                1: null,
                2: null,
                3: null,
                4: null,
            },
            isLoading: true,
            id: this.props.isOne ? 1 : 2,
            otherPlayerID: this.props.isOne ? 2 : 1,
            correct: false

        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        gameData.child(`game/player${this.state.id}`).update({
            active: true
        })

        gameData.on('value', (snapshot) => {
            var data = snapshot.val()
            let prices = [data.game.shoe.price, data.game.shoe.wrongPrices[0], data.game.shoe.wrongPrices[1], data.game.shoe.wrongPrices[2]];
            let bgToPrice = {
            1: null,
            2: null,
            3: null,
            4: null,
        };

        let counter = 1;
        for (var i = prices.length - 1; i >= 0; i--) {
            const removedPrice = prices.splice(Math.floor(Math.random() * prices.length), 1);
            bgToPrice[counter] = removedPrice[0];
            if (removedPrice[0] === this.state.answer) {
                this.setState({ bg: counter});
            }
            counter +=1
        }

        this.setState({bgToPrice});
        this.setState({
            round: data.game.round
        })
        this.setState({gameData: data.game})
        this.setState({isLoading: false})
        this.setState({answer: data.game.shoe.price})

         })

        //  gameData.on('value', (snapshot) => {
        //     var data = snapshot.val()
        //     this.setState({gameData: data.game})
        //  })

        
    }

    handleClick(bgColor, choice) {
        console.log(choice);
        this.setState({clicked: true});
        if (!this.state.clicked) {
            if (choice === this.state.answer) {
                this.setState({correctionSelection: true});

                if (bgColor === 1) {
                    this.setState({ bgColor1: '#539d37'});
                }
                else if (bgColor === 2) {
                    this.setState({ bgColor2: '#539d37' });
                }
                else if (bgColor === 3) {
                    this.setState({ bgColor3: '#539d37' });
                }
                else {
                    this.setState({ bgColor4: '#539d37' });
                }

                    this.setState({correct: true})

            }
            else {
                if (this.state.bg === 1) {
                    this.setState({ bgColor1: '#539d37' });
                }
                else if (this.state.bg === 2) {
                    this.setState({ bgColor2: '#539d37' });
                }
                else if (this.state.bg === 3) {
                    this.setState({ bgColor3: '#539d37' });
                }
                else {
                    this.setState({ bgColor4: '#539d37' });
                }

                if (bgColor === 1) {
                    this.setState({ bgColor1: '#FF5A5F' });
                }
                else if (bgColor === 2) {
                    this.setState({ bgColor2: '#FF5A5F' });
                }
                else if (bgColor === 3) {
                    this.setState({ bgColor3: '#FF5A5F' });
                }
                else {
                    this.setState({ bgColor4: '#FF5A5F' });
                }

            }
        }
    }

    render(){
        const renderer = ({ seconds, completed }) => {
            if (completed) {



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

          if(this.state.correct) {
            gameData.child(`game/player${this.state.id}/`).update({
                score: this.state.gameData[`player${this.state.id}`].score + 1,
              });
          }

                var score = this.state.gameData[`player${this.state.id}`].score
                var friendScore = this.state.gameData[`player${this.state.otherPlayerID}`].score
                var id = this.state.id
                var gameDataPass = this.state.gameData
                return (
                    <Redirect to={{
                        pathname: '/waiting',
                        score: score,
                        friendScore: friendScore,
                        id: id,
                        gameData: gameDataPass
                    }} />
                )
            } else {
                return <Timer>{seconds} <TimerSpan>SECONDS</TimerSpan></Timer>;
            }
        };

        const Timer = styled.p`
            opacity: ${props => this.state.clicked ? '0' : '1'};
            color: rgba(0,0,0,0.25);
            font-size: 15px;
            text-transform: uppercase;
            font-weight: 900;
            padding-bottom: 5px;
        `;

        const TimerSpan = styled.span`
            font-size: 10px;
        `;

        const Wrapper = styled.div`
            border-top: 8px #7AACA6 solid;
            font-family: "Lato";
            background-color: #9DC2BE;
            color: #FFF;
            height: 100%;
            display: grid;
            justify-content: center;
            align-content: center;
            justify-items: center;
            grid-template-rows:30px 30px 100px 180px 200px;
        `;

        const TitleWrapper = styled.div`
            background-color: #7AACA6;
            align-self: center;
            text-align: center;
            margin: 0 10px;
            padding: 10px 15px;
            border-radius: 6px;
        `;

        const ImgWrapper = styled.div`
            align-self: end;
        `;

        const OptionsWrapper = styled.div`
            margin-top: 50px;
            display: grid;
            grid-template-columns: repeat(2, 120px);
            grid-template-rows: repeat(2, 75px);
            grid-gap: 15px;
        `;

        const Img = styled.img`
            width: 250px;
            border: 8px solid #78ACA6;
            border-radius: 6px;
        `;

        const Subtitle = styled.p`
            color: rgba(0,0,0,0.25);
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 900;
            padding-bottom: 5px;
        `;

        const Title = styled.h1`
            font-size: 20px;
            text-transform: capitalize;
            font-weight: 900;
        `;

        const OptionButtonWrapper = styled.div`
            border-radius: 6px;
            text-align: center;
            vertical-align: middle;
            align-self: center;
            padding: 15px 0;
            box-shadow:0 0 20px rgba(0,0,0,.12);
        `;

        const Option = styled.a`
            font-size: 20px;
            font-weight: 900;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        `;

        const Currency = styled.p`
            font-size: 10px;
            font-weight: 900;
            color: rgba(0,0,0,0.25);
            margin-top: 3px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        `;

        const RoundCounter = styled.p`
            color: rgba(0,0,0,0.25);
            font-size: 22px;
            text-transform: uppercase;
            font-weight: 900;
        `;

        if(this.state.isLoading) {
            return(<div></div>)
        }

        if(this.state.gameData[`player${this.state.id}`].turn === false) {
            var score = this.state.gameData[`player${this.state.id}`].score
            var friendScore = this.state.gameData[`player${this.state.otherPlayerID}`].score
            var id = this.state.id
            var gameDataPass = this.state.gameData
                return (
                    <Redirect to={{
                        pathname: '/waiting',
                        score: score,
                        friendScore: friendScore,
                        id: id,
                        gameData: gameDataPass
                    }} />
                )
        }

        return(
            <Wrapper>
                <RoundCounter>ROUND {this.state.round} / 10</RoundCounter>
                <Countdown
                    date={this.state.clicked ? Date.now() + 2000 : Date.now() + 10000}
                    renderer={renderer}
                />
                <TitleWrapper>
                    <Subtitle>Title:</Subtitle>
                    {/* Put the actual title here */}
                    <Title>{this.state.gameData.shoe.name}</Title>
                </TitleWrapper>
                <ImgWrapper>
                    {/* Put the actual image here */}
                    <Img alt="yeezy" src={this.state.gameData.shoe.image} />
                </ImgWrapper>
                <OptionsWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor1 }} onClick={() => this.handleClick(1, this.state.bgToPrice['1'])} >
                        <Option>${this.state.bgToPrice['1']}</Option>
                        <Currency>USD</Currency>
                    </OptionButtonWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor2 }} onClick={() => this.handleClick(2, this.state.bgToPrice['2'])} >
                        <Option>${this.state.bgToPrice['2']}</Option>
                        <Currency>USD</Currency>
                    </OptionButtonWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor3 }} onClick={() => this.handleClick(3, this.state.bgToPrice['3'])} >
                        <Option>${this.state.bgToPrice['3']}</Option>
                        <Currency>USD</Currency>
                    </OptionButtonWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor4 }} onClick={() => this.handleClick(4, this.state.bgToPrice['4'])} >
                        <Option>${this.state.bgToPrice['4']}</Option>
                        <Currency>USD</Currency>
                    </OptionButtonWrapper>
                </OptionsWrapper>
            </Wrapper>
        )

    }

}

export default Start;
