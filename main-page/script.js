// © 2024 Trincher Oleksandr

// dom elements 
const trigger = document.getElementById('trigger');

// variable to extract user profile from localStorage that is defined in /main-page/data.js
let currentUser = localStorage.getItem('currentUser');

// cards array
// array consists of keys with cards, which will be put in their co existing rarity, inside the cards key we will find cards with their following cardName, id key works as a indeticator for specific card, 
// rarity key defines the chance of getting the exact card even after rolling the specific rarity, battleRating key is used to defines the card's battle statistics, imageUrl defines the card's character image and the bgImageUrl defines the 
// card's background image
const cards = {
    sr: { // sr rarity cards 
        value: 50, 
        cards: {
            chopper: {
                cardName: 'Chopper Pre-TS',
                id: 'sr1',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 10,
                imageUrl: '',
            },
            brook: {
                cardName: 'Brook',
                id: 'sr2',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 200,
                imageUrl: '',
            },
            nami: {
                cardName: 'Nami',
                id: 'sr3',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 100,
                imageUrl: '',
            },
            hisoka: {
                cardName: 'Hisoka',
                id: 'sr4',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 250,
                imageUrl: '',
            },
        },     
    },
    ssr: { // ssr rarity cards
        value: 500,
        cards: {
            luffy: {
                cardName: 'Luffy Post-TS',
                id: 'ssr1',
                rarity: 'SSR',
                percentage: '5%',
                battleRating: 2000,
                imageUrl: 'card-img/luffy-post-ts-card.png',
                bgImageUrl: 'card-bg-img/luffy-post-ts-bg.webp',
                upgradeMaterial: {
                    green: 25,
                    red: 50,
                    yellow: 50
                },
            },
            zoro: {
                cardName: 'Zoro Wano',
                id: 'ssr2',
                rarity: 'SSR',
                percentage: '10%',
                battleRating: 1700,
                imageUrl: 'card-img/zoro-wano-card.webp',
                bgImageUrl: 'card-bg-img/zoro-wano-bg.webp'
            },
            sanji: {
                cardName: 'Sanji Wano',
                id: 'ssr3',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 1300,
                imageUrl: '',
            },
            nobara: {
                cardName: 'Nobara Kugisaki',
                id: 'ssr4',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 1200,
                imageUrl: '',
            },
            itadori: {
                cardName: 'Itadori Yuji',
                id: 'ssr5',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 2000,
                imageUrl: '',
            },
            todo: {
                cardName: 'Aoi Todo',
                id: 'ssr6',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 2200,
                imageUrl: '',
            },
            vegetoSsj: {
                cardName: 'Vegeto SSJ',
                id: 'ssr7',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 3000,
                imageUrl: '',
            },
            gokuSsj: {
                cardName: 'Goku SSJ',
                id: 'ssr8',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 3200,
                imageUrl: '',
            },
        },
    },
    ur: { // ur raities cards
        value: 2000, // card value
        cards: {
            luffyUr: {
                cardName: 'Luffy Gear 5',
                id: 'ur1',
                rarity: 'UR',
                percentage: '15%',
                battleRating: 5000,
                imageUrl: 'card-img/luffy-gear-5.png',
            },
        },
    },
};

// function to set cards array to localStorage
let cardsStorage = JSON.stringify(cards);
window.addEventListener('load', () => {
    localStorage.setItem('cardsData', cardsStorage);

    console.log('saved cards data');
});

validateCardStructure();

// function to validate the structure of cards array
function validateCardStructure() {
    const categories = ['sr', 'ssr', 'ur'];

    categories.forEach(category => {
        const categoryCards = cards[category].cards;
        let seenCardNames = new Set(); 
        let seenCardIds = new Set();

        for (let key in categoryCards) {
            if (categoryCards.hasOwnProperty(key)) {
                const card = categoryCards[key];

                if (typeof card.cardName !== 'string' ||
                    typeof card.rarity !== 'string' ||
                    (card.percentage && typeof card.percentage !== 'string')) {
                    throw new Error(`Invalid data type in ${category} for card ${card.id}`);
                } // checks for cardName key to be a string, else throws an error

                if (typeof card.battleRating !== 'number') {
                    throw new Error(`battleRating must be a number in card ${card.id}`);
                } // checks for battleRating key to be a number, else throws an error

                if (seenCardNames.has(card.cardName)) {
                    throw new Error(`Duplicate cardName found in ${category}: ${card.cardName}`);
                } // checks if different cards has matching cardName, if does throws an error
                seenCardNames.add(card.cardName);

                if (seenCardIds.has(card.id)) {
                    throw new Error(`Duplicate id found in ${category}: ${card.id}`);
                } // checks if different cards has matching ids, if does throws an error
                seenCardIds.add(card.id);
            }
        }
    });
};

// dom elements of card element
const cardBr = document.getElementById('cardBr');
const characterImg = document.getElementById('characterImg');
const cardTitle = document.querySelector('.title');
const cardRarity = document.querySelector('.rarity');
const cardValue = document.getElementById('cardVl');
const cardContainer = document.querySelector('.card-container');
const cardFront = document.querySelector('.card-front');

// function to handle changes after the card was rolled
function handleCardChanges(card, rarity) {
    if (cardContainer.classList.contains('inactive')) {
        cardContainer.classList.replace('inactive', 'active')
    }; // switches card visibility after it was rolled, inactive class set's element's style to display: none; and active switches it to display: block;

    cardFront.style.backgroundImage = "url('" + card.bgImageUrl + "')";
    characterImg.src = card.imageUrl;
    cardTitle.innerHTML = card.cardName; 
    cardBr.innerHTML = `Battle Rating: ${card.battleRating}`; 
    cardRarity.innerHTML = card.rarity;

    cardRarity.classList.add(rarity);

    // switches card's value element to corresponding cards.rarity.value
    if (card.id.includes('ssr')) {
        cardValue.innerHTML = `Card's Value: ${cards.ssr.value}`;
    } else if (card.id.includes('sr')) {
        cardValue.innerHTML = `Card's Value: ${cards.sr.value}`;
    }
};

// function to run through the array with ssr rairty cards and find card with corresponding givenId
function findSsrCardById(givenId) {
    validateCardStructure();

    const ssrCards = cards.ssr.cards;

    for (let key in ssrCards) {
        if (ssrCards.hasOwnProperty(key)) {
            if (ssrCards[key].id === givenId) {
                return ssrCards[key];
            }
        }
    }

    return null;
}

// function to run through the array with sr rairty cards and find card with corresponding givenId
function findSrCardById(givenId) {
    validateCardStructure();

    const srCards = cards.sr.cards;

    for (let key in srCards) {
        if (srCards.hasOwnProperty(key)) {
            if (srCards[key].id === givenId) {
                return srCards[key];
            }
        }
    }

    return null;
}

// function to run through array with corresponing to it category (card rarity) 
function getCardIds(category) {
    validateCardStructure();

    const categoryCards = cards[category].cards;
    let cardIds = [];

    for (let key in categoryCards) {
        if (categoryCards.hasOwnProperty(key)) {
            const cardId = categoryCards[key].id;

            if (!cardId.startsWith(category)) {
                throw new Error(`Card ID ${cardId} does not match its category: ${category}`);
            }

            cardIds.push(cardId);
        }
    }

    return cardIds;
};

// defines pityCount that will be updated at further functions
let pityCount = 0;
// defines rarityes that could be rolled
const Rarity = {
    SR: 'sr',
    SSR: 'ssr',
};

// function that selects a random cards.id corresponding to cardIds (defined either as srCardids or ssrCardIds) and rarity (which is written in Rarity array)
function handleCardSelection(cardIds, rarity) {
    const randomId = Math.floor(Math.random() * cardIds.length);
    const selectedCard = (rarity === Rarity.SR) ? findSrCardById(cardIds[randomId]) : findSsrCardById(cardIds[randomId]);

    console.log(`YOU GOT: ${rarity.toUpperCase()}`);
    console.log(selectedCard);

    handleCardChanges(selectedCard, rarity);
};

// function to be used when sr rarity card is rolled, triggers functions to handle changes and getCardIds
function srHandling() {
    validateCardStructure();

    const srCardIds = getCardIds(Rarity.SR);

    handleCardSelection(srCardIds, Rarity.SR);

    if (cardRarity.classList.contains('ssr') || cardRarity.classList.contains('ur')) {
        cardRarity.classList.remove('ssr');
        cardRarity.classList.remove('ur')
    }

    pityCount++;
};

// same as sr rarity card handling but with ssr
function ssrHandling() {
    validateCardStructure();

    const ssrCardIds = getCardIds(Rarity.SSR);

    handleCardSelection(ssrCardIds, Rarity.SSR);

    if (cardRarity.classList.contains('sr') || cardRarity.classList.contains('ur')) {
        cardRarity.classList.remove('sr');
        cardRarity.classList.remove('ur')
    }

    resetStepUp();
};

// step up system
let stepUpCount = 0;
const stepUpMilestones = {
    10: { increaseSSR: 5 }, 
};

// roll probabilities
const probabilities = {
    sr: 95,
    ssr: 5,
    pityThreshold: 60,
};

// function to roll a card
function buyCard(value) {
    validateCardStructure();

    let rollChance = Math.floor(Math.random() * 100);

    stepUpCount++;

    adjustProbabilitiesForStepUp();

    if (probabilities.ssr >= rollChance || probabilities.pityThreshold === pityCount) {
        ssrHandling();
    } else if (probabilities.sr + probabilities.ssr >= rollChance) {
        srHandling();
    } else {
        throw new Error('Roll failed')
    } 
}

// function to handle step up system
function adjustProbabilitiesForStepUp() {
    if (stepUpMilestones[stepUpCount]?.increaseSSR) {
        probabilities.ssr += stepUpMilestones[stepUpCount].increaseSSR;
    }
};

// reset function, usually is being triggers after rolling SSR card
function resetStepUp() {
    stepUpCount = 0;
    pityCount = 0;
    probabilities.ssr = 5;
};