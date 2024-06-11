const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    refreshBtn = document.querySelector(".details button");

let maxTime = 1000;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 6 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

// PIXIJS CODE INTEGRATION
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
document.getElementById('pixi-container').appendChild(app.view);

const slideImages = [
    'images/img-1.png',
    'images/img-2.png',
    'images/img-3.png',
    'images/img-4.png',
    'images/img-5.png',
    'images/img-6.png'
];
const itemsTitles = [
    'Title 1',
    'Title 2',
    'Title 3',
    'Title 4',
    'Title 5',
    'Title 6'
];
const backgroundDisplacementSprite = 'img/map-9.jpg';
const cursorDisplacementSprite = 'img/displace-circle.png';

const loader = PIXI.Loader.shared;
slideImages.forEach(image => loader.add(image));
loader.add('backgroundDisplacement', backgroundDisplacementSprite);
loader.add('cursorDisplacement', cursorDisplacementSprite);
loader.load(setup);

let currentIndex = 0;
let slides = [];
let displacementSprite, cursorSprite;

function setup() {
    displacementSprite = new PIXI.Sprite(loader.resources['backgroundDisplacement'].texture);
    cursorSprite = new PIXI.Sprite(loader.resources['cursorDisplacement'].texture);

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    cursorSprite.anchor.set(0.5);
    cursorSprite.scale.set(0.65);

    app.stage.addChild(displacementSprite);
    app.stage.addChild(cursorSprite);

    slideImages.forEach((image, index) => {
        const texture = PIXI.Texture.from(image);
        const slide = new PIXI.Sprite(texture);
        slide.width = app.screen.width;
        slide.height = app.screen.height;
        slide.alpha = index === currentIndex ? 1 : 0;
        slides.push(slide);
        app.stage.addChild(slide);
    });

    app.ticker.add(() => {
        displacementSprite.x += 1;
        displacementSprite.y += 1;

        cursorSprite.x = app.renderer.plugins.interaction.mouse.global.x;
        cursorSprite.y = app.renderer.plugins.interaction.mouse.global.y;
    });

    document.querySelector('.details button').addEventListener('click', nextSlide);
}

function nextSlide() {
    slides[currentIndex].alpha = 0;
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].alpha = 1;
}
