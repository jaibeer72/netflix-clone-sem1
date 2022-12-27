import React , {useState}from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import SelectGenere from '../components/SelectGenere';

export default function TVShows() {
    const navigate = useNavigate(); 
    const [isScrolled, setIsScrolled] = useState(false); 
  
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded); 
    const movies = useSelector((state) => state.netflix.movies); 
    const genres = useSelector((state) => state.netflix.genres); 
    const dispatch = useDispatch(); 
  
    useEffect(() => {
    dispatch(getGenres())
    },[]); 
  
    useEffect(() => {
      if(genresLoaded) dispatch( fetchMovies({type: "tv"}));
    },[genresLoaded]);
  
    window.onscroll = ()=> { 
      setIsScrolled(window.scrollY === 0 ? false:true); 
      return () => (window.onscroll = null); 
    }
    onAuthStateChanged(firebaseAuth, (currenUser) => {
        //if (currenUser) navigate("/");
    
      });
  
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/> 
        </div>
        <div className="data">
            <SelectGenere genres = {genres} type = "tv"/>
            {
                movies.length ? <Slider movies = {movies}/> : 
                <NotAvailable/> 
            }
        </div>
    </Container>
  )
}

const Container = styled.div`
    .data{
        margin-top: 8rem;
        .not-available{
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }
`;