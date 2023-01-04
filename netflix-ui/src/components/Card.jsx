import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { IoPlayCircleSharp } from "react-icons/io5";
import axios from 'axios';
import { API_KEY, Server_API_Base, TMDB_BASE_URL } from "../utils/configs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from '../utils/firebase-config'
import { useDispatch } from 'react-redux';
import { removeMovieFromLiked } from "../store";

export default React.memo(function Card({ movieData, isLiked = false }) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currenUser) => {
        if (currenUser) setEmail(currenUser.email);
        else navigate("/login");

    });

    const addToList = async () => {
        try {
            await axios.post(`${Server_API_Base}/api/user/add`, { email, data: movieData });
        } catch (err) {
            console.log(err);
        }
    }

    const addToReccomendation = async () => {
        try {
            await axios.post(`${Server_API_Base}/api/suggest/like`, { email, data: movieData });
        } catch (err) {
            console.log(err);
        }
    }
    const removeFromReccomendation = async () => {
        try {
            await axios.put(`${Server_API_Base}/api/suggest/removeFromLiked`, { email, data: movieData });
        } catch (err) {
            console.log(err);
        }
    }

    const getVideo = async () => {
        try {
            const {
                data: { results },
            } = await axios.get(`${TMDB_BASE_URL}/movie/${movieData.id}/videos?api_key=${API_KEY}`, { email, data: movieData });
            results.forEach((vid)=>{
                if(vid.site === "YouTube")
                {
                    setVideo(vid.key);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container onMouseEnter={() => {setIsHovered(true); getVideo()}} onMouseLeave={() => setIsHovered(false)}>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movieImage" />
            {
                isHovered && (
                    <div className="hover">
                        <div className="image-video-container">
                            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="Movie" onClick={() => navigate(`/player/${video}`)} />
                            <iframe src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`} onClick={() => navigate(`/player/${video}`)} />
                        </div>
                        <div className="info-container flex column">
                            <h3 className="name" onClick={() => navigate(`/player/${video}`)}>
                                {movieData.name}
                            </h3>
                            <div className="icons flex j-between">
                                <div className="controles flex">
                                    <IoPlayCircleSharp title="play" onClick={() => navigate("/player")} />
                                    <RiThumbUpFill title="like" onClick={addToReccomendation}/>
                                    <RiThumbDownFill title="dislike" onClick={removeFromReccomendation}/>
                                    {
                                        isLiked ? (
                                            <BsCheck title="Remove From List" onClick={() => dispatch(removeMovieFromLiked({ movieId: movieData.id, email }))} />
                                        ) : (
                                            <AiOutlinePlus title="add to my list " onClick={addToList} />
                                        )
                                    }
                                </div>
                                <div className="info">
                                    <BiChevronDown title="More Info" />
                                    <div className="genres flex">
                                        <ul className="flex">
                                            {movieData.genres.map((genre) =>
                                                <li key={genre}>{genre}</li>
                                            )}</ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    )
});

const Container = styled.div`
    max-width: 230px;
    width: 230px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img{
        border-radius: 0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .hover{
        z-index: 99 ;
        height : max-content;
        width: 20rem;
        position: absolute;
        top: -18vh;
        left: 0;
        border-radius: 0.3rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 0.3 ease-in-out;
        .image-video-container{
            position: relative;
            height: 140px;
            img{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
            iframe{
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0; 
                z-index: 5;
                position: absolute;
            }
        }
        .info-container{
            padding: 1rem;
            gap: 0.5rem;
        }
        .icons{
            .controls{
                display: flex;
                gap: 1rem;
            }
            svg{
                font-size: 1rem; 
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover{
                    color: #b8b8b8;
                }
            }
        }
        .genres{
            ul {
                gap: 1rem;
                li{
                    padding-right: 0.7rem;
                    &:first-of-type{
                        list-style-type: none;
                    }
                }
            }
        }
    }
`;
