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


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});