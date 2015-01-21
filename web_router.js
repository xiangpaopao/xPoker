var express = require('express');
var _ = require('underscore');

var router = express.Router();



exports.index =function(req, res){

    res.render('index');
};

exports.game =function(req, res){


    var pokers = [];
   for(var i=0;i<3;i++){
       var poker = {
           num: Math.ceil(Math.random()*13),
           type:Math.ceil(Math.random()*4)
       };
       pokers.push(poker);
   }

    pokers = _.sortBy(pokers, function (n) {
        return n.num;
    });

    res.render('game',{
        'pokers':pokers
    });
};