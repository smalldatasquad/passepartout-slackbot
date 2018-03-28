// Requiring our module

var settings = require('./settings');
var Botkit = require('botkit');
var cmd = require('node-cmd');

var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: settings['token']
}).startRTM();

controller.hears('hello',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    bot.reply(message,'Hello yourself!');
});

controller.hears('turn monitor (.*)',['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  if(message.match[1] == "off") {
    bot.reply(message,'Okay! Turning monitor off!');
    cmd.get('vcgencmd display_power 0', function(err, data, stderr) {
      //console.log('the current working dir is : ',data)
    });

  } else {
    bot.reply(message,'Okay! Turning monitor on!');
    cmd.get('vcgencmd display_power 1', function(err, data, stderr) {
      //console.log('the current working dir is : ',data)
    });
  }
});

/*chromix = require("chromix-too")().chromix

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
*/
