class Player {
  static get VERSION() {
    return '0.23';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    var inAction = gameState["in_action"];
    var callValue = gameState["current_buy_in"] - gameState["players"][inAction]["bet"];
    console.log("inAction :" + inAction);
    console.log("callValue : " + callValue);

    bet(callValue);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
