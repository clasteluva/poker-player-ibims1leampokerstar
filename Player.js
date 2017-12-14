class Player {
  static get VERSION() {
    return '0.21';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    bet(50);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
