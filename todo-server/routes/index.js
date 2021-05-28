const express = require('express');
const router  = express.Router();
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
  console.log('index metoduna girdi')
  res.render('index');
});

router.post('/addtodolist',(req,res)=> {
 
  User.findByIdAndUpdate(req.body.id,
   
    {$push:{todo:req.body.todo}}
   )
  
  .then(response=>{
    res.status(200).json(response)
    
  })
  .catch(err=>{
    console.log(err)
  })

})

router.get('/user/:id',(req,res)=> {
  
  User.findById({_id:req.params.id})
  .then(response=>{
    console.log(response)
    res.status(200).json(response)

  })
  .catch(err=> {
    console.log(err)
  })
})

module.exports = router;
