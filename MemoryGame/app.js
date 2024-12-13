document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("#game");
    const scoreDisplay = document.querySelector("#score");
    let score = 0;
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];

    const cardArr = [
        { name: "🍨", dataName: "icecream" },
        { name: "🍨", dataName: "icecream" },
        { name: "🧁", dataName: "cupcake" },
        { name: "🧁", dataName: "cupcake" },
        { name: "🍰", dataName: "shortcake" },
        { name: "🍰", dataName: "shortcake" },
        { name: "🍧", dataName: "softicecream" },
        { name: "🍧", dataName: "softicecream" },
    ];
    cardArr.sort(() => 0.5 - Math.random());

    function Board() {
        cardArr.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.setAttribute("class", "card");
            cardElement.setAttribute("data", index);
            cardElement.setAttribute("data-name", card.dataName);
            cardElement.addEventListener("click", flip);
            grid.appendChild(cardElement);
        });
    }

    function flip() {
        const cardId = this.getAttribute("data");
        if (!cardsChosenIds.includes(cardId) && cardsChosen.length < 2) {
            cardsChosen.push(cardArr[cardId].name);
            cardsChosenIds.push(cardId);
            this.classList.add("flip");
            this.textContent = cardArr[cardId].name;

            if (cardsChosen.length === 2) {
                setTimeout(check, 500);
            }
        }
    }

    function check() {
        const cards = document.querySelectorAll(".card");
        const [firstCardId, secondCardId] = cardsChosenIds;

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[firstCardId].classList.add("match");
            cards[secondCardId].classList.add("match");
            cardsWon.push(cardsChosen[0]);
            score++;
            scoreDisplay.textContent = score;
        } else {
            cards[firstCardId].classList.remove("flip");
            cards[secondCardId].classList.remove("flip");
            cards[firstCardId].textContent = "";
            cards[secondCardId].textContent = "";
        }
        cardsChosen = [];
        cardsChosenIds = [];
        if (cardsWon.length === cardArr.length / 2) {
            alert("Congratulations! You've won!");
        }
    }
    Board();
});
