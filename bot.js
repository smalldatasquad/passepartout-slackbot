// Requiring our module
var slackAPI = require('slackbotapi');
var settings = require('./settings');
chromix = require("chromix-too")().chromix

console.log(settings);

var urlRegex = /^<(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?>$/i;


var updateAndFocus = function(url) {
  chromix("chrome.tabs.query", {}, {active: true}, function(tabs) {
    tabs.sort(function(a, b) { return a.index - b.index; }); 
    var tab = tabs[0];
    chromix("chrome.tabs.update", {}, tab.id, {url});
  });
}

// Starting
var slack = new slackAPI({
    'token': settings.token,
    'logging': true,
    'autoReconnect': true
});



// Slack on EVENT message, send data.
slack.on('message', function (data) {
    if (typeof data.text === 'undefined') return;
    // If someone says `cake!!` respond to their message with 'user OOH, CAKE!! :cake:'
    if (data.text === 'cake!!') slack.sendMsg(data.channel, '@' + slack.getUser(data.user).name + ' OOH, CAKE!! :cake:');

    console.log(data.text);
    if(urlRegex.test(data.text) == true) {
      console.log("YEAHURL");
      slack.sendMsg(data.channel, '@' + slack.getUser(data.user).name + " It's a URL! Sending to magic box!");

      var url = data.text.replace(/<|>/g, "");

      updateAndFocus(url);
    }
});
