var rp = require('request-promise');
var cheerio = require('cheerio');
var all_clg_links=require('./clg_links')
var fs = require('fs')
var clg_loc =[]
all_clg_links.clg_links('https://engineering.careers360.com/colleges/list-of-engineering-colleges-in-India?page=17')
// var college_details = [{
//     collegeName:null,
//     collegeLocation:null,
//     EstablishmentYear:null,
//     Ownership:null,
//     ApprovedBy:null,
//     Accreditation:null,
//     Ratings:null,
//     CollegeImgURL:null,
//     CoursesOffered:[]
// }]
var college_details=[]
var courses = []
setTimeout(function(){
    for(let i=0;i<all_clg_links.links.length;i++){
    var options = {
    uri: all_clg_links.links[i] ,
    transform: function (body) {
        return cheerio.load(body);
    }
    
}
    
rp(options)
    .then(function ($) {
        
       let clg_name = $(".collegeName .titleNameCol")
       let place = $(".clg-info li:nth-child(1) a")
       let estd = $(".clg-info li:nth-child(2) span")
       let Ownership = $(".clg-info li:nth-child(3) span")
       let ApprovedBy = $(".clg-info li:nth-child(4) span")
       let Accreditation = $(".clg-info li:nth-child(5) span")
       let CollegeImgURL = $(".blockInfoImage img")
       let Ratings = $(".countBlockRayco span:nth-child(2)")
       let CoursesOffered = $(".c-name")
        //    college_details.collegeName=$(clg_name).text()
        //    college_details.EstablishmentYear = $(estd).text()
       $(place).each(function(){
        clg_loc.push($(this).text())
        })
       $(CoursesOffered).each(function(){
            courses.push($(this).text())
        })
        // college_details.collegeLocation= clg_loc[0]+' '+clg_loc[1]
        // college_details.Ownership = $(Ownership).text()
        // college_details.ApprovedBy = $(ApprovedBy).text()
        // college_details.Accreditation = $(Accreditation).text()
        // college_details.CollegeImgURL = $(CollegeImgURL).attr("src")
        // college_details.Ratings = $(Ratings).text()
        college_details[i] = {collegeName:$(clg_name).text(),
                              collegeLocation:clg_loc[0]+' '+clg_loc[1],
                              EstablishmentYear:$(estd).text(),
                              Ownership:$(Ownership).text(),
                              ApprovedBy:$(ApprovedBy).text(),
                              Accreditation:$(Accreditation).text(),
                              Ratings:$(Ratings).text(),
                              CollegeImgURL:$(CollegeImgURL).attr("src"),
                              CoursesOffered:courses
                             }
    clg_loc = []
    courses = []
    })
    .catch(function (err) {
        console.log(err)
    }
    )
}
},5000)    


    setTimeout(function(){
        fs.appendFileSync('./college_data.json',JSON.stringify(college_details,null,2),'utf-8')
    //     for(let i=0;i<all_clg_links.links.length;i++){
    //     console.log("College: "+college_details[i].collegeName)
    //     console.log("Address: "+college_details[i].collegeLocation)
    //     console.log("EstablishmentYear: "+college_details[i].EstablishmentYear)
    //     console.log("Ownership: "+college_details[i].Ownership)
    //     console.log("ApprovedBy: "+college_details[i].ApprovedBy)
    //     console.log("Accreditation: "+college_details[i].Accreditation)
    //     console.log("CollegeImgURL: "+college_details[i].CollegeImgURL)
    //     console.log("Ratings: "+college_details[i].Ratings)
    //     console.log("Courses: "+college_details[i].CoursesOffered)
    // }
},10000)
    