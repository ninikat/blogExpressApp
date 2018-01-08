let postList = $('#postList');
var blogPostList = [];

$('#btnPost').click(function() {
    let title = $('#titleTextBox').val();
    let description = $('#descriptionTextBox').val();
    let date = $('#dateTextBox').val();
    let photo = $('#photoURLBox').val();

    let data = {
        "title": title,
        "description": description,
        "photo": photo,
        "publishedDate": date
    };

    $.ajax({
        url: "http://localhost:3000/blogposts",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        type: "POST",
        dataType: "json",
        success: function(response) {
            displayNewPosts();
        }
    });
});

function displayNewPosts() {
    $('#postList').html('')

    $.get("http://localhost:3000/", function(blogPosts) {
        blogPostList = blogPosts;

        $(blogPosts).each(function(index, blogPost) {
            let itemDiv = $('<div>');
            let itemLi = $('<li>');
            itemDiv.addClass('card divItems');
            let titleOfPost =$('<h2>');
            titleOfPost.html(blogPost.title).addClass('postTitle');
            let postBody = $('<p>');
            postBody.html(blogPost.description).addClass('postBody')
            let postDate = $('<p>');
            postDate.html(blogPost.dateToday);
            let postImage = $('<img>');
            postImage.attr("src",blogPost.photoURL).addClass('img-fluid')
            titleOfPost.appendTo(itemLi);
            postDate.appendTo(itemLi)
            postImage.appendTo(itemLi);
            postBody.appendTo(itemLi);


            //itemLi.html(blogPost.title + "-" + blogPost.dateToday);
            let button = $('<button>');
            button.attr("postId", blogPost.postId).html('Delete Post').click(function() {
                let buttonId = this.getAttribute('postId');
                let parentDiv = this.closest('div');
                parentDiv.remove();

                let blogPostToDelete = blogPostList.filter(function(blogPost) {
                    return blogPost.postId == buttonId;
                })[0]


                $.ajax({
                    url: "http://localhost:3000/blogposts",
                    data: JSON.stringify({
                        postId: blogPostToDelete.postId
                    }), // {"newId":"3"}
                    contentType: "application/json; charset=utf-8",
                    type: "DELETE",
                    dataType: "json",
                    success: function(response) {
                        displayNewPosts();
                    }
                })

            });


            itemLi.appendTo(itemDiv)
            button.appendTo(itemDiv)
            itemDiv.appendTo(postList)
        })
    })

}

displayNewPosts();
