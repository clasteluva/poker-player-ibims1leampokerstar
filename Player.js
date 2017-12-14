class Player {
  static get VERSION() {
    return '0.22';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    bet(10);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
