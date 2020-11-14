const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const db_path = 'mongodb://productListUser:productListPassword@localhost:27017/promotions?authSource=admin';
const config = {
    userNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(db_path, config, err => {
    if(!err) {
        console.log('Successful connection');
    } else {
        console.log('Error connection to database');
    }
});

