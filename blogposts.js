class BlogPost {
  constructor(title,description,dateToday,url){
    this.title = title;
    this.description = description;
    this.dateToday = dateToday;
    this.photoURL = url;
  }
}

//exporting NewsItemClass
module.exports = BlogPost
