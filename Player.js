class Player {
  static get VERSION() {
    return '0.42';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    var inAction = gameState["in_action"];
    var minimumRaise = gameState["minimum_raise"];

    var callValue = gameState["current_buy_in"] - gameState["players"][inAction]["bet"];

    var my1Card = gameState["players"][inAction]["hole_cards"][0];
    var my2Card = gameState["players"][inAction]["hole_cards"][1];

    var cardCount = gameState.community_cards.length;
    var comCards = new Array[4];

    var i;
    for(i = 0; i < cardCount; i++) {
      console.log("### cardcount: " + cardCount);
        comCards.push(gameState.community_cards[i]);
    }

    //PAIR
    if(my1Card["rank"] == my2Card["rank"]) {

        if(my1Card.rank > 8 ) { //good pair
          callValue += (50 + minimumRaise);
          if(my1Card["rank"] == "K" || my1Card["rank"] == "A" || my1Card["rank"] == "Q") { //very good pair
            callValue += 150;
          }

          //check for 3 or 4
          var counter = 2;
          for(var card of comCards) {
            if(card.rank == my1Card.rank) {
              counter++;
            }
          }
          console.log("#### zwilling/drilling/vierling: "+counter);

          if(counter == 3) {
            callValue += 50;
          } else if (counter == 4) {
            callValue += 300;
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
    if(callValue > gameState.players[inAction].stack) {
      callValue = gameState.players[inAction].stack;
      console.log("#### all in");
    }
    bet(callValue);
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
