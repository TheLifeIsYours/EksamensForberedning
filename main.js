window.onload = () => {
    const message = document.querySelector('#messages');
    const mainContainer = document.querySelector('#main');
    const cardCount = document.querySelector('#card-count');

    let cards = [1, 2, 3, 4, 5, 6, 7, 8];
    let cardBuffer = [];
    let clickedCards = [];
    let counter;

    createGame();

    document.addEventListener('click', (_event) => {
        if (_event.target.classList.contains('unflipped')) {
            let card = _event.target;
            cardClickEvent(card);
        }
    });

    function createGame(_clear) {
        if(_clear) mainContainer.innerHTML = "";
        setMessage("Click two cards");

        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < 2; j++) {
                let newCard = document.createElement('div');

                newCard.id = `card-${i}`;
                newCard.classList.add('card', 'unflipped');
                newCard.setAttribute('value', cards[i]);
                newCard.innerHTML = `<div class="front"><div class="value">${cards[i]}</div></div>`;

                cardBuffer.push(newCard);
            }
        }

        let len = cardBuffer.length;
        counter = len;
        cardCount.innerHTML = counter;

        for (let i = 0; i < len; i++) {
            let rndIndex = Math.floor(Math.random() * cardBuffer.length);

            mainContainer.append(cardBuffer[rndIndex]);

            cardBuffer.splice(rndIndex, 1);
        }
    }

    function cardClickEvent(_card) {
        clickedCards.push(_card);
        _card.classList.remove('unflipped');

        let card1 = clickedCards[0];
        let card2 = clickedCards[1];

        //If clicked too many cards, resetBoard;
        if (clickedCards.length > 2) {
            resetBoard();
            setMessage(`wrong match!`);
            return;
        }

        //If clicked two cards, check values, and give points, or resetBoard;
        if (clickedCards.length == 2) {
            if (card1.getAttribute('value') == card2.getAttribute('value')) {
                setMessage(`correct match!`);
                givePoints();
            } else {
                setMessage(`wrong match!`);
            }

            resetBoard();
        }

        //If only one card selected, wait for next selection;
    }

    function givePoints() {
        clickedCards.forEach((card) => {
            card.classList.add('hidden');
        });

        counter -= 2;
        cardCount.innerHTML = counter;

        if(counter <= 0) {
            gameWon();
        }
    }

    async function gameWon() {

        setMessage("Congratulations");
        
        await sleep(1000);

        createGame(true)
    }

    function resetBoard() {
        for (let i = 0; i < clickedCards.length; i++) {
            clickedCards[i].classList.add('unflipped');
        }

        clickedCards = [];
    }

    function setMessage(_text) {
        message.innerHTML = _text;
    }

    function sleep(_ms) {
        return new Promise((resolve, reject) => {setTimeout(() => {return resolve()}, _ms)});
    }
};