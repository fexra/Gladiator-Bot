const config = require('../../../config');
const fs = require('fs');

class PrefixCommand {
  constructor() {
    this.cooldown = 0;
  }
  handler(message) {
    if(message.author.id !== config.ownerID) {
      message.channel.send("Only our Emperor can change my prefix!");
      return; //stop other people commanding bot
    }
    // change the configuration in memory
    config.prefix = message.content.split(" ").slice(1, 2)[ 0 ];
    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
  }
}

module.exports = new PrefixCommand();