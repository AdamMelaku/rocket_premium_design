var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

module.exports = {
  index: function(req,res){
    User.find({}).exec(function(err,doc){
      if(err){
        return res.json(err)
      }
      return res.json(doc)
    })
  },
  create: function(req,res){
    if(req.body.password != req.body.password_confirm){
      return res.json({
        "errors":{
          "password":{
            "message":"Your passwords don't match"
          }
        }
      })
    }
    var user = new User(req.body);
    user.save(function(err,doc){
      if(err){
        return res.json(err);
      }
      return res.json(doc);
    })
  },
  show: function(req,res){
    User.findById(req.params.id).exec(function(err, doc){
      if(err){
        return res.json(err);
      }
      return res.json(doc);
    })
  },
  login : function(req,res){
    var isValid = true;
    User.findOne({email: req.body.email}).exec(function(err, doc){
      if(err){
        return res.json(err);
      }
      if(!doc){
        isValid = false;
      }else{
        if(bcrypt.compareSync(req.body.password, doc.password)){
          // $cookieStore.put('user',doc);
          return res.json(doc);
        }else{
          isValid = false;
        }
      }
      if(!isValid){
        return res.json({
          "errors":{
            "login":{
              "message":"Invalid credentials"
            }
          }
        })
      }
    })
  },
  update: function(req, res){
    console.log("Reached backend");
    console.log(req.params);
    console.log(req.body);
    User.update({_id: req.params.id},{name: req.body.name, birthday:req.body.birthday}, function(err){
      if(err){
        console.log(err);
      }
    })
  },
  destroy: function(req,res){
    User.findByIdAndRemove(req.params.id).exec(function(err,doc){
      if(err){
        return res.json(err)
      }
      return res.json(doc)
    })
  }
}
