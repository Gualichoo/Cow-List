const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cows = require('./models');

router.get('/', (req,res, next) => {
  console.log(Cows)
  Cows
    .find()
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'These are all the values stored in the database',
        docs
      });
    })
    .catch();
});

router.post('/', (req,res, next) => {
  const newCow = new Cows({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description
  });
  newCow
    .save()
    .then(result => {
      res.status(200).json({
        message: 'Successfully added an entry',
        inserted_value: {
          name: result.name,
          description: result.description,
          _id: result.id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
    });

});

router.put('/:id', (req,res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Cows.update({_id: id}, { $set: updateOps })
    .exec()
    .then(result =>{
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.delete('/:id', (req,res, next) => {
  const id = req.params.id;
  //deletedRecord = Cows.findById(id, function (err, adventure) {});
  //console.log(deletedRecord)
  Cows.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        result,
        //deletedRecord
      });
    })
});

module.exports = router;