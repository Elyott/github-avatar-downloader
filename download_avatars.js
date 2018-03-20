var request = require('request');
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


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});