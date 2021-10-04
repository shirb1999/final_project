const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Kvuda:Kvuda1234.@cluster0.wco49.mongodb.net/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("mongo conected!")
 
});
