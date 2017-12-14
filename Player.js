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

    var my1Card = gameState["players"][inAction]["hole_cards"][0];
    var my2Card = gameState["players"][inAction]["hole_cards"][1];

    if(my1Card["rank"] == my2Card["rank"]) {
        callValue += 50;
    }

    bet(callValue);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
