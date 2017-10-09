// This function will use the request library to programmatically fetch the list of contributors via HTTPS for the given repo.
// You may want to open up the code and instructions for the previous activity where you learned about and used request.
// request('https://sytantris.github.io/http-examples/', function(err, response, body) {
//     if (err) throw err;
//     console.log('Response Status Code:', response.statusCode);
// });
//

// ======================================================================================================================================
// INPUTS
// ======================================================================================================================================

var request = require('request');
var fs = require("fs");
require('dotenv').config();
var GITHUB_USER = `${process.env.GITHUB_USER}`;
var GITHUB_TOKEN = `${process.env.GITHUB_TOKEN}`;
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName) {

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
    var options = {
        url: requestURL,
        headers: {
            'User-Agent': "GitHub Avatar Downloader"
        }
    };

    request.get(options, function(error, response, body) {
        if (error) {
            throw error;
            console.log('Response Status Code', response.statusCode);
        } else {
            var data = JSON.parse(response.body);
            console.log(data);

        }
    });
}

getRepoContributors("jquery", "jquery");

// ==================================================================================================================

