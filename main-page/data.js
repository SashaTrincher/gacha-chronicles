let user = {
    username: '',
    rubain: 0,
    materials: {
        green: 0,
        red: 0,
        purple: 0,
        yellow: 0
    }
};

let userStorage = JSON.stringify(user);

window.addEventListener('load', () => {
    localStorage.setItem('currentUser', userStorage);
    console.log('saved user');

    setInterval(() => {
        localStorage.setItem('currentUser', userStorage);
        console.log('saved user');
    }, 5000);
})