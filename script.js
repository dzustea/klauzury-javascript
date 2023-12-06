let currentQuiz;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let score = 0;
let quizStartTime;
let jokerUsed = false;
let correctAnswerIndex;
let timerInterval;

// Funkce pro aktualizaci skóre na stránce
function updateScore(value) {
    score += value;
    const scoreElement = document.getElementById("totalScore");
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

$(document).ready(function () {
    var savedBackgroundColor = localStorage.getItem('backgroundColor');

    // Pokud je uložená barva, nastaví pozadí a aktualizuje styly
    if (savedBackgroundColor) {
        $('body').css('background-color', savedBackgroundColor);
        updateStyles(savedBackgroundColor === '#363062');
    }
    // Změna dark modu
    $('#darkmode-toggle').change(function () {
        var isDarkMode = $(this).is(':checked');
        var backgroundColor = isDarkMode ? '#363062' : 'white';

        // Uložení barvy pozadí do localStorage
        localStorage.setItem('backgroundColor', backgroundColor);

        $('body').css('background-color', backgroundColor);
        updateStyles(isDarkMode);

        // Propagace změny barvy na další stránky
        propagateBackgroundColor(backgroundColor);
    });

    // Posluchač události pro tlačítko v kvízu
    $(".custom-button").on("click", function () {
        // Pokud joker nebyl použit, obnoví možnost odpovědí
        if (!jokerUsed) {
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.style.backgroundColor = '';
                option.disabled = false;
            });
        }
    });
});

// Nastaví změnu barvy pozadí na další stránky
function propagateBackgroundColor(backgroundColor) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    var otherPages = ['easy.html', 'normal.html', 'hard.html'];

    // Nastaví novou barvu pozadí pro každou další stránku
    otherPages.forEach(function (page) {
        iframe.src = page;
    });

    // Odstranění iframe po načtení stránek
    iframe.onload = function () {
        iframe.parentNode.removeChild(iframe);
    };
}

// Aktualizuje styly podle dark/light módu
function updateStyles(isDarkMode) {
    updateTextColor(isDarkMode);
    updateIconColor(isDarkMode);
    updatePopupBackground(isDarkMode);
}

// Aktualizuje barvu textu podle dark/light módu
function updateTextColor(isDarkMode) {
    var body = $('body');
    var pElements = $('p');
    var h3Elements = $('h3');
    var pravidlaLiElements = $('.pravidla li');
    var tdElements = $('td');
    var thElements = $('th');

    // Nastavuje barvu textu podle módu
    if (isDarkMode) {
        pElements.css({ 'color': 'white', 'transition': 'color 0.5s' });
        h3Elements.css({ 'color': 'white', 'transition': 'color 0.5s' });
        pravidlaLiElements.css({ 'color': 'white', 'transition': 'color 0.5s' });
        tdElements.css({ 'color': 'white', 'transition': 'color 0.5s' });
        thElements.css({ 'color': 'white', 'transition': 'color 0.5s' });
    } else {
        pElements.css({ 'color': 'black', 'transition': 'color 0.5s' });
        h3Elements.css({ 'color': 'black', 'transition': 'color 0.5s' });
        pravidlaLiElements.css({ 'color': 'black', 'transition': 'color 0.5s' });
        tdElements.css({ 'color': 'black', 'transition': 'color 0.5s' });
        thElements.css({ 'color': 'black', 'transition': 'color 0.5s' });
    }
}

// Aktualizuje barvu ikon podle dark/light módu
function updateIconColor(isDarkMode) {
    var body = $('body');
    var icon = $('#iconLink svg');

    var backgroundColor = window.getComputedStyle(body[0]).backgroundColor;

    var iconColor = isDarkMode ? 'white' : 'black';

    icon.css({ 'fill': iconColor, 'transition': 'fill 0.5s' });
}

// Aktualizuje pozadí popup okna podle dark/light módu
function updatePopupBackground(isDarkMode) {
    var popup = $('#popup');

    // Odebere existující třídy a přidá třídu podle módu
    popup.removeClass('dark-popup light-popup').addClass(isDarkMode ? 'dark-popup' : 'light-popup');

    // Odebere třídu 'visible' (pro přidaný efekt)
    popup.removeClass('visible');

    // Pokud popup není otevřen, přidá třídu 'visible' po krátké pauze
    if (!popup.hasClass('open')) {
        popup.css('transition', 'background-color 0.10s');
        setTimeout(function () {
            popup.addClass('visible');
        }, 50);
    }
}

// Po načtení stránky přidá posluchače událostí pro otevírání/zavírání popup okna
window.addEventListener("load", function () {
    const overlay = document.getElementById("overlay");
    const originalOverlayColor = window.getComputedStyle(overlay)['background-color'];
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeButton");
    const iconLink = document.getElementById("iconLink");
    const buttons = document.querySelectorAll(".custom-button");
    const darkThemeBtn = document.querySelector(".darkThemeBtn");

    // Funkce pro otevření popup okna
    function openWindow() {
        overlay.style.display = "block";
        popup.style.transition = "right 0.7s";
        popup.style.right = "0";

        buttons.forEach(button => {
            button.style.pointerEvents = "none";
        });

        iconLink.style.display = "none";
        darkThemeBtn.style.display = "none";
    }

    // Funkce pro zavření popup okna
    function closeWindow() {
        popup.style.transition = "right 1.2s";
        popup.style.right = "-100%";

        overlay.style.transition = "background-color 0.10s";
        overlay.style.backgroundColor = originalOverlayColor;
        overlay.style.opacity = 1;

        // Resetování stylů po zavření popup okna
        setTimeout(() => {
            overlay.style = "";
            popup.style = "";

            buttons.forEach(button => {
                button.style.pointerEvents = "auto";
            });

            iconLink.style.display = "block";
            darkThemeBtn.style.display = "block";
        }, 500);
    }

    // Přidání posluchačů událostí
    iconLink.addEventListener("click", openWindow);
    closeButton.addEventListener("click", closeWindow);
});

// Funkce pro spuštění kvízu
function startQuiz(quiz) {
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    score = 0;
    jokerUsed = false;
    generateQuestion();

    quizStartTime = new Date().getTime();

    // Spuštění timeru
    startTimer();
}

// Funkce generující otázky pro kvíz
function generateQuestion() {
    // Získání elementů pro otázku a možnosti odpovědí
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    // Získání aktuální otázky ze seznamu otázek kvízu
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    // Nastavení textu otázky na stránce
    questionElement.textContent = currentQuestion.question;

    // Dokončení seznamu možností odpovědí
    optionsElement.innerHTML = "";

    // Pro každou možnost odpovědi vytvoření tlačítka a přidání do seznamu
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.className = "option";

        // Přidání třídy pro špatnou odpověď, pokud možnost není správná
        if (currentQuestion.correctAnswer !== option) {
            optionElement.classList.add("wrong");
        }

        // Přidání posluchače událostí pro kliknutí na možnost odpovědi
        optionElement.addEventListener("click", () => checkAnswer(index));

        // Přidání možnosti odpovědi do seznamu
        optionsElement.appendChild(optionElement);
    });

    // Resetování vzhledu možností odpovědí před každou novou otázkou
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.backgroundColor = '';
        option.disabled = false;
    });
}

// Funkce ověřující odpověď na otázku
function checkAnswer(selectedIndex) {
    // Index správné odpovědi pro aktuální otázku
    correctAnswerIndex = currentQuiz.questions[currentQuestionIndex].options.findIndex(option => option === currentQuiz.questions[currentQuestionIndex].correctAnswer);

    // Změna vzhledu odpovědí podle správnosti a deaktivace možností odpovědí
    if (!jokerUsed) {
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            const backgroundColor = index === correctAnswerIndex ? 'green' : 'red'; 
            option.style.backgroundColor = backgroundColor;
            option.disabled = true;
        });
    }

    // Aktualizace skóre a zobrazení výsledku
    const isCorrect = selectedIndex === correctAnswerIndex;
    updateScore(isCorrect ? 1 : 0);
    displayResult(isCorrect);
}

// Funkce zobrazující výsledek odpovědi pomocí modálního okna
function displayResult(isCorrect) {
    const resultText = isCorrect ? "Správná odpověď" : "Špatná odpověď";
    const resultColor = isCorrect ? "green" : "red";

    // Zobrazení modálního okna s výsledkem
    Swal.fire({
        title: resultText,
        icon: isCorrect ? 'success' : 'error',
        background: resultColor,
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false
    });

    // Zobrazení výsledku na stránce
    const resultElement = document.getElementById("result");
    resultElement.textContent = resultText;
    resultElement.style.backgroundColor = resultColor;
    resultElement.style.display = "block";

    // Přechod na další otázku nebo ukončení kvízu po krátké době
    setTimeout(() => {
        resultElement.style.display = "none";
        currentQuestionIndex++;

        if (currentQuestionIndex < currentQuiz.questions.length) {
            generateQuestion();
        } else {
            clearInterval(timerInterval);
            showQuizCompletionPopup();
        }
    }, 1000);
}

// Funkce formátující čas - hoiny, minuty, sekundy, setiny
function formatTime(hours, minutes, seconds, milliseconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

// Funkce spouštějící časovač pro kvíz
function startTimer() {
    // Inicializace proměnných pro čas
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    // Získání elementu pro zobrazení časovače
    const timerElement = document.getElementById('timer');

    // Při neexistenci elementu ukončení funkce
    if (!timerElement) {
        return;
    }

    // Nastavení intervalu pro aktualizaci času každých 10 milisekund
    timerInterval = setInterval(() => {
        milliseconds += 10;

        // Přechod na další jednotky času při dosažení maximální hodnoty
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;

                if (minutes === 60) {
                    minutes = 0;
                    hours++;

                    // Ukončení časovače po dosažení maximální hodnoty (9:59:59:59)
                    if (hours === 10) {
                        clearInterval(timerInterval);
                        console.log("Timer dosáhl maximální hodnoty 9:59:59.99.");
                    }
                }
            }
        }

        // Aktualizace zobrazeného času na stránce
        if (timerElement) {
            timerElement.textContent = formatTime(hours, minutes, seconds, milliseconds);
        }
    }, 10);
}

// Spuštění časovače při načtení stránky
document.addEventListener("DOMContentLoaded", startTimer);

// Spuštění časovače při startu kvízu
startTimer();

// Funkce zobrazující výsledek odpovědi s označením správné a špatné odpovědi
function displayResult(isCorrect, selectedIndex) {
    // Získání všech možností odpovědí
    const options = document.querySelectorAll('.option');
    // Nastavení barvy odpovědí podle správnosti
    options.forEach((option, index) => {
        if (index === correctAnswerIndex) {
            option.style.backgroundColor = '#80b918';  
        } else {
            option.style.backgroundColor = '#e5383b';  
        }
        option.disabled = true;  
    });

    // Text a barva výsledku pro zobrazení v modálním okně
    const resultText = isCorrect ? "Správná odpověď" : "Špatná odpověď";
    const resultColor = isCorrect ? "#80b918" : "#e5383b";

    // Zobrazení modálního okna s výsledkem
    Swal.fire({
        title: resultText,
        icon: isCorrect ? 'success' : 'error',
        background: resultColor,
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false
    });

    // Přechod na další otázku nebo ukončení kvízu po krátké době
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < currentQuiz.questions.length) {
            generateQuestion();
            options.forEach(option => {
                option.style.backgroundColor = '';
                option.disabled = false;
            });
        } else {
            clearInterval(timerInterval);

            // Získání uplynulé doby kvízu
            const elapsed = new Date().getTime() - quizStartTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const milliseconds = elapsed % 1000;

            // Zobrazení výsledku kvízu v modálním okně
            Swal.fire({
                title: `Dokončil si kvíz za ${formatTime(hours, minutes, seconds, milliseconds)} a získal si ${score} bodů!`,
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });

            // Uložení informací o dokončení kvízu do úložiště
            sessionStorage.setItem("quizCompleted", "true");
            localStorage.setItem("totalScore", parseInt(localStorage.getItem("totalScore")) + score)

            // Přesměrování na index.html
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    }, 1000);
}

// Funkce pro použití žolíka
function useJoker() {
    // Ověření, zda žolík nebyl již použit
    if (!jokerUsed) {
        jokerUsed = true;

        // Získání všech možností odpovědí
        const options = document.querySelectorAll('.option');
        // Získání indexu správné odpovědi pro aktuální otázku
        correctAnswerIndex = currentQuiz.questions[currentQuestionIndex].options.findIndex(option => option === currentQuiz.questions[currentQuestionIndex].correctAnswer);

        displayJokerAnimation(options);
    }
}

// Funkce pro zobrazení animace pro použití žolíka
function displayJokerAnimation(options) {
    // Nastavení barvy pro každou možnost odpovědi
    options.forEach((option, index) => {
        const backgroundColor = index === correctAnswerIndex ? '#80b918' : '#e5383b'; 
        option.style.backgroundColor = backgroundColor;
        option.disabled = true;  // Zakázání kliknutí na možnosti odpovědí
    });

    // Aktualizace skóre - přidání bodu za použití žolíka
    updateScore(1);

    // Zakázání tlačítka pro použití žolíka
    const jokerButton = document.getElementById('jokerButton');
    jokerButton.disabled = true;

    // Zobrazení notifikace o použití žolíka
    Swal.fire({
        title: 'Žolík použit!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    }).then(() => {
        // Resetování možností odpovědí
        resetOptions(options);

        // Přechod na další otázku nebo zobrazení závěrečné notifikace po dokončení kvízu
        currentQuestionIndex++;

        if (currentQuestionIndex < currentQuiz.questions.length) {
            generateQuestion();
        } else {
            clearInterval(timerInterval);
            showQuizCompletionPopup();
        }
    });
}

// Funkce pro resetování možností odpovědí
function resetOptions(options) {
    options.forEach(option => {
        option.style.backgroundColor = ''; // Resetování barev
        option.disabled = false; // Odblokování možností odpovědí
    });
}

// Událost zpracovávající načtení dokumentu - nastavení hacker módu
document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;

    // Zjištění, zda je aktivní hacker mód
    var isHackerMode = localStorage.getItem('hackerMode') === 'true';

    // Přidání nebo odebrání třídy pro hacker mód
    if (isHackerMode) {
        body.classList.add('hacker-mode');
    }

    // Přidání posluchače události pro tlačítko pro změnu hacker módu
    document.getElementById('my-button-hacker').addEventListener('click', function () {
        isHackerMode = !isHackerMode;

        localStorage.setItem('hackerMode', isHackerMode);

        if (isHackerMode) {
            body.classList.add('hacker-mode');
        } else {
            body.classList.remove('hacker-mode');
        }
    });
});

// Funkce pro změnu barev - přepínání hacker módu
function changeColors() {
    var body = document.body;

    // Přidání nebo odebrání třídy pro hacker mód
    if (!body.classList.contains('hacker-mode')) {
        body.classList.add('hacker-mode');
    } else {
        body.classList.remove('hacker-mode');
    }
}