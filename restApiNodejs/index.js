// import express from 'express';
// import users from "./MOCK_DATA.json"
const express = require("express");
const users = require('./MOCK_DATA.json')
const app = express()
const fs = require('fs')

const port= 8000


app.use(express.urlencoded({extended:true}));
// middle ware or plugin bcz express doesnt know about the type of data
// Routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
})
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
});

    app.route('/api/users/:id')
    .get((req, res) => {
        const id = req.params.id;
        const filteredUsers = users.filter(user => user.id == id);

        if (filteredUsers.length > 0) {
            res.json(filteredUsers);
        } else {
            res.status(404).json({ error: 'User not found' });
        }

        // withpu filter 
        // const id = req.params.id;
        //  const user = users.find(user => user.id == id);
        //   res.send(user)
    })
    .patch((req, res) => {

        const id = req.params.id;
        const updatedUser = req.body;
        const index = users.findIndex(user => user.id == id);
        users[index] = { ...users[index], ...updatedUser };
        fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(users));
        res.send(users[index]);
    })
    .delete((req, res) => {
        const userIdToDelete = parseInt(req.params.id);
        console.log(userIdToDelete)
        
        const indexToDelete = users.findIndex(user => user.id === userIdToDelete);
    
       
        if (indexToDelete !== -1) {
            
            const deletedUser = users.splice(indexToDelete, 1)[0];
    
         
            fs.writeFileSync(usersDataPath, JSON.stringify(users));
    
            res.json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }        
     
    });

app.post("/api/users",(req, res) => {
   
    const newuser = req.body;
    console.log(newuser)
    const id = users.length+1
    users.push({id,...newuser})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,res)=>{

    })
    return res.json({status :"Success",id})
})
// without filter
// app.get('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find(user => user.id == id);
//     res.send(user)
// });

app.listen(8000,(req,res)=>{
    console.log(`server is stareted on ${port}`)
})
