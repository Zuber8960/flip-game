const cardData = [
    { name: 'strawberry', img: 'https://hotemoji.com/images/emoji/o/1yvfi0x1m0k0io.png' },
    { name: 'apple', img: 'https://hotemoji.com/images/emoji/y/17zcrtb1ro19ay.png' },
    { name: 'mango', img: 'https://hotemoji.com/images/emoji/l/kqmjgo15q6dkl.png' },
    { name: 'pineapple', img: 'https://hotemoji.com/images/emoji/l/17zcrtbrf16hl.png' },
    { name: 'guava', img: 'https://hotemoji.com/images/emoji/5/17zcrtb1gokjb5.png' },
    { name: 'orange', img: 'https://hotemoji.com/images/emoji/i/l80silyls6zi.png' },
    { name: 'cherry', img: 'https://hotemoji.com/images/emoji/k/6z6f7w13xwgpk.png' },
    { name: 'grapes', img: 'https://hotemoji.com/images/emoji/g/17zcrtby88zdg.png' },
    
];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Duplicate the array for pairs and shuffle
const shuffledCards = shuffle([...cardData, ...cardData,  ...cardData, ...cardData]); // Double the cards for pairs

const cards = document.querySelectorAll(".card");
const cardContains = document.querySelector('#container');

shuffledCards.forEach(card => {
    const div = document.createElement('div');
    div.classList.add('card');
    const img = document.createElement('img');
    img.src = card.img;
    img.alt = card.name;
    img.name = card.name;
    // Clear existing content and append the image
    div.innerHTML = ''; 
    div.appendChild(img);
    cardContains.appendChild(div);
})


const start = document.getElementById("start");
const reset = document.getElementById("reset");
const moves = document.getElementById("move");
const timer = document.getElementById("timer");

const cardsContainer = document.querySelector(".card-container");

let previousCard;
let flag = false;
let numberOfMatches = 0;
let setIntervalId;

start.addEventListener("click", startGame);
reset.addEventListener("click", endGame);

cardsContainer.addEventListener("click", shuffleEvent);

function startGame(event) {
    start.style.color = "#fff";
    reset.style.color = "gray";
    if (flag === false) {
        setIntervalId = setInterval(() => {
            timer.innerText = Number(timer.innerText) + 1;
        }, 1000);
        flag = true;
    };
};

function endGame(event) {
    if (flag === true) {
        reset.style.color = "#fff";
        start.style.color = "gray";
        clearInterval(setIntervalId);
        flipBackAll();
        timer.innerText = 0;
        moves.innerText = 0;
        flag = false;
        shuffle([...cardData, ...cardData, ...cardData, ...cardData])
    };
}

function flipBackAll () {
    document.querySelectorAll(".card").forEach(card => {
        console.log(card);
        // if (card.classList.contains("rotateImage")) {
        //     card.classList.contains("rotateImage");
        //     card.style.display = "none";
        // };
        card.classList.remove("rotateImage");
        card.classList.add("rotateBack");
        card.firstElementChild.style.display = "none";
        card.classList.remove("rotateImage");
        card.classList.add("rotateBack");
        card.firstElementChild.style.display = "none";
    })
}


let runningCards = 0;


function shuffleEvent(event) {
    // console.log(flag, runningCards, event.target);

    if (event.target.classList.contains("card") && flag && runningCards < 2) {
        moves.innerText = Number(moves.innerText) + 1;
        if (event.target.classList.contains("rotateBack")) {
            event.target.classList.remove("rotateBack");
        };

        event.target.classList.add("rotateImage");
        event.target.firstElementChild.style.display = "block";

        runningCards++;

        if (previousCard === undefined) {
            previousCard = event.target;
            console.log(previousCard);
        } else if (matched(previousCard, event.target) === true) {
            console.log("card matched");

            previousCard = undefined;
            numberOfMatches++;

            runningCards = 0;

            if (numberOfMatches === 8) {
                console.log("all cards matched");
                clearInterval(setIntervalId);
            };

        } else {
            runningCards++;
            setTimeout(() => {

                previousCard.classList.remove("rotateImage");
                previousCard.classList.add("rotateBack");
                previousCard.firstElementChild.style.display = "none";

                event.target.classList.remove("rotateImage");
                event.target.classList.add("rotateBack");
                event.target.firstElementChild.style.display = "none";

                previousCard = undefined;
                runningCards = 0;

            }, 1000);
        }
    }
};


function matched(previousCard, curretCard) {
    if (previousCard.firstElementChild.getAttribute("name") === curretCard.firstElementChild.getAttribute("name")) {
        return true;
    } else {
        return false;
    }
};


const star = document.querySelector(".fa-star");
// console.log(star);

document.body.addEventListener("mouseover", function () {
    // star.style.animation = "movingTopToBottom 5s linear infinite";
    star.style.display = "block";
});
document.body.addEventListener("mouseout", function () {
    star.style.display = "none";
});