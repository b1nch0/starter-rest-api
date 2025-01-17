const express = require('express')
const app = express()
const db = require('@cyclic.sh/dynamodb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################

// Create or Update an item
app.post('/:col/:key', async (req, res) => {
app.use(basicAuth({authorizer: myAuthorizer}))
//console.log(req.body)
function myAuthorizer(username, password){
    const userMatches = basicAuth.safeCompare(username, 'tokenuser')
    var tokmatch = process.env.TOKEN || 'you-should-really-set-the-ENV-variable'
    try {
      var elem = JSON.parse(req.body)
    } catch (e) {
      res.send("401 FORMERROR: "+e);
    }
    const passwordMatches = basicAuth.safeCompare(password, tokmatch)
    if(userMatches == 'tokenuser' && passwordMatches == tokmatch ){
         const col = req.params.col
         const key = req.params.key
         console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
         var elemttl=process.env.TTL || 86400
         const item = await db.collection(col).set(key, elem)
         console.log(JSON.stringify(item, null, 2))
         res.json(item).end()  
    }else{
        res.send("401 Not authorized");
    }
}});




// Delete an item
app.delete('/:col/:key', async (req, res) => {
  app.use(basicAuth({authorizer: myAuthorizer}))
  //console.log(req.body)
  function myAuthorizer(username, password){
      const userMatches = basicAuth.safeCompare(username, 'tokenuser')
      var tokmatch = process.env.TOKEN || 'you-should-really-set-the-ENV-variable'
      const passwordMatches = basicAuth.safeCompare(password, tokmatch)
      if(userMatches == 'tokenuser' && passwordMatches == tokmatch ){
        const col = req.params.col
        const key = req.params.key
        console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
        const item = await db.collection(col).delete(key)
        console.log(JSON.stringify(item, null, 2))
        res.json(item).end() 
      }else{
          res.send("401 Not authorized");
      }
  }});
  


  
// Get a single item
app.get('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).get(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})





// Get a full listing
app.get('/:col', async (req, res) => {
  app.use(basicAuth({authorizer: myAuthorizer}))
  //console.log(req.body)
  function myAuthorizer(username, password){
      const userMatches = basicAuth.safeCompare(username, 'tokenuser')
      var tokmatch = process.env.TOKEN || 'you-should-really-set-the-ENV-variable'
      const passwordMatches = basicAuth.safeCompare(password, tokmatch)
      if(userMatches == 'tokenuser' && passwordMatches == tokmatch ){
        const col = req.params.col
        console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
        const items = await db.collection(col).list()
        console.log(JSON.stringify(items, null, 2))
        res.json(items).end()
      }else{
          res.send("401 Not authorized");
      }
  }});
  




// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({ msg: 'no route handler found' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
