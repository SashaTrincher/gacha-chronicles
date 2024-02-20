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
    const userResponse = await fetch('http://localhost:3000/user');
    const userData = await userResponse.json();

    const rollCost = document.getElementById('spinAmount');
    if (userData.rubain >= 150) {
        rollCost.classList.replace('insufficient', 'sufficient');
    } else {
        rollCost.classList.replace('sufficient', 'insufficient');
    }
};

setInterval(() => {
    fetchUser();
}, 3000);