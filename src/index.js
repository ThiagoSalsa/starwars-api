const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config(); // importando as variaveis de ambiente

const app = express();
app.use(express.json());
const port = 3000;

const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});


app.get('/',async(req, res) => {
    const films = await Film.find()
    return res.send(films);
});

app.put('/:id', async(req, res) =>{
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    return res.send(film);
})

app.post('/', async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.title,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await film.save();
    return res.send(film);
})

app.delete('/:id', async(req, res) =>{
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.send(film);
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
    mongoose.connect(process.env.URL_DATA_BASE); // Essa é uma variavel de ambiente que deve ser criada e atribuida a url do banco juntamente com as credeciais! 

});