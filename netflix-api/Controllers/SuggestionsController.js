const Recon = require("../Models/SuggestionsModel"); 

module.exports.addToLikedReccomandation = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await Recon.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
            if (!movieAlreadyLiked) {
                await Recon.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the liked list." });
        } else await Recon.create({ email, likedMovies: [data] });
        return res.json({ msg: "Movie successfully added to liked list." });
    } catch (error) {
        return res.json({ msg: "Error adding movie to the liked list" });
    }
};

module.exports.removeFromLikedReccomandation = async (req, res) => {
    try {
      const { email, movieId } = req.body;
      const user = await Recon.findOne({ email });
      if (user) {
        const movies = user.likedMovies;
        const movieIndex = movies.findIndex(({ id }) => id === movieId);
        if (!movieIndex) {
          res.status(400).send({ msg: "Movie not found." });
        }
        movies.splice(movieIndex, 1);
        await Recon.findByIdAndUpdate(
          user._id,
          {
            likedMovies: movies,
          },
          { new: true }
        );
        return res.json({ msg: "Movie successfully removed.", movies });
      } else return res.json({ msg: "Recon with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error removing movie to the liked list" });
    }
  };

  module.exports.getSuggestedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const currentUser = await Recon.findOne({ email: email });
        if (currentUser) {
            Recon.find({"likedMovies":{"$in": currentUser.likedMovies}}).exec()
            .then(similarUsers => {
              // The "users" array contains the documents returned by the query
              let movieIdRankMap = new Map(); 
              let movieIdRMovieMap = new Map(); 

              for(var i = 0 ; i < similarUsers.length ; i++)
              { 
                similarUsers[i].likedMovies.forEach((movie) => {
                  if(movieIdRankMap.has(movie.id))
                  {
                    let rank = movieIdRankMap.get(movie.id); 
                    rank++; 
                    movieIdRankMap.set(movie.id,rank); 
                  }
                  else 
                  { 
                    movieIdRankMap.set(movie.id,1); 
                  }
                  // setting movies based on movie Id
                  movieIdRMovieMap.set(movie.id,movie);
                });
              } 
              
              // removing the users movies 
              currentUser.likedMovies.forEach((movie)=> {
                if(movieIdRankMap.has(movie.id))
                  movieIdRankMap.delete(movie.id); 
              }); 
  
              // ranking on popularity 
              const rankedMap = new Map([...movieIdRankMap.entries()].sort((a, b) => b[1] - a[1]));
            
              rankedMap.forEach((rank,movie) =>{
              console.log(`movieid : ${movie}  rank : ${rank}`); 
            });

            movieIdRMovieMap.forEach((rank,movie) =>{
              console.log(`movieid : ${movie}  rank : ${rank}`); 
            });
  
              let result =[]; 
              rankedMap.forEach((rank,movieId)=>{
                if(movieIdRMovieMap.has(movieId))
                  result.push(movieIdRMovieMap.get(movieId));
              })
            
  
              //console.log("similar uss ",similarUsers); 
              return res.json({ msg: "success", movies : result });
              
            })
            .catch(err => {
              // Handle any errors here
              return res.json({ msg: `Error fetching movie from the likedlist ${err}`  });
            });; 
        }
        else {
            return res.json({ msg: "error fetching movies" });
        }
    } catch (err) {
        return res.json({ msg: `Error fetching movie from the likedlist ${err}`  });
    }
}
