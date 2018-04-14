var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET feed page. */
router.get('/feed', function(req, res, next) {

    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            res.render('feed');
        }
    }catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
        }
});
/* Get about us page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
  });
  
  /* Get Leaderboard page */
  router.get('/premLeaderboard', function(req, res, next) {
  res.render('leaderboard/premLeaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/champLeaderboard', function(req, res, next) {
  res.render('leaderboard/champLeaderboard', { title: 'Express' });
});
/* Get Leaderboard page */
  router.get('/leagueTwoLeaderboard', function(req, res, next) {
  res.render('leaderboard/leagueTwoLeaderboard', { title: 'Express' });
});
/* Get Leaderboard page */
  router.get('/leagueOneLeaderboard', function(req, res, next) {
  res.render('leaderboard/leagueOneLeaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/ligue1Leaderboard', function(req, res, next) {
  res.render('leaderboard/ligue1Leaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/eredivisieLeaderboard', function(req, res, next) {
  res.render('leaderboard/eredivisieLeaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/ligaPortugalLeaderboard', function(req, res, next) {
  res.render('leaderboard/ligaPortugalLeaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/laLigaLeaderboard', function(req, res, next) {
  res.render('leaderboard/laLigaLeaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/SerieALeaderboard', function(req, res, next) {
  res.render('leaderboard/SerieALeaderboard', { title: 'Express' });
});

/* Get Leaderboard page */
  router.get('/bundesligaLeaderboard', function(req, res, next) {
  res.render('leaderboard/bundesligaLeaderboard', { title: 'Express' });
});

router.get('/Test', function(req, res, next) {
  res.render('Test', { title: 'Express' });
});


/* Get LiveScore page */
  router.get('/liveScore', function(req, res, next) {
  res.render('liveScore', { title: 'Express' });
});

/* Get upcoming Prem Matches page */
  router.get('/championshipFixtures', function(req, res, next) {
  res.render('fixtures/championshipFixtures', { title: 'Express' });
});

/* Get upcoming Prem Matches page */
  router.get('/leagueOneFixtures', function(req, res, next) {
  res.render('fixtures/leagueOneFixtures', { title: 'Express' });
});

/* Get upcoming Prem Matches page */
  router.get('/leagueTwoFixtures', function(req, res, next) {
  res.render('fixtures/leagueTwoFixtures', { title: 'Express' });
});

/* Get upcoming Prem Matches page */
  router.get('/bundesligaFixtures', function(req, res, next) {
  res.render('fixtures/bundesligaFixtures', { title: 'Express' });
});

/* Get upcoming Prem Matches page */
  router.get('/ligue1Fixtures', function(req, res, next) {
  res.render('fixtures/ligue1Fixtures', { title: 'Express' });
});
/* Get upcoming Prem Matches page */
  router.get('/premFixtures', function(req, res, next) {
  res.render('fixtures/premFixtures', { title: 'Express' });
});
/* Get upcoming Prem Matches page */
  router.get('/laLigaFixtures', function(req, res, next) {
  res.render('fixtures/laLigaFixtures', { title: 'Express' });
});
/* Get upcoming Prem Matches page */
  router.get('/SerieAfixtures', function(req, res, next) {
  res.render('fixtures/SerieAfixtures', { title: 'Express' });
});
/* Get upcoming Prem Matches page */
  router.get('/eredivisieFixtures', function(req, res, next) {
  res.render('fixtures/eredivisieFixtures', { title: 'Express' });
});
/* Get upcoming Prem Matches page */
  router.get('/ligaPortugalFixtures', function(req, res, next) {
  res.render('fixtures/ligaPortugalFixtures', { title: 'Express' });
});


router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Express' });
});

router.get('/support', function(req, res, next) {
  res.render('support', { title: 'Express' });
});

/**
 * Adds comments to our database
 */
router.post('/addComment', function(req, res, next) {   
    // Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});
/**
 * Returns all comments from our database
 */
router.get('/getComments', function(req, res, next) {

    Comment.find({}, function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});
/**
  Updates a comment already in the database
 */
router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/**
 * Deletes a comment from the database
 */
router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});

/*
 Verifies a JWT
 */
function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}



module.exports = router;
