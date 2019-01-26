var blog = require('../models/blog');
const { Customer, Blog, Tag } = require('../sequelize')
// Display list of all Blogs.
exports.blog_list = function(req, res) {
    Blog.findAll().
        then(blogs => res.json(blogs))
    //res.send('NOT IMPLEMENTED: Blog list');
};

// Display list of all customer blogs.
exports.customer_blog_list = function(req, res) {
    let query;
    if(req.params.userId) {
        query = Blog.findAll({ include: [
            { model: Customer, where: { id: req.params.userId } },
            { model: Tag }
        ]})
    } else {
        query = Blog.findAll({ include: [Tag, Customer]})
    }
    return query.then(blogs => res.json(blogs))
};

// Display detail page for a specific Blog.
exports.blog_detail = function(req, res) {
    Blog.findById(req.params.id).
        then(blog => res.json(blog))
    //res.send('NOT IMPLEMENTED: Blog detail: ' + req.params.id);
};

// Display Blog create form on GET.
exports.blog_create_get = function(req, res) {
    console.log("Entre")
    res.render('<form action="http://localhost:3000/catalog/blog/create" method="post"> <label for="team_name">Enter name: </label> <input id="team_name" type="text" name="name_field" value="Default name for team."> <input type="submit" value="OK"> </form>')
    //res.send('NOT IMPLEMENTED: Blog create GET');
};

// Handle Blog create on POST.
exports.blog_create_post = function(req, res) {
    console.log("Body antes",req.body)
    const body = {
        customerId: parseInt(req.body.customerId),
        tags: JSON.parse(req.body.tags).content,
        text: req.body.text
    }
    console.log("Body",body)
    // either find a tag with name or create a new one
    const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }})
                                         .spread((tag, created) => tag))
    Customer.findById(body.customerId)
        .then(() => Blog.create(body))
        .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
        .then(blog => Blog.findOne({ where: {id: blog.id}, include: [Customer, Tag]}))
        .then(blogWithAssociations => res.json(blogWithAssociations))
        .catch(err => res.status(400).json({ err: `User with id = [${body.customerId}] doesn\'t exist.`}))
};

// Display Blog delete form on GET.
exports.blog_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Blog delete GET');
};

// Handle Blog delete on POST.
exports.blog_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Blog delete POST');
};

// Display Blog update form on GET.
exports.blog_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Blog update GET');
};

// Handle Blog update on POST.
exports.blog_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Blog update POST');
};