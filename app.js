const express = require('express');
const bodyParser = require('body-parser');
const BlogPost = require('./blogposts')
const app = express();

app.use(bodyParser.json());

let blogPosts= [];

//````to do, please removed this **********
let blogPost1 = new BlogPost("This is a funfetti cheesecake","This is a delicious funfetti cheesecake.","12/12/2291","https://www.lifeloveandsugar.com/wp-content/uploads/2017/08/Funfetti-Cheesecake-with-Cake-Bottom1.jpg")
let blogPost2 = new BlogPost("Chocolate Cake recipe","a ton of ingredients","12/20/2012","http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/4/5/0/RX-FNM_050111-TV-Sweeps-010_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371595337466.jpeg")
blogPost1.postId='40'
blogPost2.postId='41'
blogPosts.push(blogPost1);
blogPosts.push(blogPost2);
//````to do, please removed this when finished **********


app.delete('/blogposts',function(req,res){
  let postToDelete = req.body.postId
    for(x in blogPosts){
      if(postToDelete ===blogPosts[x].postId){
        blogPosts.splice(x,1)
      }
    }
    res.json({success:true})
})


app.post('/blogposts',function(req,res){
  let blogPostTitle = req.body.title;
  let blogPostDescription = req.body.description;
  let publishedDate = req.body.publishedDate;
  let url = req.body.photo;

  let userNewPost = new BlogPost(blogPostTitle,blogPostDescription,publishedDate,url);
  userNewPost.postId = blogPosts.length + 1;
  blogPosts.push(userNewPost);

  res.json({success:true})
})

app.get('/',function(req,res){
  res.json(blogPosts);
})

app.listen(3000,function(){
  console.log("Server Started on port 3000....");
});
