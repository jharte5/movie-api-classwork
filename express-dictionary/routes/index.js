const express = require('express');
const router = express.Router();
const Movie = require('../lib/models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Express' });
});

router.get('/listings', (req, res) => {
  return res.render('listings', {title: 'Horror Movies'})
});

router.get('/showlistings', (req, res) => {
  // return res.send('Word Router Working');
  Movie.find({})
  .then((title) => {
    return res.status(200).json(title);
    // return res.render('viewDictionary', {words: words})
  })
  .catch(err => res.status(500).json({ message: 'Server Error', err }));
});

// update a movie
// params has to include ':' and same name as 'title'
router.put('/:title', (req,res) => {
  // find a word based on parameters
    Movie.findOne({title:req.params.title})
    .then((title) => {
      if(title){
        // redefine synopsis
        title.synopsis = req.body.synopsis ? req.body.synopsis : title.synopsis;
        //  save new synopsis
        title.save().then(updated => {
          return res.status(200).json({message: 'Synopsis updated', updated })
        }).catch(err=> res.status(400).json({message: 'Synopsis not updated', err }));
      } else {
        res.status(200).json({ message: 'Cannot find movie'});
      }
    }).catch(err => res.status(500).json({ message: 'Server Error', err})) 
  });


router.post('/addlisting', (req, res) => {
  // /validate input
  if (!req.body.title) {
    res.status(400).json({ message: 'All inputs must be filled' });
  }


 // check to see if movie exists
  Movie.findOne({title:req.body.title}).then((title) =>{
    if (title) {
      return res.status(403).json({ message: 'movie already exists'})
    } 
    // instantiate new movie
    const newMovie = new Movie();

    //add info to movie object
    newMovie.title = req.body.title,
    newMovie.synopsis = req.body.synopsis,
    newMovie.releaseYear = req.body.releaseYear
    console.log(newMovie)
    //save movie
    newMovie.save().then(title=> {
      return res.status(200).json({ message: 'Movie added', title: title });
    })
    .catch(err => res.status(500).json({message: 'oops Server Error', err}))
  })
  .catch(err =>  res.status(500).json({message: 'Server Error', err}))
});

//  when post is completed, check in postman ->


// delete a word
router.delete('/:title', (req, res)=> {
  Movie.findOneAndDelete({title:req.params.title}).then((title)=> {
    if(title) {
      return res.status(200).json({message: 'Movie deleted', title})
    } else {
      return res.status(400).json({messgae: 'No movie to delete'});
    }
  }).catch(err => res.status(400).json({message: 'Movie Not Deleted', err}));
});
module.exports = router;
