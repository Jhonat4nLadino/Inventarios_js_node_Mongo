const express = require('express');
const { getConnection } = require('./dataBase/db-connection-mongo');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT;
//const whiteList = ['http://localhost:3000/', 'http://localhost:4000/'];
//app.use(cors({ origin: whiteList }));

app.use(cors());

getConnection();

app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/inventario', require('./router/inventario'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});