document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let shouldClearDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput || "0";
    }

    function clearDisplay() {
        currentInput = "";
        shouldClearDisplay = false;
        updateDisplay();
    }

    function handleButtonClick(value) {
        if (shouldClearDisplay) {
            clearDisplay();
        }
        currentInput += value;
        updateDisplay();
    }

    function handleOperatorClick(operator) {
        if (shouldClearDisplay) {
            shouldClearDisplay = false;
        }
        currentInput += ` ${operator} `;
        updateDisplay();
    }

    function calculateResult() {
        currentInput = eval(currentInput);
        shouldClearDisplay = true;
        updateDisplay();
    }

    const buttons = document.getElementById("buttons");
    buttons.addEventListener("click", function (event) {
        const clickedButton = event.target;

        if (clickedButton.tagName === "BUTTON") {
            const buttonValue = clickedButton.textContent;

            if (buttonValue >= "0" && buttonValue <= "9") {
                handleButtonClick(buttonValue);
            } else if (buttonValue === ".") {
                if (!currentInput.includes(".")) {
                    handleButtonClick(buttonValue);
                }
            } else if (buttonValue === "=") {
                calculateResult();
            } else if (buttonValue === "AC") {
                clearDisplay();
            } else if (buttonValue === "X") {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            } else if (buttonValue === "√") {
                currentInput = Math.sqrt(eval(currentInput)).toString();
                updateDisplay();
            } else if (buttonValue === "%") {
                currentInput = (eval(currentInput) / 100).toString();
                updateDisplay();
            } else {
                handleOperatorClick(buttonValue);
            }
        }
    });

    clearDisplay();
});