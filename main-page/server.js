const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  

let userData = {
    username: '',
    rubain: 0,
    materials: {
        green: 0,
        red: 0,
        purple: 0,
        yellow: 0
    }
};

app.get('/user', (req, res) => {
    res.json(userData);
});

app.post('/user/addRubain', (req, res) => {
    const { value } = req.body;
    userData.rubain += value;
    res.json({ rubain: userData.rubain });
});

app.post('/user/removeRubain', (req, res) => {
    const { value } = req.body;
    userData.rubain -= value;
    res.json({ rubain: userData.rubain });
});

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
                imageUrl: 'card-img/chopper-pre.webp',
            },
            brook: {
                cardName: 'Brook',
                id: 'sr2',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 50,
                imageUrl: 'card-img/brook.png',
            },
            nami: {
                cardName: 'Nami',
                id: 'sr3',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 100,
                imageUrl: 'card-img/nami-card.png',
            },
            hisoka: {
                cardName: 'Hisoka',
                id: 'sr4',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 100,
                imageUrl: 'card-img/hisoka.png',
            },
            asuna: {
                cardName: 'Asuna',
                id: 'sr5',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 200,
                imageUrl: 'card-img/asuna.png',
            },
            kirito: {
                cardName: 'Kirito',
                id: 'sr6',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 300,
                imageUrl: '',
            },
            denji: {
                cardName: 'Denji',
                id: 'sr7',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 300,
                imageUrl: '',
            },
            sanjiprets: {
                cardName: 'Sanji Pre-TS',
                id: 'sr8',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 100,
                imageUrl: '',
            },
            zoroprets: {
                cardName: 'Zoro Pre-TS',
                id: 'sr9',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 150,
                imageUrl: '',
            },
            ichigohum: {
                cardName: 'Ichigo (Human)',
                id: 'sr10',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 10,
                imageUrl: '',
            },
            josephjos: {
                cardName: 'Joseph Joestar',
                id: 'sr11',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 100,
                imageUrl: '',
            },
            sunjinwoopre: {
                cardName: 'Sung Jinwoo',
                id: 'sr12',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 10,
                imageUrl: '',
            },
            dekuprequirk: {
                cardName: 'Deku',
                id: 'sr13',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 5,
                imageUrl: '',
            },
            escanorpre: {
                cardName: 'Escanor',
                id: 'sr14',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 5,
                imageUrl: '',
            },
            meliodassealed: {
                cardName: 'Meliodas (Base)',
                id: 'sr15',
                rarity: 'SR',
                percentage: '25%',
                battleRating: 150,
                imageUrl: '',
            },
            tanjiropre: {
                cardName: 'Tanjiro (Base)',
                id: 'sr16',
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
                cardName: 'Nobara',
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
            gabimaru: {
                cardName: 'Gabimaru',
                id: 'ssr9',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 900,
                imageUrl: '',
            },
            escanorsun: {
                cardName: 'Escanor (Sun)',
                id: 'ssr10',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 1500,
                imageUrl: '',
            },
            meliodaspostrev: {
                cardName: 'Meliodas',
                id: 'ssr11',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 2000,
                imageUrl: '',
            },
            tanjiropost: {
                cardName: 'Tanjiro',
                id: 'ssr12',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 1500,
                imageUrl: '',
            },
            gojo: {
                cardName: 'Gojo',
                id: 'ssr13',
                rarity: 'SSR',
                percentage: '15%',
                battleRating: 4000,
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
                imageUrl: '',
            },
            escanorfull: {
                cardName: 'Escanor (Full Sun)',
                id: 'ur2',
                rarity: 'UR',
                percentage: '15%',
                battleRating: 4000,
                imageUrl: '',
            },
            meliodasking: {
                cardName: 'Meliodas Demon King',
                id: 'ur3',
                rarity: 'UR',
                percentage: '15%',
                battleRating: 5000,
                imageUrl: '',
            },
            tanjirofull: {
                cardName: 'Tanjiro',
                id: 'ur4',
                rarity: 'UR',
                percentage: '15%',
                battleRating: 5000,
                imageUrl: '',
            },
            gojosuk: {
                cardName: 'Gojo',
                id: 'ur5',
                rarity: 'UR',
                percentage: '15%',
                battleRating: 6000,
                imageUrl: '',
            },
        },
    },
};

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

validateCardStructure();

app.get('/data/cards', (req, res) => {
    res.json(cards)
});

// roll probabilities
const probabilities = {
    sr: 99,
    ssr: 1,
    pityThreshold: 60,
};

app.get('/data/probabilities', (req, res) => {
    res.json(probabilities);
});

const stepUpMilestones = {
    5: { increaseSSR: 1 }, 
    10: { increaseSSR: 1 },
    15: { increaseSSR: 1 },
    20: { increaseSSR: 2},
    25: { increaseSSR: 2},
    30: { increaseSSR: 5},
    35: { increaseSSR: 10},
    40: { increaseSSR: 15},
    45: { increaseSSR: 25},
    50: { increaseSSR: 20},
};

app.get('/data/milestones', (req, res) => {
    res.json(stepUpMilestones);
});

app.get('/roll/chanceRoll', (req, res) => {
    let rollChance = Math.floor(Math.random() * 100);
    res.json(rollChance)
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});