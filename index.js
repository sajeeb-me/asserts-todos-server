const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from ASSERT's TODOS!")
})

app.listen(port, () => {
    console.log(`Asserts todos is listening on port ${port}`)
})