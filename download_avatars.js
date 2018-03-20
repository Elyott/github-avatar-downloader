var request = require('request');
var fs = require('fs');
var GitHubToken = require('./secrets.js')
console.log(GitHubToken)
console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'GitHubToken'
    },
    json: true
  }

  request(options, function(err, res, body) {
    var data = body;
    data.forEach(function(contributor){
      console.log(contributor.avatar_url);
    });
    cb(err, body);
  });



};
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


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")