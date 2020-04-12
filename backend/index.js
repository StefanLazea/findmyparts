const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const model = require('./models');
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = 3005;
const app = express();

app.use(bodyParser.json());

app.use(cors());
dotenv.config();

model.sequelize.sync({ force: true });

app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
