class Player {
  static get VERSION() {
    return '0.28';
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
        console.log("#### pair!!");

        if(my1Card.rank > 8 ) {
          callValue += 50;
          if(my1Card["rank"] == "K" || my1Card["rank"] == "A" || my1Card["rank"] == "Q") {
            console.log("#### pair with KAQ");
            callValue += 150;
          }
        }
    } else {
      if(my1Card.rank <= 8 || my2Card.rank <= 8) {

        console.log("### call is zerooo");
        callValue = 0;
      }
    }

    if((my1Card.rank == 'A' && my2Card.rank == 'K') ||  (my2Card.rank == 'A' && my1Card.rank == 'K')) {
      console.log("### A aaand K");
      callValue += 50;

      if(my1Card.suit == my2Card.suit) {
        console.log("### A aaaaaand K saaame color");
        callValue += 100;
      }
    }

    bet(callValue);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
