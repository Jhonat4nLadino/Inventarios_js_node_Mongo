const express = require('express');
const { getConnection } = require('./dataBase/db-connection-mongo');

const app = express();
const port = 3000;

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