module.exports.get_movielist=function(req,res){
    var db=req.db;
    var collection=db.get('usercollection');
    collection.find({},{},
        function(err,docs){
            res.render('display',{"movielist":docs});
        }
        );
        
};
module.exports.get_search=function(req,res){
    res.render('search');
}
function getMovie(req) {
    var movie = req.param('movieName');


    return movie;
}
module.exports.get_home=function(req,res){
    res.render('homepage');
}
module.exports.post_home=function(req,res){
    res.redirect('homepage');
}
module.exports.post_search=function(req,res){
    var db=req.db;
    var movie=getMovie(req);
    var collection=db.get('usercollection');
    collection.findOne({moviename:movie},
        function(err,doc){
            console.log(doc);
           
           if(err||doc==null){
               res.render('searchfail');
           }
           else{  
                res.render('showuser',{
                    title:'Show Movie :'+movie,
                    Genre:doc.Genre,
                    Rating:doc.Rating
                })
        }
            

        }
        );
};


module.exports.post_addmovie = function(req, res) 
{
    
    var db = req.db;
    
    var moviename = req.body.movieName;
    var genre = req.body.genre;
    var rating = req.body.rating;
    
    var collection = db.get('usercollection');
    collection.insert({ "moviename" : moviename,
                         "Genre" : genre,
                         "Rating" : rating
                       },function (err, doc) {
                           if (err) 
                             {
                               res.send("Insert failed.");
                              }
                           else 
                            {
                               res.render('addsuccess');
                           }
                       });
};

module.exports.get_addmovie=function(req,res){
    res.render('addmovie');
}

module.exports.post_deletemovie = function(req, res) 
{
    var moviename = req.body.movieName;
    var db = req.db;
    var collection = db.get('usercollection');

    collection.findOne({moviename:moviename},
        function(err,doc){
            console.log(doc);
        
        if(err||doc==null){
            res.render('searchfail');
        }});


    collection.remove( { "moviename" : moviename },
                       function (err, doc) 
                       {
                           if (err||doc==null) {
                               res.render('searchfail');
                           }
                           else {
                               res.render('deletesuccess');
                           }
                       });
};

module.exports.get_deletemovie = function(req, res) 
{
    var moviename = req.body.movieName;
    res.render('deletemovie', { "moviename" : moviename } );
};

module.exports.get_updatemovie = function(req, res) 
{
    
    res.render('updatemovie' );
};

module.exports.post_updatemovie = function(req, res) 
{
    var moviename = req.body.movieName;
    var genre = req.body.genre;
    var rating = req.body.rating;
    var db = req.db;
    var collection = db.get('usercollection');
    var myquery = { "moviename": moviename };
    console.log(genre);
    console.log(rating);
    if(genre=="" && rating!=""){
        var newvalues = { $set: {"Rating": rating } };
    }
    else if(rating=="" && genre!=""){
        var newvalues = { $set: {"Genre": genre } };
    }
    else if(rating==""&&genre==""){
        res.render('updatesuccess');
    }
    else{
        var newvalues = { $set: {"Genre": genre, "Rating": rating } };

    }
    collection.findOne({moviename:moviename},
        function(err,doc){
            console.log(doc);
           
           if(err||doc==null){
               res.render('searchfail');
           }});

    
    collection.update(myquery, newvalues, function(err, doc) 
                                            {
                                                if (err||doc==null) {
                                                             res.send("Update failed.");
                                                         }
                                               else {
                                                   res.render('updatesuccess');
                                               }
                                           });
};
