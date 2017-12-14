class Player {
  static get VERSION() {
    return '0.31';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    var inAction = gameState["in_action"];
    var minimumRaise = gameState["minimum_raise"];

    var callValue = gameState["current_buy_in"] - gameState["players"][inAction]["bet"];

    var my1Card = gameState["players"][inAction]["hole_cards"][0];
    var my2Card = gameState["players"][inAction]["hole_cards"][1];

    //PAIR
    if(my1Card["rank"] == my2Card["rank"]) {

        if(my1Card.rank > 8 ) {
          callValue += (50 + minimumRaise);
          if(my1Card["rank"] == "K" || my1Card["rank"] == "A" || my1Card["rank"] == "Q") {
            callValue += 150;
          }
        }
    } else {
      if(my1Card.rank <= 8 || my2Card.rank <= 8) {

        console.log("### call is zerooo");
        callValue = 0;
      }
    }

    // A UND K
    if((my1Card.rank == 'A' && my2Card.rank == 'K') ||  (my2Card.rank == 'A' && my1Card.rank == 'K')) {
      
      callValue += (50 + minimumRaise);

      if(my1Card.suit == my2Card.suit) {
        callValue += 100;
      }
    }

    console.log("### callValue: " + callValue);
    bet(callValue);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
