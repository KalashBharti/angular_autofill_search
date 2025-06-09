const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/search-list', (req, res) =>
{
    setTimeout(()=>{
        res.json(require('./data/search_list.json'))

    },1000)
})

app.get('/user-details', (req, res) =>
{
    setTimeout(()=>{
        res.json(require('./data/user_details.json'))

    },1500)
})

app.listen(port, () =>{
console.log(`Example app listening on port ${port}`)})
