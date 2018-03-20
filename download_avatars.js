var request = require('request');
var fs = require('fs');
var params = process.argv.slice(2);
var gitHubToken = require('./secrets.js');
console.log('Welcome to the GitHub Avatar Downloader!');

//sets Owner and Name to input from terminal
var repoOwner = params[0], repoName = params[1];

//this takes an url and downloads it to a given file path
function downloadImageByURL(url, filePath) {
  request.get(url)
          .on('error', function(err){
          console.log(err);
          throw err;
          })
          .on('response', function(response){
          console.log('Downloading image...');
          })
          .pipe(fs.createWriteStream(filePath))
          .on('finish', function() {
            console.log("Download complete.");
          });
}

//creates obj called options then find the url for each image and creates a unique file path then sends it to downloadImageByURl
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': gitHubToken.GITHUB_TOKEN
    },
    json: true
  };

  request(options, function(err, res, body) {
    body.forEach(function(contributor){
      var filepath = "avatars/" + contributor.login + ".jpg";
      downloadImageByURL(contributor.avatar_url, filepath);
    });
    cb(err, body);
  });
}


// this makes sure both inputs are present from the termina;
if(repoName === undefined){
    console.log("You need to enter both Owner and Repo names!");
  }else{
    getRepoContributors(repoName, repoOwner, function(err, result) {
      console.log("Errors:", err);
      console.log("Result:", result);
    });
};
