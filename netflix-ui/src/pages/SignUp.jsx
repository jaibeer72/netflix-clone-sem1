import React from 'react';
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/header';


export default function SignUp() {
    return (
        <Container>
            <BackgroundImage />
            <Header login/>
            <div className="content">
                
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1> Unlimited movies , TV shows and more</h1>
                        <h4> watch anywhere. Cancle anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <div className="form">
                        <input type="email" placeholder="Email Address" name="email" />
                        <input type="password" placeholder="Password" name="password" />
                        <button>Get Started</button>
                    </div>
                    <button>Log In</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    .content{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-columns: 15vh 85vh;
    }
`; 