const { addToLikedReccomandation, getSuggestedMovies, removeFromLikedReccomandation } = require("../Controllers/SuggestionsController");

const router = require("express").Router(); 

router.post("/like",addToLikedReccomandation); 
router.get("/getSuggestions/:email",getSuggestedMovies); 
router.put("/removeFromLiked",removeFromLikedReccomandation); 

module.exports = router; 