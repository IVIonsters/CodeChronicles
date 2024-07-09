//Dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const routes = require('./controllers');
const date = require('./utils/date');

// Import the sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize the application
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ date });

// Set up sessions with cookies
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// Set up middleware
app.use(session(sessionConfig));

// Set up Handlebars.js engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});  