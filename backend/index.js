const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const model = require('./models');
const dotenv = require('dotenv');
const uploader = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploader());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT;
model.sequelize.sync();

app.use('/', express.static('../front/build'));

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
