var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override');
var expressSanitizer = require('express-sanitizer');
var nl2br = require('nl2br');
var app = express();

mongoose.connect('mongodb://localhost/blog', {
  useMongoClient: true,
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
	res.redirect("/blogs");
});

// restful routes
// index route
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log("Error: " + err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// new post page
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

// create route
app.post("/blogs", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			console.log("Error: " + err);
		} else {
			res.redirect("/blogs");
		}
	})
});

// show blog content
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, blogFound) {
		if(err) {
			console.log("Error: " + err);
			redirect("/blogs");
		} else {
			blogFound.body = nl2br(blogFound.body);
			res.render("show", {blog: blogFound});
		}
	});
});

//show edit form
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, blogFound) {
		if(err) {
			console.log("Error: " + err);
			redirect("/blogs");
		} else {
			res.render("edit", {blog: blogFound});
		}
	});
});

// edit
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blogUpdated) {
		if(err) {
			console.log("Error: " + err);
			res.redirect("/blogs");			
		} else {
			res.redirect("/blogs/" + req.params.id);	
		}
	})
});

// delete post
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function() {
	console.log("SERVER IS LISTENING...");
});