// This function will use the request library to programmatically fetch the list of contributors via HTTPS for the given repo.
// You may want to open up the code and instructions for the previous activity where you learned about and used request.
//
// repoOwner and repoName should be strings passed in as command line arguments. eg: node download_avatars.js "jquery" "jquery"

// ======================================================================================================================================
// INPUTS
// ======================================================================================================================================

if (process.argv[2] === undefined){
    console.error("Please enter the username of the GitHub repository owner and the Github repository.");
    return;
} else if (process.argv[3] === undefined){
    console.error("Please enter the name of the GitHub repository.");
    return;
}

'use_strict'
var request = require('request');
var fs = require("fs");
require('dotenv').config();
var GITHUB_USER = `${process.env.GITHUB_USER}`;
var GITHUB_TOKEN = `${process.env.GITHUB_TOKEN}`;
console.log('Welcome to the GitHub Avatar Downloader!');

// ======================================================================================================================================
// MAIN FUNCTION
// ======================================================================================================================================

function getRepoContributors(repoOwner, repoName, callback) {

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
        } else {
            var data = JSON.parse(response.body);
            for (let LOGIN in data)
                callback(data[LOGIN].avatar_url, data[LOGIN].login, "./avatars");

        }
    });
}

// ======================================================================================================================================
// Download images to avatar folder
// ======================================================================================================================================

function downloadImageByURL(url, login, path) {
    request.get(url)
        .on("response", function (response, body) {
            var filePath = path + "/avatar" + "_"+ login + ".png";
            request(url).pipe(fs.createWriteStream(filePath));
        });
}

getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);
// ==================================================================================================================

