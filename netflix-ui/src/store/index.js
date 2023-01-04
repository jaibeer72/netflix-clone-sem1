import axios from "axios";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, Server_API_Base, TMDB_BASE_URL } from "../utils/configs";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
    });
};
const getRawData = async (api, genres, paging = false) => {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
        const {
            data: { results },
        } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkApi) => {
    const { netflix: { genres },
    } = thunkApi.getState();
    return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
    //console.log(data);
});

export const fetchDataByGenre = createAsyncThunk("netflix/moviesByGenres", async ({ genere, type }, thunkApi) => {
    const { netflix: { genres },
    } = thunkApi.getState();
    console.log("in data ", genere, type);
    return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genere}`, genres);
    //console.log(data);
});

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    //console.log(genres); 
    return genres;
});

export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
        const {
            data: { movies },
        } = await axios.get(`${Server_API_Base}/api/user/liked/${email}`);
        return movies;
    }
);

export const getUserReccmondedMovies = createAsyncThunk(
    "netflix/getSuggested",
    async (email) => {
        const {
            data: { movies },
        } = await axios.get(`${Server_API_Base}/api/suggest/getSuggestions/${email}`);
        console.log(movies); 
        return movies;
    }
);

export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
      const {
        data: { movies },
      } = await axios.put(`${Server_API_Base}/api/user/delete`, {
        email,
        movieId,
      });
      //console.log(movies);
      return movies;
    }
  );

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getUserReccmondedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});


