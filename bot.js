// Requiring our module

var settings = require('./settings');
var Botkit = require('botkit');
var cmd = require('node-cmd');

var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: settings['token']
});

function start_rtm() {
  bot.startRTM(function(err,bot,payload) {
    if (err) {
      console.log('Failed to start RTM')
      return setTimeout(start_rtm, 60000);
    }
    console.log("RTM started!");
  });
}

controller.on('rtm_close', function(bot, err) {
  start_rtm();
});

start_rtm();

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
controller.hears(['on', 'off'],['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  if(message.match[0] == "off") {
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

