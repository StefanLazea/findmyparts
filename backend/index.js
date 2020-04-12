const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3005;
const app = express();

app.use(bodyParser.json());

app.use(cors());

// app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
