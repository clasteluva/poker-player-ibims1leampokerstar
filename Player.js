class Player {
  static get VERSION() {
    return '0.32';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    var inAction = gameState["in_action"];
    var minimumRaise = gameState["minimum_raise"];

    var callValue = gameState["current_buy_in"] - gameState["players"][inAction]["bet"];

    var my1Card = gameState["players"][inAction]["hole_cards"][0];
    var my2Card = gameState["players"][inAction]["hole_cards"][1];

    var cardCount = gameState.community_cards.length;
    var com1;
    var com2;
    var com3;
    var com4;
    var com5;

    var i;
    for(i = 0; i < cardCount; i++) {
      console.log("### cardcount: " + cardCount);

      if(cardCount > 0) {
        com1 = gameState.community_cards[0];
        com2 = gameState.community_cards[1];
        com3 = gameState.community_cards[2];
      }
      if(cardCount > 3) {
        com4 = gameState.community_cards[3];
      }
      if(cardCount > 4) {
        com5 = gameState.community_cards[4];
      }
    }

    //PAIR
    if(my1Card["rank"] == my2Card["rank"]) {

        if(my1Card.rank > 8 ) { //good pair
          callValue += (50 + minimumRaise);
          if(my1Card["rank"] == "K" || my1Card["rank"] == "A" || my1Card["rank"] == "Q") { //very good pair
            callValue += 150;
          }
        }
    } 

    if(my1Card.rank <= 8 || my2Card.rank <= 8) { //bad cards - no matter if 2 2 or 4 K
      console.log("### call is zerooo");
      callValue = 0;
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
