var dealerSum=0;
var playerSum=0;
var dealerAceCount=0;
var playerAceCount=0;
var hidden;
var deck;

var canHit=true;
window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame()
}
function buildDeck() {
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let types = ['C', 'D', 'H', 'S'];
    deck = []; 
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] +"-"+ types[i]);
        }
    }
    console.log(deck);
}
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);
}
function startGame() {
    hidden=deck.pop();
    dealerSum+= getCardValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getCardValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);
    for(let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getCardValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }
    console.log(playerSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}
function setResultMessage(message) {
    document.getElementById("result").innerText = message;
}

function hit() {
    if (canHit) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getCardValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
        console.log(playerSum);
        if (playerSum > 21 && playerAceCount > 0) {
            playerSum -= 10;
            playerAceCount--;
        }
        document.getElementById("player-sum").innerText = playerSum;
        if (playerSum > 21) {
            canHit = false;
            setResultMessage("You busted! Dealer wins.");
        }
    }
}

function stay() {
    if (playerSum > 21) {
        setResultMessage("You already busted. Cannot stay!");
        return;
    }
    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    while (dealerSum < 17) {
        let card = deck.pop();
        dealerSum += getCardValue(card);
        dealerAceCount += checkAce(card);
        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("dealer-cards").append(cardImg);
    }
    while (dealerSum > 21 && dealerAceCount > 0) {
        dealerSum -= 10;
        dealerAceCount--;
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    let message = "";
    if (dealerSum > 21) {
        message = "Dealer busted! You win!";
    } else if (playerSum > dealerSum) {
        message = "You win!";
    } else if (playerSum < dealerSum) {
        message = "Dealer wins!";
    } else {
        message = "It's a tie!";
    }
    setResultMessage(message);
}


function getCardValue(card) {
    let value = card.split("-")[0];
    if (value === 'A') {
        return 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
        return 10; 
    } else {
        return parseInt(value);
    }
}
function checkAce(card) {
    let value = card.split("-")[0];
    if (value === 'A') {
        return 1;
    }
    return 0;
}
function reset() {
    
    dealerSum = 0;
    playerSum = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    canHit = true;
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-sum").innerText = "";
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("result").innerText = "";
    buildDeck();
    shuffleDeck();
    hidden = deck.pop();
    dealerSum += getCardValue(hidden);
    dealerAceCount += checkAce(hidden);

    let hiddenImg = document.createElement("img");
    hiddenImg.src = "./cards/BACK.png";
    hiddenImg.id = "hidden";
    document.getElementById("dealer-cards").append(hiddenImg);
    let dealerCard = deck.pop();
    dealerSum += getCardValue(dealerCard);
    dealerAceCount += checkAce(dealerCard);
    let dealerCardImg = document.createElement("img");
    dealerCardImg.src = "./cards/" + dealerCard + ".png";
    document.getElementById("dealer-cards").append(dealerCardImg);
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerSum += getCardValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }
    console.log("Game reset. PlayerSum: " + playerSum + ", DealerSum (hidden): " + dealerSum);
}

