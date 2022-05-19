const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
    
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            products: '/api/products',
            category: '/api/category'
        }
        //connect db
        this.connectDb();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }


    async connectDb() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // read and parse json
        this.app.use(express.json());
        // public dir
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.products, require('../routes/products.routes.js'));
        this.app.use(this.paths.category, require('../routes/categories.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on port: ', this.port);
        });
    }

}
module.exports = Server;
