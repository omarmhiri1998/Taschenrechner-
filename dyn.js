var screen1 = "";
var sum = 0;
var summe = [];
var comma = 0;
var operation = [];
var a = 0;

function firstScreen(button) {

    let newButton = button.textContent.trim();
    let operators = ["+", "-", "*", "/"];
    let lastCharacter = screen1.slice(-1);


    if (newButton === "C") {

        document.getElementById("Second").textContent = "";
        document.getElementById("first").textContent = "";

        screen1 = "";
        sum = 0;
        summe = [];
        operation = [];
        comma = 0;
        a = 0;

        return;
    }


    if (newButton === "->") {

        screen1 = screen1.slice(0, -1);


        let currentNumber =
            screen1.split(/[+\-*/()]/).pop();

        if (currentNumber === "" || currentNumber === ".") {
            sum = 0;
        } else {
            sum = Number(currentNumber);
        }

        document.getElementById("Second").textContent =
            screen1;

        document.getElementById("first").textContent =
            currentNumber;

        return;
    }

    if (/^[0-9]$/.test(newButton)) {


        if (lastCharacter === ")") {
            screen1 += "*";
        }

        screen1 += newButton;

        let currentNumber =
            screen1.split(/[+\-*/()]/).pop();

        sum = Number(currentNumber);

        document.getElementById("Second").textContent =
            screen1;

        document.getElementById("first").textContent =
            currentNumber;

        return;
    }


    if (newButton === ".") {

        let currentNumber =
            screen1.split(/[+\-*/()]/).pop();


        if (currentNumber.includes(".")) {
            return;
        }


        if (
            screen1 === "" ||
            operators.includes(lastCharacter) ||
            lastCharacter === "("
        ) {
            screen1 += "0.";

        } else if (lastCharacter !== ")") {
            screen1 += ".";
        }

        currentNumber =
            screen1.split(/[+\-*/()]/).pop();

        sum = Number(currentNumber);

        document.getElementById("Second").textContent =
            screen1;

        document.getElementById("first").textContent =
            currentNumber;

        return;
    }


    if (newButton === "(") {


        if (
            /[0-9]/.test(lastCharacter) ||
            lastCharacter === ")"
        ) {
            screen1 += "*(";

        } else if (lastCharacter !== ".") {
            screen1 += "(";
        }

        document.getElementById("Second").textContent =
            screen1;

        return;
    }


    if (newButton === ")") {

        let openParentheses =
            (screen1.match(/\(/g) || []).length;

        let closedParentheses =
            (screen1.match(/\)/g) || []).length;


        if (
            openParentheses > closedParentheses &&
            screen1 !== "" &&
            !operators.includes(lastCharacter) &&
            lastCharacter !== "(" &&
            lastCharacter !== "."
        ) {
            screen1 += ")";
        }

        document.getElementById("Second").textContent =
            screen1;

        return;
    }


    if (operators.includes(newButton)) {

        if (screen1 === "") {

            if (newButton === "-") {
                screen1 = "-";
            }


        } else if (lastCharacter === "(") {

            if (newButton === "-") {
                screen1 += "-";
            }


        } else if (operators.includes(lastCharacter)) {

            screen1 =
                screen1.slice(0, -1) + newButton;

        } else if (lastCharacter !== ".") {

            screen1 += newButton;
        }

        document.getElementById("Second").textContent =
            screen1;

        return;
    }


    if (newButton === "=") {

        lastCharacter = screen1.slice(-1);


        if (
            screen1 === "" ||
            operators.includes(lastCharacter) ||
            lastCharacter === "(" ||
            lastCharacter === "."
        ) {
            return;
        }

        let openParentheses =
            (screen1.match(/\(/g) || []).length;

        let closedParentheses =
            (screen1.match(/\)/g) || []).length;


        if (openParentheses !== closedParentheses) {

            document.getElementById("first").textContent =
                "Error";

            return;
        }

        try {

            let oldExpression = screen1;

            let result = Function(
                '"use strict"; return (' + screen1 + ')'
            )();


            if (!Number.isFinite(result)) {
                document.getElementById("first").textContent =
                    "Error";

                return;
            }


            result = Number(result.toFixed(10));

            document.getElementById("first").textContent =
                result;

            document.getElementById("Second").textContent =
                oldExpression + " = " + result;

            // مواصلة الحساب بالنتيجة
            screen1 = String(result);
            sum = result;

            summe = [];
            operation = [];
            comma = 0;
            a = 0;

        } catch (error) {

            document.getElementById("first").textContent =
                "Error";
        }
    }
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registered");
            })
            .catch((error) => {
                console.error("Service Worker error:", error);
            });
    });
}