var ErrorModel = require('../models/error');

function buildError (obj) {
  var valid = ["ename", "description", "solution", "cause"],
      cache = {};

  valid.forEach(function(k) {
    if(obj[k]) {
      cache[k] = obj[k];
    }
  });

  return cache; 
}

exports.index = function(req, res){
  ErrorModel.all(function(e, errors) {
    if(e) { return res.send(500); }
    
    res.render('index', { errors: errors });
  });
};

exports.createError = function(req, res) {
  var err = buildError(req.body);
  err.rep = 0;
  ErrorModel.create(err, function(e) {
    if(e) { return res.send(500); }

    res.redirect('/');
  });
};

exports.editError = function(req, res) {
  ErrorModel.get(req.params.id, function(e, error) {
    if(e || !error) { return res.send(404); }
    
    res.render('editError', { error: error });
  });
};

exports.updateError = function(req, res) {   
  ErrorModel.update(req.params.id, buildError(req.body), function(e) {
    if(e) { return res.send(500); }

    res.redirect('/');
  });
};

exports.vote = function(req, res) {
  ErrorModel.get(req.params.id, function(e, err) {
    if(e || !err) { return res.send(404); }

    err.rep += (req.params.type === 'hate') ? -1 : 1;
    err.save(function(e) { 
      if(e) { return res.send(500); }

      res.redirect('/');
    });
  });
}
