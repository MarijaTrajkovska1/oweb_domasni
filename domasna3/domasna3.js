//gi vnesov emojis-ot so Win+ .(tocka)
let cards = ['🦊', '🦊', '🦌', '🦌', '🐻', '🐻', '🐇', '🐇', '🦝', '🦝', '🦔', '🦔'];

cards.sort(function() {
    return 0.5 - Math.random();
});

let board = document.getElementById('board');
let attemptsDisplay = document.getElementById('attempts');
let message = document.getElementById('message');

let attempts = 0;
let firstCard = null;
let secondCard = null;
let matches = 0;

for (let i = 0; i < cards.length; i++) {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '?';       
    card.textValue = cards[i];  

    card.onclick = function() {
        if (this.classList.contains('open') || this.classList.contains('matched')) return;

        this.innerHTML = this.textValue;
        this.classList.add('open');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            attempts++;
            attemptsDisplay.innerHTML = attempts;

            if (firstCard.textValue === secondCard.textValue) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                firstCard = null;
                secondCard = null;
                matches++;

                if (matches === 6) {
                    message.innerHTML = "Браво! Ги најде сите парови за " + attempts + " обиди.";
                }
            } else {
                setTimeout(function() {
                    firstCard.innerHTML = '?';
                    secondCard.innerHTML = '?';
                    firstCard.classList.remove('open');
                    secondCard.classList.remove('open');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    };

    board.appendChild(card);
}
