/**
 *  This is the main file for the Back-End server related to the thesis
 *  Subjective Multimedia Quality Evaluation - Polito
 *  Name:       Franklin David
 *  Surname:    Macias Avellan
 *  Student ID: 217594
 */


/**
 *  Package require for the project
 *  Divided in three groups
 *  First group: provided by Node.js
 *  Second groupd: installed using npm
 *  Third group: defined by me
 */
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/adminRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

/**
 *  Working with files using multer (images/videos)
 */
const fileStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'stimuli');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||
        file.mimetype === 'video/mp4' || file.mimetype === 'video/avi' || file.mimetype === 'video/mkv') {
            cb(null, true);
    } else {
        cb(null, false);
        console.log('Wrong type of file. Only images and videos are allow.')
    }
}

app.use(bodyParser.json());
//app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('stimuliOne'));
//app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields({ name: 'stimuliOne' }, { name: 'stimuliTwo' }));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('stimuli'));
app.use('/stimuli', express.static(path.join(__dirname, 'stimuli')));

/**
 *  Cross-Origin Resource Sharing (CORS)
 *  This piece of code handle CORS in the server side, it allows most of the method available to use
 */
app.use((req, res, next) => {
    //* * For all domains, or specific domains
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Tupe, Authorization');
    next();
});

/**
 *  Routes to work with.
 *  The /admin is related to all action an administrator can do, upload stimuli, statistics, etc
 *  The /test is related to all action performed by users, answer the questions and fill some data.
 */
app.use('/admin', adminRoutes);
app.use('/test', testRoutes);

/**
 *  Middleware to handle errors.
 *  Bad routes, etc.
 */
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
});

/**
 *  Connection with the database, the project uses MongoDB as database and Moongose as an object modeling for node.js
 *  If the connection is stablished, the server listens in port 8080, otherwise error.
 */
mongoose
    .connect('mongodb+srv://david:david150888@cluster0.c4d9j.mongodb.net/thesis?retryWrites=true&w=majority')
    .then(() => {
        console.log(`Connection to the database stablished!`);
        app.listen(8080);
    })
    .catch(err => {
        console.log(`Connection error with the database: ${err}`);
    })