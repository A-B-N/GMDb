/*module.exports.get_movielist=function(req,res){
    var db=req.db;
    var collection=db.get('usercollection');
    collection.find({},{},
        function(err,docs){
            res.render('display',{"movielist":docs});
        }
        );
        
};
*/

module.exports.get_movielist = function(req, res) {

    res.render('movies');

};
module.exports.post_movielist = function(req, res) {
    res.render('movies');
}

module.exports.get_search = function(req, res) {
    res.render('search');
}

function getMovie(req) {
    var movie = req.param('movieName');


    return movie;
}
module.exports.get_home = function(req, res) {
    res.render('homepage');
}
module.exports.post_home = function(req, res) {
    res.redirect('homepage');
}
module.exports.post_search = function(req, res) {

    var movie = getMovie(req);

    collection.findOne({ original_title: movie },
        function(err, doc) {
            console.log(doc);

            if (err || doc == null) {
                res.render('searchfail');
            } else {
                res.render('showuser', {
                    title: 'Show Movie :' + movie,
                    Genre: doc.genres,
                    Rating: doc.vote_average
                })
            }


        }
    );
};


module.exports.post_addmovie = function(req, res)  {       
    var moviename = req.body.movieName;  
    var genre = req.body.genre;
    var rating = req.body.rating;    

    collection.insert({
        "original_title": moviename,
        "genres": genre,
        "vote_average": rating
    }, function(err, doc)  {              
        if (err) {                
            res.send("Insert failed.");              
        }              
        else {                
            res.render('addsuccess');              
        }            
    });
};

module.exports.get_addmovie = function(req, res) {
    res.render('addmovie');
}

module.exports.post_deletemovie = function(req, res)  {  
    var moviename = req.body.movieName;   


    collection.findOne({ original_title: moviename },
        function(err, doc) {
            console.log(doc);

            if (err || doc == null) {
                res.render('searchfail');
            }
        });


      
    collection.remove({ "original_title": moviename },             
        function(err, doc) {              
            if (err || doc == null) {                
                res.render('searchfail');              
            }              
            else {                
                res.render('deletesuccess');              
            }            
        });
};

module.exports.get_deletemovie = function(req, res)  {  
    var moviename = req.body.movieName;  
    res.render('deletemovie', { "original_title": moviename });
};

module.exports.get_updatemovie = function(req, res)  {    
    res.render('updatemovie');
};

module.exports.post_updatemovie = function(req, res)  {
    var moviename = req.body.movieName;
    var genre = req.body.genre;
    var rating = req.body.rating;  

    var myquery = { "original_title": moviename };
    console.log(genre);
    console.log(rating);
    if (genre == "" && rating != "") {
        var newvalues = { $set: { "vote_average": rating } };
    } else if (rating == "" && genre != "") {
        var newvalues = { $set: { "genres": genre } };
    } else if (rating == "" && genre == "") {
        res.render('updatesuccess');
    } else {
        var newvalues = { $set: { "genres": genre, "vote_average": rating } };

    }
    collection.findOne({ original_title: moviename },
        function(err, doc) {
            console.log(doc);

            if (err || doc == null) {
                res.render('searchfail');
            }
        });


    collection.update(myquery, newvalues, function(err, doc) {
        if (err || doc == null) {     
            res.send("Update failed.");   
        }              
        else {                
            res.render('updatesuccess');              
        }            
    });
};
module.exports.get_analytics = function(req, res) {
    res.render('analytics');
};
module.exports.post_analytics = function(req, res) {
    res.render('analytics');
};
module.exports.get_data = function(req, res) {
    var project = [];
    collection.find({}, { "_id": 0 }).toArray(function(err, docs) {
        if (err) throw err;
        for (i = 0; i < docs.length; i++) {
            project[i] = docs[i];
        }
        console.log(project);
        res.json(project);
    });
};