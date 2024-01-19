// © 2024 Trincher Oleksandr

// fetching user data
fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('userCurrency').innerHTML = `Rubains: ${data.rubain}`;
        const matItems = document.querySelectorAll('.materials-item');

        matItems.forEach((matItem, index) => {
            if (index === 0) {
                matItem.innerHTML = `Green: ${data.materials.green}`;
            }
            if (index === 1) {
                matItem.innerHTML = `Red: ${data.materials.red}`;
            }
            if (index === 2) {
                matItem.innerHTML = `Purple: ${data.materials.purple}`;
            }
            if (index === 3) {
                matItem.innerHTML = `Yellow: ${data.materials.yellow}`;
            }
        });
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });

// function to add currency (Rubain)
function addCurrency(value) {
    fetch('http://localhost:3000/user/addRubain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  
        document.getElementById('userCurrency').innerHTML = `Rubains: ${data.rubain}`;  
    });
};

// function to remove currency (Rubain)
function removeCurrency(value) {
    fetch('http://localhost:3000/user/removeRubain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        document.getElementById('userCurrency').innerHTML = `Rubains: ${data.rubain}`; 
    });
};


// dom elements 
const trigger = document.getElementById('trigger');

async function fetchData(data) {
    if (data === 'cards') {
        try {
            const cardsResponse = await fetch('http://localhost:3000/data/cards');
            const cardsData = await cardsResponse.json();
            return cardsData;

        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }
    if (data === 'probabilities') {
        try {
            const probsResponse = await fetch('http://localhost:3000/data/probabilities');
            const probsData = await probsResponse.json();
            return probsData;

        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }
    if (data === 'stetUpMilestones') {
        try {
            const milestonesResponse = await fetch('http://localhost:3000/data/milestones');
            const milestonesData = await milestonesResponse.json();
            return milestonesData;

        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    }
};

(async () => {
    const cards = await fetchData('cards');

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

        handleCardChanges(selectedCard, rarity);
    };

    // function to be used when sr rarity card is rolled, triggers functions to handle changes and getCardIds
    function srHandling() {
        

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
        

        const ssrCardIds = getCardIds(Rarity.SSR);

        handleCardSelection(ssrCardIds, Rarity.SSR);

        if (cardRarity.classList.contains('sr') || cardRarity.classList.contains('ur')) {
            cardRarity.classList.remove('sr');
            cardRarity.classList.remove('ur')
        }

        resetStepUp();
    };

    // probabilities for cards
    const probabilities = await (fetchData('probabilities'));

    // step up system
    let stepUpCount = 0;
    const stepUpMilestones = await (fetchData('stetUpMilestones'));

    // function to roll a card
    function buyCard(value) {
        fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            console.log(`Prob SSR: ${probabilities.ssr}. Prob SR: ${probabilities.sr}`);
            console.log(`Step Up: ${stepUpCount}`);

            

            if (data.rubain >= value) {
                stepUpCount++;

                adjustProbabilitiesForStepUp();

                fetch('http://localhost:3000/roll/chanceRoll')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        if (probabilities.ssr >= data || probabilities.pityThreshold === pityCount) {
                            ssrHandling();
                        } else if (probabilities.sr + probabilities.ssr >= data) {
                            srHandling();
                        } else {
                            throw new Error('Roll failed');
                        };
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

                removeCurrency(value);
            } else {
                alert(`You don't have enough Rubain. Your current Rubain amount is: ${data.rubain}`)
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    };

    trigger.addEventListener('click', () => {
        buyCard(150);
    })

    // function to handle step up system
    function adjustProbabilitiesForStepUp() {
        if (stepUpMilestones[stepUpCount]?.increaseSSR) {
            probabilities.ssr += stepUpMilestones[stepUpCount].increaseSSR;
            probabilities.sr -= stepUpMilestones[stepUpCount].increaseSSR;
        }
    };

    // reset function, usually is being triggers after rolling SSR card
    function resetStepUp() {
        stepUpCount = 0;
        pityCount = 0;
        probabilities.ssr = 1;
        probabilities.sr = 99;
    };

    // function to set cards array to localStorage
    let cardsStorage = JSON.stringify(cards);
    window.addEventListener('load', () => {
        localStorage.setItem('cardsData', cardsStorage);

        console.log('saved cards data');
    });
})();