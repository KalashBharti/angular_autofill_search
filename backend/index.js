const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors());
app.use(express.json());

app.get('/search-list', (req, res) => {
    setTimeout(() => {
        res.json(require('./data/search_list.json'))

    }, 1000)
})


app.get('/user-details', (req, res) => {
    setTimeout(() => {
        res.json(require('./data/user_details.json'))

    }, 1500)
})

app.get('/client-list/:clientName', (req, res) => {
    const { clientName } = req.params;
    const clientList = require('./data/client_search.json');

    const filterClientList = clientList.filter(client => {
        return client.clientName.toLowerCase().startsWith(clientName.toLowerCase());

    })
    setTimeout(() => {
        res.json(filterClientList)

    }, 1000)


})

app.post('/client-details', (req, res) => {


    const { clientId, clientName } = req.body;

    if (!clientName) {
        return res.status(400).json({ error: 'clientName is required' });
    }
    const clientList = require('./data/client_Data.json');
    let filterClientList = [];
    if (clientName === ' ') {
        filterClientList = clientList;
    }
    else {
         filterClientList = clientList.filter(client => {
            let refined = client.clientName.toLowerCase().startsWith(clientName.toLowerCase());

            if (clientId) {
                refined = refined && client.clientId === clientId;
            }

            return refined;

        })
    }
    setTimeout(() => {
        res.json(filterClientList)

    }, 1500)

})
// temporary storage for users
const users =[];
app.post('/register-user',(req, res)=>{
    const {email} = req.body;
    console.log(req.body);
    
    const exist = users.filter(user=> user.email === email);
    if(exist.length > 0){
        res.status(400);
        res.json({success:false, message : 'User already exists with this email.'});
    
    }
    else{
        
        users.push(req.body);
        res.json({success:true, message : 'User registered successfully.'});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
