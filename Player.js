class Player {
  static get VERSION() {
    return '0.64';
  }

  static betRequest(gameState, bet) {
    console.log("gamestate: " + JSON.stringify(gameState));

    var inAction = gameState["in_action"];
    var minimumRaise = gameState["minimum_raise"];

    var callValue = gameState["current_buy_in"] - gameState["players"][inAction]["bet"];

    var my1Card = gameState["players"][inAction]["hole_cards"][0];
    var my2Card = gameState["players"][inAction]["hole_cards"][1];

    var cardCount = gameState.community_cards.length;
    var comCards = new Array(5);

    var ALL_IN = false;

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

        } else { // bad pair
          if(minimumRaise <= (gameState.players[inAction].stack / 2)) {
            console.log("#### bad pair mitgehen");
            callValue = minimumRaise;
          } else {
            callValue = 0;
          }
          
        }

        //check for 3 or 4
        var counter = 2;
        for(var card of comCards) {
          if(card) {
            if(card.rank == my1Card.rank) {
              counter++;
            }
          }
          
        }
        console.log("#### zwilling/drilling/vierling: "+counter);

        if(counter == 3) {  //drilling
          callValue += 50;
        } else if (counter == 4) {  //vierling
          callValue += 300;
          ALL_IN = true;
        }

        



    } else if(my1Card.rank <= 10 || my2Card.rank <= 10) { //bad cards - no matter if 2 2 or 4 K
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

    console.log("### first card suit:"+my1Card.suit);
    console.log("### sec card suit:"+my2Card.suit);
    if(my1Card.suit == my2Card.suit) {  //our cards have the same suit - wir suchen nach einem Flush
      console.log("##### our cards have the same suit");
      if(minimumRaise < 101 && gameState.players[inAction].bet < (gameState.players[inAction].stack / 2)) {
        callValue += minimumRaise;
        console.log("#### two cards same suit");
      }
      
      var sameSuitComCardsCounter = 0;
      for(var cardy of comCards) {
        if(cardy) {
          if(cardy.suit == my1Card.suit) {
            sameSuitComCardsCounter++;
          }
        }
        
      }
      if(sameSuitComCardsCounter >= 3) {  //FLUSH with two of ours
        callValue += (100 + minimumRaise);
        console.log("#### flush with two of ours");
      } else if(cardCount == 3) { //noch kein Flush, zweimal gleich Farbe bei uns und drei Karten beim Dealer
        console.log("#### noch kein Flush, zweimal gleiche Farbe bei uns, drei Karten beim Dealer");
        if(sameSuitComCardsCounter >= 2) {  //beim dealer sind mind. 2 karten unserer Farbe
          callValue += minimumRaise;
          console.log("#### beim dealer mindestens 2 karten unserer farbe, wir gehen mit");
        } else {
          callValue = 0;  //raus
          console.log("#### beim dealer sind weniger als 2 karten unserer farbe, wir gehen raus");
        }
      } else if(cardCount == 4) {
        callValue = 0;
        console.log("es sind vier dealer karten draußen, noch kein flush, wir gehen raus");
      }
    }

    if(cardCount >= 3) {  //die ersten drei karten vom dealer sind raus
      var sameRankCard1 = 0;
      for(var cardo of comCards) {
        if(cardo) {
          if(my1Card.rank == cardo.rank) {
            sameRankCard1++;
          }
        }
        
      }
      var sameRankCard2 = 0;
      for(var cardo2 of comCards) {
        if(cardo2) {
          if(my2Card.rank == cardo2.rank) {
            sameRankCard2++;
          }
        }
        
      }

      if(sameRankCard1 == 2 || sameRankCard2 == 2) {
        callValue += minimumRaise;
        if(sameRankCard1 == 2) {  //die erste Karte von uns kommt auch einmal beim dealer vor
          callValue += 20;
        }
        if(sameRankCard2 == 2) { //die zweite Karte von uns kommt auch einmal beim dealer vor
          callValue += 20;
        }
      }
      
      if(sameRankCard1 == 2 && sameRankCard2 == 2) {  //zwei paare
        callValue += 50;
      }

      if(sameRankCard1 == 3 || sameRankCard2 == 3) {  //drilling mit zwei karten vom dealer
        callValue += (200 + minimumRaise);
      }

      if(sameRankCard1 == 4 || sameRankCard2 == 4) {  //vierling mit drei karten vom dealer
        callValue += (400 + minimumRaise);
      }

      if((sameRankCard1 == 3 && sameRankCard2 == 2) || (sameRankCard2 == 3 && sameRankCard1 == 2)) {  //FULL HOUSE
        ALL_IN = true;
      }
      
    }

    console.log("### callValue: " + callValue);
    if(callValue > gameState.players[inAction].stack || ALL_IN == true) {
      callValue = gameState.players[inAction].stack;
      console.log("#### all in, call value: "+callValue);
    }
    console.log("#### our cards are "+my1Card.rank+" "+my1Card.suit+", "+my2Card.rank+" "+my2Card.suit);
    console.log("#### We bet now: "+callValue+" our stack is: "+gameState.players[inAction].stack);
    
    bet(callValue);
    console.log("\n\n\n***********************************************")
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
