window.onload = () => {
    const message = document.querySelector('#messages');
    const mainContainer = document.querySelector('#main');

    let cards = [1, 2, 3, 4, 5, 6, 7, 8];
    let cardBuffer = [];
    let clickedCards = [];

    createGame();

    document.addEventListener('click', (_event) => {
        if (_event.target.classList.contains('card')) {
            let card = _event.target;
            cardClickEvent(card);
        }
    });

    function createGame() {
        for (let i = 0; i < cards.length; i++) {
            for (let j = 0; j < 2; j++) {
                let newCard = document.createElement('div');

                newCard.id = `card-${i}`;
                newCard.classList.add('card', 'unflipped');
                newCard.setAttribute('value', cards[i]);
                newCard.innerHTML = `<div class="value">${cards[i]}</div>`;

                cardBuffer.push(newCard);
            }
        }

        let len = cardBuffer.length;

        for (let i = 0; i < len; i++) {
            let rndIndex = Math.floor(Math.random() * cardBuffer.length);

            mainContainer.append(cardBuffer[rndIndex]);

            cardBuffer.splice(rndIndex, 1);
        }
    }

    function cardClickEvent(_card) {
        clickedCards.push(_card);

        _card.classList.remove('unflipped');

        //If clicked too many cards, resetBoard;
        if (clickedCards.length > 2) {
            resetBoard();
            setMessage(`wrong match!`);
            return;
        }

        //If clicked two cards, check values, and give points, or resetBoard;
        if (clickedCards.length == 2) {
            if (clickedCards[0].getAttribute('value') == clickedCards[1].getAttribute('value')) {
                setMessage(`correct match!`);
                    givePoints();
                    return;
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
};