// © 2024 Trincher Oleksandr

// document.querySelector('.card').addEventListener('click', function() {
//     this.classList.toggle('is-flipped');
// });

// const materialsTrigger = document.querySelector('.user-materials-trigger');
// const materialsHolder = document.querySelector('.user-materials-container');

// materialsTrigger.addEventListener('mouseover', () => {
//         materialsHolder.classList.replace('inactive', 'active');
// });

// materialsTrigger.addEventListener('mouseout', () => {
//         materialsHolder.classList.replace('active', 'inactive');
// });

async function fetchUser() {
    const userResponse = await fetch('https://afxvjdv857.eu-west-3.awsapprunner.com/user');
    const userData = await userResponse.json();

    const rollCost = document.getElementById('spinAmount');
    if (userData.rubain >= 150) {
        rollCost.classList.replace('insufficient', 'sufficient');
    } else {
        rollCost.classList.replace('sufficient', 'insufficient');
    }
};

const shopItems = document.querySelectorAll('.shop-item');
const shopAmounts = document.querySelectorAll('.currencyAmount');

function fetchAllAmounts() {
    return shopAmounts; 
}

const allShopAmounts = fetchAllAmounts();

function addCurrency(value) {
    fetch('https://afxvjdv857.eu-west-3.awsapprunner.com/user/addRubain', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value }),
    })
    .then(response => response.json())
    .then(data => { 
        document.getElementById('userCurrency').innerHTML = data.rubain;  
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        document.getElementById('userCurrency').innerHTML = error;
    });
};

shopItems.forEach((shopItem, index) => {
    if (index < allShopAmounts.length) { 
        switch (index) {
            case 0: 
                allShopAmounts[index].innerHTML = 60; 
                shopItem.addEventListener('click', () => {
                    addCurrency(60);
                });
            break;
            case 1: 
                allShopAmounts[index].innerHTML = 300; 
                shopItem.addEventListener('click', () => {
                    addCurrency(300);
                });
            break;
            case 2: 
                allShopAmounts[index].innerHTML = 980; 
                shopItem.addEventListener('click', () => {
                    addCurrency(980);
                });
            break;
            case 3: 
                allShopAmounts[index].innerHTML = 1980; 
                shopItem.addEventListener('click', () => {
                    addCurrency(1980);
                });
            break;
            case 4: 
                allShopAmounts[index].innerHTML = 3280; 
                shopItem.addEventListener('click', () => {
                    addCurrency(3280);
                });
            break;
            case 5: 
                allShopAmounts[index].innerHTML = 6480;
                shopItem.addEventListener('click', () => {
                    addCurrency(6480);
                }); 
            break;
        }
    }
});

const shopContainer = document.querySelector('.shop-container');
const closeShop = document.querySelector('.close-shop');

closeShop.addEventListener('click', () => {
    shopContainer.classList.replace('active', 'inactive')
});

const gameOffers = document.querySelectorAll('.footer-offers');
gameOffers.forEach((gameOffer, index) => {
    gameOffer.addEventListener('click', () => {
        switch(index) {
            case 0:
                shopContainer.classList.replace('inactive', 'active');
            break;
            case 1:
                return;
            case 2:
                return
        };
    });
});

const moduleCancel = document.getElementById('warningCncl');
const moduleAccept = document.getElementById('warningAcc');
const warningContainer = document.querySelector('.warning-container');
let error = false;

moduleCancel.addEventListener('click', () => {
    warningContainer.classList.replace('active', 'inactive');
});

moduleAccept.addEventListener('click', () => {
    shopContainer.classList.replace('inactive', 'active');
    warningContainer.classList.replace('active', 'inactive');
});

async function fetchData(dataType) {
    const endpoints = {
        'cards': 'cards',
        'probabilities': 'probabilities',
        'stetUpMilestones': 'milestones', 
        'stepUpCount': 'stepUpCount',
        'pityCount': 'pityCount'
    };

    const endpoint = endpoints[dataType];
    if (!endpoint) {
        console.error(`Invalid data type: ${dataType}`);
        return;
    }

    try {
        const response = await fetch(`https://afxvjdv857.eu-west-3.awsapprunner.com/data/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error fetching ${dataType}: Network response was not ok`);
            error = true;
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

async function getPityCount() {
    return await (fetchData('pityCount'));
};

async function initiatePityUpdate(action, value) {
    await updatePityCount(action, value); 
    stepUpCount = await getPityCount(); 
    console.log(stepUpCount); 
};

async function updatePity() {
    let pityCount = await getPityCount();
    const pityElement = document.getElementById('userPity');
    pityElement.innerHTML = pityCount;
};

window.addEventListener('load', () => {
    fetchUser();
    updatePity();
});
if (error === false) {
    setInterval(() => {
        fetchUser();
        updatePity();
    }, 500);
} else {
    console.log('error');
}