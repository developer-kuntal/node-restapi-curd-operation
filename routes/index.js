const { Router } = require('express');
const mongoose = require('mongoose');
const { request } = require('../app');
const Profile = require('../models/Profile')

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'Express'
  });
});

router.get('/eshram-profile', async (req, res) => {
    // const profile = new Profile()
    result = await Profile.find({})
    res.json(result)
})

router.get('/person-profile', async (req, res) => {
  // const profile = new Profile()
  const { id } = req.body
  if(id == undefined) {
    const { id } = req.query
    // console.log(id)
    result = await Profile.findById(id)
    res.json(result)
  } 
  else {
    console.log(id)
    result = await Profile.findById(id)
    res.json(result)
  }
})

router.post('/eshram', async (req, res) => {
  const { name, foh, dob, gender, primary_occupation, current_address, mobile_number, uan, } = req.body
  // console.log(name)
  formated_dob = new Date(`${dob}`)
  const profile = new Profile({name, foh,dob:formated_dob,
                              gender, primary_occupation, 
                              current_address, mobile_number, uan})
  result = await profile.save()
  res.json(result)
})

router.delete('/delete-user-profile', async (req, res) => {
  const { id } = req.query
  // console.log(req.query)
  // console.log("NS: ",id);
  result = await Profile.findByIdAndDelete(id)
  res.json(result)
})

router.put('/edit-user-profile', async (req, res) => {
  // console.log(req.body)
  if(req.body == null) {

    const { _id, name, foh, 
      dob, gender, primary_occupation, 
      current_address, mobile_number, uan, profilePicPath } = req.query

    const result = await Profile.findByIdAndUpdate(mongoose.Types.ObjectId(_id), {
          name, foh, 
          dob, gender, primary_occupation, 
          current_address, mobile_number, uan, profilePicPath,
          
          new: true
    })
    
    return res.json(result)

  }
  else {

    const { _id, name, foh, 
      dob, gender, primary_occupation, 
      current_address, mobile_number, uan, profilePicPath } = req.body
      
    const result = await Profile.findByIdAndUpdate(mongoose.Types.ObjectId(_id), { 
            
          name, 
          foh, 
          dob, 
          gender, 
          primary_occupation, 
          current_address, 
          mobile_number, 
          uan, 
          profilePicPath,

          new: true

    })

    // const result = await Profile.findOneAndUpdate({ 
    //   query: {"_id": mongoose.Types.ObjectId(id)}, 
    //   update: {
    //     name: name, foh: foh, 
    //     dob, gender, primary_occupation, 
    //     current_address, mobile_number, uan
    //   }, 
    //   new: true
    // })
    // const result = await Profile.findByIdAndUpdate(id, { 
    //     query: {"_id": mongoose.Types.ObjectId(id)}, 
    //     update: {
    //       name: name, foh: foh, 
    //       dob: dob, gender: gender, primary_occupation: primary_occupation, 
    //       current_address, mobile_number, uan
    //     }, 
    //     new: true
    // })

    return res.json(result)
  }
  
})

module.exports = router;
