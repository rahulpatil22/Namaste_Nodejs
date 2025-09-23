const {MongoClient} = require("mongodb")
const URI = "mongodb+srv://namastenode:rahul4972@namastenode.2idigoi.mongodb.net/"

const client = new MongoClient(URI);

const dbName = 'HelloWorld';

async function main(){

    await client.connect();
    console.log('connected successfully to the server');
    const db = client.db(dbName);
    const collection = db.collection('User');


    const data = {

    firstname:'sachin',
    lastname:'tendulkar',
    city:'mumbai',
    phonenumber:'8080808080'
}
const insertResult = await collection.insertMany([data]);
console.log('Inserted documents =>', insertResult);
//read
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    return "done."
}
main ()
 .then(console.log)
 .catch(console.error)
 .finally(()=>client.close)



 
// Notes
// Go to the mongodb website
// create free MO Clusture
// get the connection String
// install mongodb compass
 //npm i mongodb