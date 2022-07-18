const {addOrUpdateCharacter, getCharacterById, getCharacters} = require('./dynamo')

const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use("/static", express.static('./public/'));

const PORT = 8000;


app.get("/", async(req,res)=> {
    const table_data = await getCharacters();

    const organizations = table_data.Items


    res.render("home", {items: organizations})
})

app.post("/add", (req,res) => {
    console.log(req.params)

    res.render("added")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})