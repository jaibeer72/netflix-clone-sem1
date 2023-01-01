import React from 'react';
import styled from 'styled-components'; 
import {BsArrowLeft} from 'react-icons/bs'; 
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Player() {
    const navigate = useNavigate(); 

    let params = useParams(); 
    let vidId = params.id;

    // Preventing normal context menu so no one can download :P win! 
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
  return (
  <Container> 
    <div className="player">
        <div className="back">
            <BsArrowLeft onClick={() => navigate(-1)}/> 
        </div>
        <iframe src={`https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1`} autoPlay loop controls muted controlsList="nodownload"></iframe>
    </div>
  </Container>
  );
}

const Container = styled.div`
    .player{
        width: 100vw;
        height: 100vh;
        .back{ 
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg{
                font-size: 3rem;
                cursor: pointer;
            }
        }
        iframe{
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
`;