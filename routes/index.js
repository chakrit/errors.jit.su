var ErrorModel = require('../models/error');

exports.index = function(req, res){
  ErrorModel.all(function(e, errors) {
    if(e) { return res.send(500); }
    
    res.render('index', { errors: errors });
  });
};

exports.createError = function(req, res) {
  ErrorModel.create({
    name: req.body.ename,
    description: req.body.description,
    solution: req.body.solution,
    cause: req.body.cause
  }, function(e) {
    if(e) { return res.send(500); }

    res.redirect('/');
  });
};
