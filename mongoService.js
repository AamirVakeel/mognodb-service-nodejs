/*
MONGODB SERVICE FILE
THIS FILE CONTAINS ALL THE CRUD OPERATIONS FOR MONGODB
THIS WILL BE THE BASIC SERVICE FILE WHICH WILL COMMUNICATE WITH MONGODB
ALL THE API'S/FUNCTIONS WILL USE THIS FILE FOR COMMUNICATION
IMPORTANT REFERENCES ARE ADDED BELOW
https://www.tutorialspoint.com/mongodb/mongodb_query_document.htm
https://www.w3schools.com/nodejs/nodejs_mongodb.asp
*/

const { ObjectId } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
// const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/'
const dbName = 'TestExample'
statusToReturn = {
    complete: 1,
    error: -1,
    unknownError: -2
}

class MongoDBService {

    #conditionCreationFunction(conditionArray) {
        const crsa = {
            //CONDITION REPLACEMENT SYMBOLS ARRAY
            '=': 'eg',
            '<': 'lt',
            '>': 'gt',
            '<=': 'lte',
            '>=': 'gte',
            '!=': 'ne',
            'in': 'in',
            'nin': 'nin'
        }
        let conditionObj = {}
        conditionArray.forEach(each => {
            if (each[1] === '=') {
                conditionObj[each[0]] = each[2]
            } else {
                let condition = crsa[each[1]]
                let cs = `\$${condition}`
                let co = {}
                co[cs] = each[2]
                conditionObj[each[0]] = co
            }
        })
        return conditionObj
    }

    async addDataToDb(collectionName, objectToBeAdded) {

        if (typeof collectionName != typeof '') {
            throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
        }
        if (typeof objectToBeAdded != typeof {}) {
            throw console.log(statusToReturn.error, `Object cannot be ${typeof objectToBeAdded}`)
        }

        return MongoClient.connect(url, function (err, client) {
            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            dbo.collection(collectionName).insertOne(objectToBeAdded, function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Object successfully added', res)
            });
        });
    }

    async addMultipleDataToDb(collectionName, objectsToBeAdded) {
        if (typeof collectionName != typeof '') {
            throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
        }
        if (typeof objectsToBeAdded != typeof []) {
            throw console.log(statusToReturn.error, `Object cannot be ${typeof objectsToBeAdded}`)
        }
        return MongoClient.connect(url, function (err, client) {
            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            dbo.collection(collectionName).insertMany(objectsToBeAdded, function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Object successfully added', res)
            });
        });
    }

    async updateSpecificDoc(collectionName, docid, newObjectToBeMerged) {
        if (typeof collectionName != typeof '') {
            throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
        }
        if (typeof newObjectToBeMerged != typeof []) {
            throw console.log(statusToReturn.error, `Object cannot be ${typeof newObjectToBeMerged}`)
        }
        if (typeof docid != typeof '') {
            throw console.log(statconditionusToReturn.error, `docid cannot be ${typeof docid}`)
        }
        let myquery = {
            _id: ObjectId(docid)
        }
        let newvalue = { $set: newObjectToBeMerged }


        return MongoClient.connect(url, function (err, client) {
            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            dbo.collection(collectionName).updateOne(myquery, newvalue, function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Object successfully updated', res)
            });
        });
    }

    async updateMultipleDoc(collectionName, condition, newObjectToBeMerged) {
        if (typeof collectionName != typeof '') {
            throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
        }
        if (typeof newObjectToBeMerged != typeof []) {
            throw console.log(statusToReturn.error, `Object cannot be ${typeof newObjectToBeMerged}`)
        }
        if (typeof condition != typeof {}) {
            throw console.log(statusToReturn.error, `condition cannot be ${typeof condition}`)
        }
        let newvalue = { $set: newObjectToBeMerged }
        return MongoClient.connect(url, function (err, client) {
            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            dbo.collection(collectionName).updateMany(condition, newvalue, function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Object successfully updated', res)
            });
        });
    }

    async updateAllDocInCollection(collectionName, newObjectToBeMerged) {
        return await this.updateMultipleDoc(collectionName, {}, newObjectToBeMerged)
    }

    async getSpecificDoc(collectionName, docid) {
        if (typeof collectionName != typeof '') {
            throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
        }
        if (typeof docid != typeof '') {
            throw console.log(statconditionusToReturn.error, `docid cannot be ${typeof docid}`)
        }
        let myquery = {
            _id: ObjectId(docid)
        }

        let client = await MongoClient.connect(url)
        let db = client.db(dbName)
        let data = await db.collection(collectionName).findOne(myquery);
        // console.log(data)
        client.close()
        return data;
    }

    async getMultipleDoc(collectionName, conditionArray) {
        if (typeof collectionName != typeof '') {
            throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
        }
        if (typeof conditionArray != typeof []) {
            throw console.log(statconditionusToReturn.error, `conditionArray cannot be ${typeof conditionArray}`)
        }

        let myquery = this.#conditionCreationFunction(conditionArray)
        let client = await MongoClient.connect(url)
        let db = client.db(dbName)
        let data = await db.collection(collectionName).find(myquery).toArray();
        // console.log(data)
        client.close()
        return data;
    }

    async getAllDocInCollection(collectionName) {
        return this.getMultipleDoc(collectionName, [])
    }

    async deleteSpecificDoc(collectionName, docid) {
        return MongoClient.connect(url, function (err, client) {
            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            if (typeof collectionName != typeof '') {
                throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
            }
            if (typeof docid != typeof '') {
                throw console.log(statconditionusToReturn.error, `docid cannot be ${typeof docid}`)
            }
            let myquery = {
                _id: ObjectId(docid)
            }
            dbo.collection(collectionName).deleteOne(myquery, function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Object successfully deleted', res)
            });
        });
    }

    async deleteMultipleDoc(collectionName, conditionArray) {
        let myquery = this.#conditionCreationFunction(conditionArray)
        return MongoClient.connect(url, function (err, client) {

            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            if (typeof collectionName != typeof '') {
                throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
            }
            if (typeof conditionArray != typeof []) {
                throw console.log(statconditionusToReturn.error, `conditionArray cannot be ${typeof conditionArray}`)
            }
            dbo.collection(collectionName).deleteMany(myquery, function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Objects successfully deleted', res)
            });
        });
    }

    async deleteCollection(collectionName) {
        return MongoClient.connect(url, function (err, client) {

            if (err) throw console.log(statusToReturn.error, err);
            var dbo = client.db(dbName);
            if (typeof collectionName != typeof '') {
                throw console.log(statusToReturn.error, `Collection cannot be ${typeof collectionName}`);
            }
            dbo.collection(collectionName).drop(function (err, res) {
                if (err) throw console.log(statusToReturn.error, err);
                client.close();
                return console.log(statusToReturn.complete, 'Collection successfully deleted', res)
            });
        });
    }

}


module.exports = new MongoDBService();
