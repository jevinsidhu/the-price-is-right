import React, { Component } from "react";
import styled from 'styled-components';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg: 0,
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
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let prices = [99, 110, 120, 200];
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
    }

    handleClick(bgColor, choice) {
        console.log(choice);
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

    render(){
        const Wrapper = styled.div`
            font-family: "Lato";
            background-color: #9DC2BE;
            color: #FFF;
            height: 100%;
            display: grid;
            justify-content: center;
            justify-items: center;
            grid-template-rows: 100px 250px 200px;
        `;

        const TitleWrapper = styled.div`
            background-color: #7AACA6;
            align-self: end;
            text-align: center;
            margin: 0 10px;
        `;

        const ImgWrapper = styled.div`
            align-self: end;
        `;

        const OptionsWrapper = styled.div`
            margin-top: 50px;
            display: grid;
            grid-template-columns: repeat(2, 100px);
            grid-template-rows: repeat(2, 75px);
            grid-gap: 15px;
        `;

        const Img = styled.img`
            width: 250px;
            border: 8px solid #78ACA6;
            border-radius: 6px;
        `;

        const Title = styled.h1`
            font-size: 16px;
            text-transform: uppercase;
            font-weight: 900;
            padding: 10px;
        `;

        const OptionButtonWrapper = styled.div`
            border: 2px solid #FFF;
            text-align: center;
            vertical-align: middle;
            align-self: center;
            padding: 15px 0;
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

        return(
            <Wrapper>
                <TitleWrapper>
                    <Title>adidas Yeezy Wave Runner 700 Solid Grey</Title>
                </TitleWrapper>
                <ImgWrapper>
                    <Img alt="yeezy" src="https://stockx-360.imgix.net/Adidas-Yeezy-Wave-Runner-700-Solid-Grey/Images/Adidas-Yeezy-Wave-Runner-700-Solid-Grey/Lv2/img36.jpg?auto=format,compress&w=1117&q=90" />
                </ImgWrapper>
                <OptionsWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor1 }} onClick={() => this.handleClick(1, this.state.bgToPrice['1'])} >
                        <Option>${this.state.bgToPrice['1']}</Option>
                    </OptionButtonWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor2 }} onClick={() => this.handleClick(2, this.state.bgToPrice['2'])} >
                        <Option>${this.state.bgToPrice['2']}</Option>
                    </OptionButtonWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor3 }} onClick={() => this.handleClick(3, this.state.bgToPrice['3'])} >
                        <Option>${this.state.bgToPrice['3']}</Option>
                    </OptionButtonWrapper>
                    <OptionButtonWrapper style={{ backgroundColor: this.state.bgColor4 }} onClick={() => this.handleClick(4, this.state.bgToPrice['4'])} >
                        <Option>${this.state.bgToPrice['4']}</Option>
                    </OptionButtonWrapper>
                </OptionsWrapper>
            </Wrapper>
        )

    }

}

export default Start;
