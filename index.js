const express = require('express')
const cors = require('cors');
const userRoutes = require('./routes/users.routes');
const rutasAuth = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const { dbConnection } = require('./database/config');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// pagina de inicio.
app.get("/", function (req, res) {
    // GET - http://localhost:3000
    res.send("API v1.0 eccomerce");
});

(async()=>{
    // Funcion que se ejecuta al entrar en el archivo index.js
    await dbConnection();
    const rutaBase = '/api/v1';
    app.use(rutaBase, userRoutes);
    app.use(rutaBase, rutasAuth);
    app.use(rutaBase, productRoutes);
})();



app.listen(PORT, () => console.log(`La applicacion esta corriendo en el puerto ${PORT}!`));