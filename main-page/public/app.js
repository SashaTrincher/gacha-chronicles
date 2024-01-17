document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('is-flipped');
});

const materialsTrigger = document.querySelector('.user-materials-trigger');
const materialsHolder = document.querySelector('.user-materials-container');

materialsTrigger.addEventListener('mouseover', () => {
        materialsHolder.classList.replace('inactive', 'active');
});

materialsTrigger.addEventListener('mouseout', () => {
        materialsHolder.classList.replace('active', 'inactive');
});