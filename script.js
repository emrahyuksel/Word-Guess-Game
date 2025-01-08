document.addEventListener('DOMContentLoaded', () => {
    const words = ['MERHABA', 'DÜNYA', 'BİLGİSAYAR', 'PROGRAMLAMA', 'JAVASCRIPT'];
    let word;
    let remainingAttempts = 5;
    let guessedLetters = [];
    let wrongLetters = [];
    let timerInterval;
    let timeElapsed = 0;

    const startButton = document.getElementById('start-game');
    const wordElement = document.querySelector('.word');
    const wordInfoElement = document.querySelector('.word-info');
    const buttonsContainer = document.querySelector('.buttons');
    const remainingAttemptsElement = document.querySelector('.remaining-attempts');
    const timerElement = document.querySelector('.timer');

    const alphabet = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.disabled = true;
        buttonsContainer.appendChild(button);
    });

    const buttons = document.querySelectorAll('.buttons button');

    function updateWordDisplay() {
        wordElement.textContent = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');
    }

    function updateRemainingAttempts() {
        remainingAttemptsElement.textContent = `Kalan Tahmin Hakkı: ${remainingAttempts}`;
    }

    function updateTimer() {
        timerElement.textContent = `Süre: ${timeElapsed} saniye`;
    }

    function checkGameOver() {
        if (remainingAttempts <= 0) {
            alert('Oyun Bitti! Kaybettiniz.');
            buttons.forEach(button => button.disabled = true);
            clearInterval(timerInterval);
        } else if (word.split('').every(letter => guessedLetters.includes(letter))) {
            alert('Tebrikler! Kazandınız.');
            buttons.forEach(button => button.disabled = true);
            clearInterval(timerInterval);
        }
    }

    startButton.addEventListener('click', () => {
        word = words[Math.floor(Math.random() * words.length)];
        remainingAttempts = 5;
        guessedLetters = [];
        wrongLetters = [];
        timeElapsed = 0;

        wordInfoElement.textContent = `Kelime ${word.length} harften oluşuyor.`;
        updateWordDisplay();
        updateRemainingAttempts();
        updateTimer();

        buttons.forEach(button => button.disabled = false);

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeElapsed++;
            updateTimer();
        }, 1000);
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const letter = button.textContent;
            button.disabled = true;

            if (word.includes(letter)) {
                guessedLetters.push(letter);
            } else {
                wrongLetters.push(letter);
                remainingAttempts--;
            }

            updateWordDisplay();
            updateRemainingAttempts();
            checkGameOver();
        });
    });
});