const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).
    then(success => console.log('Connected to database')).
    catch(error => console.log(error));