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

    rollButton.addEventListener('click', () => {
        const diceCount = Math.min(Math.max(parseInt(diceCountInput.value, 10), 1), 10);
        const hungerDice = Math.min(Math.max(parseInt(hungerDiceInput.value, 10), 0), 10);
        const difficulty = Math.min(Math.max(parseInt(difficultyInput.value, 10), 1), 10);

        const results = rollDice(diceCount, hungerDice, difficulty);
        displayResults(results);
    });

    languageToggle.addEventListener('click', () => {
        isEnglish = !isEnglish;
        updateLanguage();
    });

    function rollDice(diceCount, hungerDice, difficulty) {
        const results = {
            success: 0,
            failure: 0,
            hunger: 0,
            values: []
        };

        for (let i = 0; i < diceCount; i++) {
            const roll = Math.floor(Math.random() * 10) + 1; // Rolagem de 1 a 10
            if (roll === 1) {
                results.hunger++;
                results.values.push(roll);
            } else if (roll <= difficulty) {
                results.success++;
                results.values.push(roll);
            } else {
                results.failure++;
                results.values.push(roll);
            }
        }

        for (let i = 0; i < hungerDice; i++) {
            const roll = 1; // Sempre será fome
            results.hunger++;
            results.values.push(roll);
        }

        return results;
    }

    function displayResults(results) {
        diceResultsDiv.innerHTML = results.values.map(value => {
            const className = value === 1 ? 'hunger' : value <= difficultyInput.value ? 'success' : 'failure';
            return `<span class="die ${className}">${value}</span>`;
        }).join('');

        successCountSpan.textContent = results.success;
        failureCountSpan.textContent = results.failure;
        hungerCountSpan.textContent = results.hunger;
    }

    function updateLanguage() {
        if (isEnglish) {
            title.textContent = 'Vampire Dice Roller V5';
            resultsTitle.textContent = 'Results';
            rulesTitle.textContent = 'Rolling Rules';
            rollButton.textContent = 'Roll Dice';
            languageToggle.textContent = 'Switch to Portuguese';

            ruleSuccess.innerHTML = '<strong>Success Dice:</strong> Dice rolls that are equal to or less than the specified difficulty.';
            ruleFailure.innerHTML = '<strong>Failure Dice:</strong> Dice rolls that are greater than the difficulty and are not hunger dice.';
            ruleHunger.innerHTML = '<strong>Hunger Dice:</strong> Dice that show a 1.';
        } else {
            title.textContent = 'Vampire Dice Roller V5';
            resultsTitle.textContent = 'Resultados';
            rulesTitle.textContent = 'Regras de Rolagem';
            rollButton.textContent = 'Rolar Dados';
            languageToggle.textContent = 'Switch to English';

            ruleSuccess.innerHTML = '<strong>Dados de Sucesso:</strong> Dados cuja rolagem é menor ou igual à dificuldade especificada.';
            ruleFailure.innerHTML = '<strong>Dados de Falha:</strong> Dados cuja rolagem é maior que a dificuldade e não são dados de fome.';
            ruleHunger.innerHTML = '<strong>Dados de Fome:</strong> Dados que mostram o número 1.';
        }
    }
});
