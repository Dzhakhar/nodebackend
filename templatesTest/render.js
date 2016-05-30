var fs = require("fs");
var team = "Juventus";

var render = function(){
	fs.readFile("test.html", "utf8", function(err, data){
		if(err) throw err;
		console.log(data);
	})
}

render();
