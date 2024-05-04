const express = require('express');
const app = express();

let contacts = [];

app.use(express.json());

app.get('/contacts', (req, res) => {
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const {name, email, phone } = req.body
    const newContact = { name, email, phone };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const index = contacts.findIndex(contact => contact.id === parseInt(id));
    if (index !== -1) {
        contacts.splice(index, 1);
        res.json({ message: "Contact deleted"});
    } else {
        res.status(404).json({ message: "Contact not found" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});