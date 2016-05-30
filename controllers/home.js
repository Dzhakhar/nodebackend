var template = require('../views/template-main');
var test_data = require('../model/test-data');

exports.get = function(req, res){
  var teamlist = test_data.teamlist;
  var strTeam = "",
    i = 0;

  for(i = 0; i < teamlist.count;){
    strTeam = strTeam + "<li>" + teamlist.teams[i].country + "</li>";
  }
}
