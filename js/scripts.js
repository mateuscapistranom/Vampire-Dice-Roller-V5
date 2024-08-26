document.addEventListener('DOMContentLoaded', () => {
    const rollButton = document.getElementById('roll-button');
    const diceCountInput = document.getElementById('dice-count');
    const hungerDiceInput = document.getElementById('hunger-dice');
    const difficultyInput = document.getElementById('difficulty');
    const diceResultsDiv = document.getElementById('dice-results');
    const successCountSpan = document.getElementById('success-count').querySelector('span');
    const failureCountSpan = document.getElementById('failure-count').querySelector('span');
    const hungerCountSpan = document.getElementById('hunger-count').querySelector('span');

    const languageToggle = document.getElementById('language-toggle');
    const title = document.getElementById('title');
    const resultsTitle = document.getElementById('results-title');
    const rulesTitle = document.getElementById('rules-title');
    const ruleSuccess = document.getElementById('rule-success');
    const ruleFailure = document.getElementById('rule-failure');
    const ruleHunger = document.getElementById('rule-hunger');

    let isEnglish = false;

    function rollDie() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function rollDice() {
        const diceCount = parseInt(diceCountInput.value, 10);
        const hungerDiceCount = parseInt(hungerDiceInput.value, 10);
        const difficulty = parseInt(difficultyInput.value, 10);

        diceResultsDiv.innerHTML = '';
        successCountSpan.textContent = '0';
        failureCountSpan.textContent = '0';
        hungerCountSpan.textContent = '0';

        let successCount = 0;
        let failureCount = 0;
        let hungerCount = 0;

        for (let i = 0; i < diceCount; i++) {
            const result = rollDie();
            const dieElement = document.createElement('span');
            dieElement.className = 'die';

            if (result === 1) {
                dieElement.classList.add('hunger');
                hungerCount++;
            } else if (result >= difficulty) {
                dieElement.classList.add('success');
                successCount++;
            } else {
                dieElement.classList.add('failure');
                failureCount++;
            }

            dieElement.textContent = result;
            diceResultsDiv.appendChild(dieElement);
        }

        for (let i = 0; i < hungerDiceCount; i++) {
            const result = rollDie();
            const dieElement = document.createElement('span');
            dieElement.className = 'die hunger';
            dieElement.textContent = result;
            diceResultsDiv.appendChild(dieElement);
            hungerCount++;
        }

        successCountSpan.textContent = successCount;
        failureCountSpan.textContent = failureCount;
        hungerCountSpan.textContent = hungerCount;
    }

    function updateLanguage() {
        if (isEnglish) {
            title.textContent = 'Vampire Dice Roller V5';
            resultsTitle.textContent = 'Results';
            rulesTitle.textContent = 'Rolling Rules';
            rollButton.textContent = 'Roll Dice';
            languageToggle.textContent = 'Switch to Portuguese';

            ruleSuccess.innerHTML = '<strong>Success Dice:</strong> Dice rolls that are equal to or greater than the specified difficulty, with a 10 always being a success.';
            ruleFailure.innerHTML = '<strong>Failure Dice:</strong> Dice rolls that are less than the difficulty.';
            ruleHunger.innerHTML = '<strong>Hunger Dice:</strong> Dice that are part of your Hunger pool.';
        } else {
            title.textContent = 'Vampire Dice Roller V5';
            resultsTitle.textContent = 'Resultados';
            rulesTitle.textContent = 'Regras de Rolagem';
            rollButton.textContent = 'Rolar Dados';
            languageToggle.textContent = 'Switch to English';

            ruleSuccess.innerHTML = '<strong>Dados de Sucesso:</strong> Dados cuja rolagem é igual ou maior que a dificuldade especificada, sendo que um 10 é sempre sucesso.';
            ruleFailure.innerHTML = '<strong>Dados de Falha:</strong> Dados cuja rolagem é menor que a dificuldade.';
            ruleHunger.innerHTML = '<strong>Dados de Fome:</strong> Dados que mostram o número 1.';
        }
    }

    rollButton.addEventListener('click', rollDice);
    languageToggle.addEventListener('click', () => {
        isEnglish = !isEnglish;
        updateLanguage();
    });
});
