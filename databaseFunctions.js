const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_CONNECTION_STRING; 
const client = new MongoClient(url);
const dbName = 'Evergreen';

// trim any whitespace
const trimWS = (objectToTrim) => {
  for(props in objectToTrim){
      objectToTrim[props] = objectToTrim[props].trim();
  }
  return objectToTrim;
}

const createOrListNewCustomer = async (newCustomerObject, user) => {
  try {
      await client.connect();
      console.log('Connected to DB correctly');
      const db = client.db(dbName);
      const col = db.collection('Customers');

      if(newCustomerObject){

        const trimCustomerObject = trimWS(newCustomerObject);
        const p = await col.insertOne(trimCustomerObject);
        console.log(`Inserted ${trimCustomerObject.firstName} from ${trimCustomerObject.companyName}`);
      }else{
          // Find all documents for this user, sort returned documents in
          // ascending order by firstName and project everything but id & user
          const query = {user: user};    
          const options = {
              sort: { firstName: 1 },
              projection: { _id: 0, user: 0}
          };
          const cursor = col.find(query, options); 

          if((await col.countDocuments(query)) === 0) {
              console.log("No Customers found!");
          }
          const allUserCustomersArray = await cursor.toArray(); 
          return allUserCustomersArray;
      }
  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

const signUpUser = async (userObject) => {
  try {
      await client.connect();
      console.log('Connected to DB correctly');
      const db = client.db(dbName);
      const col = db.collection('Users');

      const trimUserObject = trimWS(userObject);
      const query = {userName: `${trimUserObject.userName}`};            

      if((await col.countDocuments(query)) === 0) {

        console.log('Unique username. Creating User...');
        const p = await col.insertOne(trimUserObject);
        console.log(`Inserted User: ${trimUserObject.userName} and Password: ${trimUserObject.password}`);
        return true;

      }else{
        console.log('Username already exists. User not created...');
        return false;
      }

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

const logInUser = async (userObject) => {
  try {
    await client.connect();
    console.log('Connected to DB correctly');
    const db = client.db(dbName);
    const col = db.collection('Users');

    const trimUserObject = trimWS(userObject);

    const userQuery = {
      userName: userObject.userName,
      password: userObject.password
    };             

    if((await col.countDocuments(userQuery)) === 0) {

      console.log(`Cannot find user credntails for: ${userObject.userName}`);
      return false;

    }else{
      console.log(`User ${trimUserObject.userName} found and password matches. Logging in...`);
      return true;
    }

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}

module.exports = {createOrListNewCustomer, logInUser, signUpUser};




