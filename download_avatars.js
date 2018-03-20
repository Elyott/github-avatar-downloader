var request = require('request');
var fs = require('fs');
var params = process.argv.slice(2);
var GitHubToken = require('./secrets.js')
console.log('Welcome to the GitHub Avatar Downloader!');

var repoOwner = params[0], repoName = params[1];

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


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GitHubToken.GITHUB_TOKEN
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

};


getRepoContributors(repoName, repoOwner, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
