# restfulBlog


Practice with restful routes and mongodb.

|Name   |Path   |HTTP verb   |Purpose   |Mongoose method   |
|---|---|---|---|---|
| index  |/blogs   |GET   |List all blogs   |Blog.find()   |
| New   |/blogs/new   |GET   |Show new blog form   |N/A   |
| Create  |/blogs   |POST   |Create a new post   |Blog.create()   |
| Show  |/blogs/:id   |GET   |Show content of the one post   | Blog.findById()  |
| Edit  |/blogs/:id/edit   |GET   |Show edit form of one post   |Blog.findById()   |
|Update   |/blogs/:id   |PUT   |Update post content   |Blog.findByIdAndUpdate()   |
|Delete   |/blogs/:id   |DELETE   |Delete one post   |Blog.findByIdAndRemove()   |