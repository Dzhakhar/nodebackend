var fs = require("fs");

exports.renderfile = function(path, obj, callback){
  var write = function(data){
    fs.writeFile(path, obj.name, function(err){
      if(err) throw err;
      console.log("success");
    })
  };

  fs.readFile(path, "utf8", function(err, data){
    console.log(data);
    write(data);
    callback();
  });
}
