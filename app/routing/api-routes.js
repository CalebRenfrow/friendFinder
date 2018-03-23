var friends = require("../data/friends.js");

module.exports = function(app){

  app.get("/api/friends", function(req,res){
    res.json(friends);
  })

  app.post("/api/friends", function(req,res){
    
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference:69
    };

    var newUser = req.body;
   

    var totalDif = 0;

    for (var i = 0; i <friends.length;i++){
      totalDif = 0;
      for (var j = 0; j <friends.length;j++){

        totalDif += Math.abs(parseInt(newUser.scores[j])-parseInt(friends[i].scores[j]))
     
        if(totalDif <= bestMatch.friendDifference){
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDif;
        }
      }
    }

    friends.push(newUser);
    res.json(bestMatch);
  });
}