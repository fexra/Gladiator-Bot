const arena = require('../../arena/arena');
const config = require('../../../config.json');
const MessageController = require('../message-controller');

class LionsCommand extends MessageController {
  constructor() {
    super();
    this.cooldown = 1000;
  }
  handler(message) {
    message.delete(1000);
    if (this.lastUsed + this.cooldown > Date.now()) return;
    if(message.author.id !== config.ownerID) {
        message.channel.send(`You think you can control Caesar's Lions ${message.author}?!`);
        return; //stop other people using Lions
    }
    if (arena.inProgress) {
      const result = arena.attackLions(message.author);
      switch (result.message) {
        case 'WIN':
          // handle win conditions
          message.channel.send(`${result.winner.userObject} releases his trained Lions with a wave of his hand and points at his opponent.  The lions surround them and feast on their guts!. ${result.loser.userObject} really shouldn't have gone for Caesar... Caesar is victorious!`);
          break;
        case 'HIT':
          //Handle hit
          message.channel.send(`${result.gladiator.userObject} releases his trained Lions with a wave of his hand and points at ${result.target.userObject}.  The lions surround them and feast on their guts! ${result.target.health}hp remaining!`);
          break;
        case 'MISS':
          // Handle miss
          message.channel.send(`${result.gladiator.userObject} swings at ${result.target.userObject} but they ducked out of the way. ${result.target.health}hp remaining!`);
          break;
        case 'TURN':
          // Handle out of turn
          message.channel.send('How about you give your opponent a chance?  The fans don\' like one sided battles');
          break;
        case 'NOT_GLADIATOR':
          // Handle not gladiator
          message.channel.send(`${message.author} is trying to get in on the action. GUARDS?!`);
          break;
        default:
          console.log(result);
      }
    }

    this.lastUsed = Date.now();
  }
}

module.exports = new LionsCommand();
