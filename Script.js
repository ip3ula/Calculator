const nav = document.querySelector("#nav");
const mediaQuery = window.matchMedia("(max-width: 767px)");
const menu = document.querySelector(".left");
const right = document.querySelector(".right");
const buttons = document.querySelectorAll(".btnBasic");
const home = document.querySelector(".home");
const numeric = document.querySelector(".numeric");
const setting = document.querySelector(".cog");
let currentInput = ''; // Initialize these variables
let previousInput = '';
let operator = '';

const htmlCode = {
    home: `<h1 class="welcome">WELCOME</h1>`,

    numeric: `<div><p class="display">0</p>
        <table>
    <tr>
        <td><button class="calButton c">AC</button></td>
        <td><button class="calButton">[+/-]</button></td>
        <td><button class="calButton o">%</button></td>
        <td><button class="calButton o">÷</button></td>
    </tr>
    <tr>
        <td><button class="calButton n">7</button></td>
        <td><button class="calButton n">8</button></td>
        <td><button class="calButton n">9</button></td>
        <td><button class="calButton o">x</button></td>
    </tr>
    <tr>
        <td><button class="calButton n">4</button></td>
        <td><button class="calButton n">5</button></td>
        <td><button class="calButton n">6</button></td>
        <td><button class="calButton o">-</button></td>
    </tr>
    <tr>
        <td><button class="calButton n">1</button></td>
        <td><button class="calButton n">2</button></td>
        <td><button class="calButton n">3</button></td>
        <td><button class="calButton o">+</button></td>
    </tr>
    <tr>
        <td colspan="2"><button class="calButton wide n">0</button></td>
        <td><button class="calButton dot">.</button></td>
        <td><button class="calButton e">=</button></td>
    </tr>
</table></div>`,
setting: `
<div class="themes">
    <h1 class="welcome">themes</h1>
    <table>
        <tr>
            <td>
                <button class="themesButton th1">Light Blue</button>
            </td>
        </tr>
        <tr>
            <td>
                <button class="themesButton th2">Orange</button>
            </td>
        </tr>
        <tr>
            <td>
                <button class="themesButton th3">Teal</button>
            </td>
        </tr>
        <tr>
            <td>
                <button class="themesButton th4">Coral</button>
            </td>
        </tr>
        <tr>
            <td>
                <button class="themesButton th5">Purple</button>
            </td>
        </tr>
        <tr>
            <td>
                <button class="themesButton">Default</button>
            </td>
        </tr>
    </table>
</div>`
};

const changeHTML = function (html) {
    right.innerHTML = html;
};

if (!mediaQuery.matches) {
    menu.style.display = "block";
}

const leftMenu = document.querySelector(".left"); // Define leftMenu

mediaQuery.addEventListener("change", function () {
    if (mediaQuery.matches) {
        menu.style.display = "none";
        nav.setAttribute("class", "fas fa-bars");
    } else {
        menu.style.display = "block";
    }
});

nav.addEventListener("click", function () {
    if (mediaQuery.matches) {
        if (menu.style.display === "block") {
            menu.style.display = "none";
            nav.setAttribute("class", "fas fa-bars");
        } else {
            menu.style.display = "block";
            nav.setAttribute("class", "fas fa-times");
        }
    }
});

buttons.forEach((button) =>
    button.addEventListener("click", function () {
        buttons.forEach((btn) => btn.classList.replace("active", "btnBasic"));
        button.classList.replace("btnBasic", "active");
        right.innerHTML = `<p class="welcome">soon<small><i>!!!</i></small></p>`;
        if (mediaQuery.matches) {
            menu.style.display = "none";
            nav.setAttribute("class", "fas fa-bars");
        }
    })
);

home.addEventListener("click", function () {
    changeHTML(htmlCode.home);
});
home.click();

numeric.addEventListener("click", function () {
    changeHTML(htmlCode.numeric);

    const display = document.querySelector(".display"); // Re-query display
    const calButtons = document.querySelectorAll(".calButton");

    calButtons.forEach((button) =>
        button.addEventListener("click", function () {
            if (button.classList.contains("n")) {
                currentInput += button.innerText;
                display.innerText = `${previousInput} ${operator} ${currentInput}`;
            } else if (button.classList.contains("o")) {
                operator = button.innerText;
                previousInput = currentInput;
                currentInput = '';
                display.innerText = `${previousInput} ${operator}`;
            } else if (button.classList.contains("e")) {
                calculate();
            } else if (button.classList.contains('c')) {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.innerText = '0';
            } else if (button.classList.contains("dot")) {
                currentInput += button.innerText;
                display.innerText = currentInput;
            }
        })
    );
});

const calculate = function () {
    let result;
    const num1 = Number(previousInput);
    const num2 = Number(currentInput);

    if (isNaN(num1) || isNaN(num2)) {
        result = 'Error';
    } else {
        switch (operator) {
            case "-":
                result = num1 - num2;
                break;
            case "+":
                result = num1 + num2;
                break;
            case "x":
                result = num1 * num2;
                break;
            case "÷":
                if (num2 === 0) {
                    result = 'Error'; // Handle division by zero
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                return;
        }
    }
    const display = document.querySelector(".display");
    display.innerText = result;
    currentInput = result.toString(); // Allow chaining calculations
};

// Apply theme when page loads:
const savedTheme = localStorage.getItem('themeColor');
if (savedTheme) {
    right.style.backgroundColor = savedTheme;
}

setting.addEventListener("click", function () {
    changeHTML(htmlCode.setting);

    const themeButtons = document.querySelectorAll(".themesButton");

    themeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const themeColor = button.innerText;
            let color;

            switch (themeColor) {
                case 'Light Blue':
                    color = "#ADD8E6";
                    break;
                case 'Orange':
                    color = "#FFA500";
                    break;
                case 'Teal':
                    color = "#008080";
                    break;
                case 'Coral':
                    color = "#FF7F50";
                    break;
                case 'Purple':
                    color = "#6A0DAD";
                    break;
                default:
                    color = "#222433";
            }

            // Save the selected theme to localStorage
            localStorage.setItem('themeColor', color);
            right.style.backgroundColor = color;
        });
    });
});