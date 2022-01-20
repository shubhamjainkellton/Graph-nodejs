
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

const axios = require('axios')

app.set('view engine', 'ejs');

const apiCall = async(req,res)=>{
    const response = await axios.post(`https://api.studio.thegraph.com/query/18798/test-graph/v0.0.1`
    ,
    {
        query:`{
            transfers(first: 50,orderBy: tokenId) {
              id
              from
              tokenId
              to
              tx
            }
          }`
    }
    
    )

    console.log('response',response.data.data.transfers)
    return response.data.data.transfers
}



app.get('/' , async(req,res)=>{
   // 200 status code means OK
   const result  = await apiCall()
  res.render('pages/graph',{data:result});
})

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});