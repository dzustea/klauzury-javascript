// Inicializace codu pro správu skóre po načtení stránky
document.addEventListener("DOMContentLoaded", () => {
    // Odkaz na element s celkovým skóre
    const totalScoreElement = document.getElementById('totalScore');

    // Funkce pro aktualizaci celkového skóre
    function updateTotalScore() {
        let totalScore = parseInt(localStorage.getItem('totalScore')) || 0; // načtení score z localstorage, když neni dostupné použije se 0 

        // Kontrola, zda je kvíz dokončen a skóre není přidáno
        const quizCompleted = sessionStorage.getItem("quizCompleted") === "true";
        const scoreAdded = localStorage.getItem("scoreAdded") === "true";

        // Přidání skóre, pokud je kvíz dokončen a skóre není přidáno
        // Hlídáni přičtení score a jeho přidání k aktuálnímu
        if (quizCompleted && !scoreAdded) {
            const totalQuizScore = calculateTotalScore();
            totalScore += totalQuizScore;
            localStorage.setItem('totalScore', totalScore);
            localStorage.setItem('scoreAdded', 'true');
            totalScoreElement.textContent = totalScore;
        } else {
            totalScoreElement.textContent = totalScore;
        }
    }

    updateTotalScore();
});

// Výpočet celkového skóre ze všech obtížností
function calculateTotalScore() {
    const easyScore = parseInt(localStorage.getItem("easyScore")) || 0;
    const normalScore = parseInt(localStorage.getItem("normalScore")) || 0;
    const hardScore = parseInt(localStorage.getItem("hardScore")) || 0;
    return easyScore + normalScore + hardScore;
}

// Resetování celkového skóre a tabulky skóre
function resetScore() {
    localStorage.setItem('totalScore', '0');
    localStorage.removeItem('scoreAdded');
    const totalScoreElement = document.getElementById("totalScore");
    if (totalScoreElement) totalScoreElement.textContent = "0";
    if (scoreTable) scoreTable.innerHTML = "";
}
