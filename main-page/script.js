// © 2024 Trincher Oleksandr

const trigger = document.getElementById('trigger');
let currentUser = localStorage.getItem('currentUser');

const cards = {
    sr: {
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
    ssr: {
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
    ur: {
        value: 2000,
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

let cardsStorage = JSON.stringify(cards);

window.addEventListener('load', () => {
    localStorage.setItem('cardsData', cardsStorage);

    console.log('saved cards data');
});

validateCardStructure();

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
                }

                if (typeof card.battleRating !== 'number') {
                    throw new Error(`battleRating must be a number in card ${card.id}`);
                }

                if (seenCardNames.has(card.cardName)) {
                    throw new Error(`Duplicate cardName found in ${category}: ${card.cardName}`);
                }
                seenCardNames.add(card.cardName);

                if (seenCardIds.has(card.id)) {
                    throw new Error(`Duplicate id found in ${category}: ${card.id}`);
                }
                seenCardIds.add(card.id);
            }
        }
    });
};

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

function getCardIds(category) {
    validateCardStructure();

    if (typeof category !== 'string') {
        throw new Error('Category must be a string');
    }

    const categoryCards = cards[category].cards;
    let cardIds = [];

    for (let key in categoryCards) {
        if (categoryCards.hasOwnProperty(key)) {
            const cardId = categoryCards[key].id;

            if (cardIds.includes(cardId)) {
                throw new Error('Duplicate card ID found: ' + cardId);
            }

            if (!cardId.startsWith(category)) {
                throw new Error(`Card ID ${cardId} does not match its category: ${category}`);
            }

            cardIds.push(cardId);
        }
    }

    return cardIds;
};

const cardBr = document.getElementById('cardBr');
const characterImg = document.getElementById('characterImg');
const cardTitle = document.querySelector('.title');
const cardRarity = document.querySelector('.rarity');
const cardValue = document.getElementById('cardVl');
const cardContainer = document.querySelector('.card-container');
const cardFront = document.querySelector('.card-front');

function handleCardChanges(card, rarity) {
    if (cardContainer.classList.contains('inactive')) {
        cardContainer.classList.replace('inactive', 'active')
    };

    cardFront.style.backgroundImage = "url('" + card.bgImageUrl + "')";
    characterImg.src = card.imageUrl;
    cardBr.innerHTML = `Battle Rating: ${card.battleRating}`;
    cardTitle.innerHTML = card.cardName;
    cardRarity.innerHTML = card.rarity;

    cardRarity.classList.add(rarity);
    
    if (card.id.includes('ssr')) {
        cardValue.innerHTML = `Card's Value: ${cards.ssr.value}`;
    } else if (card.id.includes('sr')) {
        cardValue.innerHTML = `Card's Value: ${cards.sr.value}`;
    }
}

let pityCount = 0;

function srHandling() {
    validateCardStructure();

    const srCardIds = getCardIds('sr');
    const randomId = Math.floor(Math.random() * srCardIds.length);
    const selectedCard = findSrCardById(srCardIds[randomId]);

    console.log(selectedCard);
    console.log('sr');

    pityCount++;

    console.log(`current pity: ${pityCount}`); 

    if (cardRarity.classList.contains('ssr') || cardRarity.classList.contains('ur')) {
        cardRarity.classList.remove('ssr');
        cardRarity.classList.remove('ur')
    }
    
    handleCardChanges(selectedCard, 'sr');
};

function ssrHandling() {
    validateCardStructure()

    console.log('YOU GOT: SSR');

    const ssrCardIds = getCardIds('ssr');
    const randomId = Math.floor(Math.random() * ssrCardIds.length);
    const foundCard = findSsrCardById(ssrCardIds[randomId]);

    console.log(foundCard);

    pityCount = 0;

    console.log(`current pity: ${pityCount}`);

    if (cardRarity.classList.contains('sr') || cardRarity.classList.contains('ur')) {
        cardRarity.classList.remove('sr');
        cardRarity.classList.remove('ur')
    }

    handleCardChanges(foundCard, 'ssr');
};

function buyCard(value) {
    validateCardStructure();

    let randomNumber = Math.floor(Math.random(1) * 50 + 1);
    console.log(randomNumber);

    if (randomNumber > 48) {
        randomNumber -= 1;
    }

    if (randomNumber < 49) {
        srHandling();
    } else if (randomNumber >= 49) {
        ssrHandling();
    }

    if (pityCount === 45) {
        ssrHandling();
    }
};