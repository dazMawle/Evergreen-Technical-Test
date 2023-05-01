const { MongoClient } = require('mongodb');
require('dotenv').config();


async function createAndListNewCustomer(newCustomerObject){

    // MongoDB connection URL                                                                                                                                       
    const url = process.env.MONGO_CONNECTION_STRING; 
    const client = new MongoClient(url);
    
    // The database to use
    const dbName = 'Evergreen';

    try {
        await client.connect();
        console.log('Connected to DB correctly');
        const db = client.db(dbName);
        const col = db.collection('Customers');

        if(newCustomerObject){

            // trim any whitespace
            for(props in newCustomerObject){
                newCustomerObject[props] = newCustomerObject[props].trim();
            }

            const p = await col.insertOne(newCustomerObject);
            console.log(`Inserted ${newCustomerObject.firstName} from ${newCustomerObject.companyName}`);

        }else{
            // Find all documents
            const query = {};            
            const options = {
                // sort returned documents in ascending order by firstName (A->Z)
                sort: { firstName: 1 },
                // Include everything but the id field in results
                projection: { 
                    _id: 0
                }
            };
            const cursor = col.find(query, options); 

            if((await col.countDocuments(query)) === 0) {
                console.log("No documents found!");
            }
            const allDocs = await cursor.toArray();
            return allDocs;
        }
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

module.exports = {createAndListNewCustomer};