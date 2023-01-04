import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../utils/firebase-config';
import { getUserReccmondedMovies } from "../store";
import CardSlider from './CardSlider'

export default React.memo( function Slider({movies}) {

    const reccmondedMovies = useSelector((state) => state.netflix.reccmonded);
    const dispatch = useDispatch();

    const getMoviesFromRange =(from,to) => {
        return movies.slice(from,to); 
    }
    const navigate = useNavigate();

    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
    });

    

    useEffect(() => {
      if (email) {
        dispatch(getUserReccmondedMovies(email));
      }

    }, [email]);
    
  return (
    <div> 
      {!(reccmondedMovies && reccmondedMovies.length >=5) ? "" : <CardSlider title = "Suggested" data={reccmondedMovies.slice(0,10)}/>}
    <CardSlider title = "Trending Now" data={getMoviesFromRange(0,10)}/>
    <CardSlider title = "New Releases" data={getMoviesFromRange(10,20)}/>
    <CardSlider title = "Blockbuster Movies" data={getMoviesFromRange(20,30)}/>
    <CardSlider title = "Popular Now" data={getMoviesFromRange(30,40)}/>
    <CardSlider title = "Action" data={getMoviesFromRange(40,50)}/>
    <CardSlider title = "Epics" data={getMoviesFromRange(50,60)}/>
    </div>
  )
});
