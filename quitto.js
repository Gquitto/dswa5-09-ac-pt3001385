const MongoClient = require('mongodb').MongoClient;

const connectUrl = 'mongodb+srv://dswa5:dswa5@cluster0.n6t0e.mongodb.net/test?retryWrites=true&w=majority';

const dbName = 'ifsp';

const findDocuments = function(db, callback) {

    const collection = db.collection('contatos');

    collection.find({}).toArray((err, docs) => {
        console.log(docs);
        callback(docs);
    });
}

MongoClient.connect(connectUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    console.log('Mongo conectado');

    findDocuments(client.db(dbName), () => {
        client.close();
    });

})




