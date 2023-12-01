const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.get('/country/:name', async (req, res) => {
    const name = req.params.name;
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        res.json(response.data);
    }catch(error){
        console.error(error);
        res.status(500).send('Error fetching country information');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});