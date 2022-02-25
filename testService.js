const MongoDBService = require('./mongoService')


// UserObject = [{
//     firstName: 'Muhammad',
//     lastName: 'Aamir',
//     age: 22,
//     gender: 'M',
// },
// {
//     firstName: 'Muhammad',
//     lastName: 'Aamir',
//     age: 22,
//     gender: 'M',
// }]
// MongoDBService.addMultipleDataToDb('Users', UserObject)

id = '62187ef2243fac13cfe30202'
newObj = { age: 30 }
// MongoDBService.updateAllDocInCollection('Users', newObj)
// MongoDBService.updateSpecificDoc('Users', id, newObj)
// rslt = MongoDBService.updateTest('Users', {}, newObj)
// console.log(rslt)

// MongoDBService.getSpecificDoc('Users', id).then(rslt => {
//     console.log(rslt)
// })

// MongoDBService.getMultipleDoc('Users', [['age', '=', 45]]).then(rslt => {
//     console.log(rslt)
// })

// MongoDBService.getAllDocInCollection('Users').then(rslt => {
//     console.log(rslt)
// })

// MongoDBService.deleteMultipleDoc('Users', [['age', '=', 30]])

MongoDBService.deleteCollection('Users')