const cards = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓',
    '🍉', '🍉', '🍒', '🍒', '🍑', '🍑', '🍍', '🍍'
];

let flippedCards = [];
let matchedCards = 0;
let errorCount = 0;
let successCount = 0;

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // Se as cartas forem iguais, incrementa os acertos
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        successCount += 1; // Incrementa o contador de acertos

        // Atualiza o contador de acertos na tela
        document.getElementById('success-count').textContent = `Acertos: ${successCount}`;

        if (matchedCards === cards.length) {
            setTimeout(() => alert('Você venceu!'), 500);
        }

        flippedCards = [];
    } else {
        // Se as cartas forem diferentes, incrementa os erros
        errorCount += 1; // Incrementa o contador de erros

        // Atualiza o contador de erros na tela
        document.getElementById('error-count').textContent = `Erros: ${errorCount}`;

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;

    card.addEventListener('click', flipCard);

    return card;
}

function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    this.classList.add('flipped');
    this.innerHTML = this.dataset.value;

    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function initializeGame() {
    const gameBoard = document.getElementById('game-board');
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach(cardValue => {
        const card = createCard(cardValue);
        gameBoard.appendChild(card);
    });
}

// Inicializa o jogo ao carregar a página
initializeGame();
