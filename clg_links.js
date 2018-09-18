var rp = require('request-promise');
var cheerio = require('cheerio');
var links= [];
var clg_links = function(url){
    
    var college_links = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    rp(college_links)
    .then(function ($) {
        $('.title a').each(function(){
            links.push($(this).attr('href'))
        })
       
    })
    .catch(function (err) {
        console.log(err)
    });
// setTimeout(function(){
//     console.log(links)
// },3000)

}
module.exports.clg_links=clg_links;
module.exports.links=links;