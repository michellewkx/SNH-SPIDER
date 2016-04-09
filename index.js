/**
 * Created by michellewkx on 16/4/8.
 */
var express = require('express');
var app = express();
var superagent = require('superagent');
var cheerio = require('cheerio');

app.get('/',function(req,res){
    superagent.get('http://www.snh48.com/html/allnews/')
        .end(function(err,sres){
            if(err){
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.s_new_list .s_new_lie a').each(function (idx ,element ){
                var $element = $(element);
                items.push({
                    title : $element.text(),
                    url :$element.attr('href')
                });
            });
            res.send(items);
        })
});

app.listen(3000 , function(req,res){
    console.log('app is running at 3000 port');
})