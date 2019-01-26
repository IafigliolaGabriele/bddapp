const express = require('express')
const bodyParser = require('body-parser')
const { Customer, Blog, Tag } = require('./sequelize')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

// API ENDPOINTS

// create a user
app.post('/api/customers', (req, res) => {
    console.log("Req",req.body);
    Customer.create(req.body)
        .then(customer => res.json(customer))
})
// get all users
app.get('/api/customers', (req, res) => {
    Customer.findAll().then(customers => res.json(customers))
})
// create a blog post
app.post('/api/blogs', (req, res) => {
    console.log("Body antes",req.body)
    console.log("Stringy", JSON.stringify({content: [{name: "BigData"},{name: "BitCoin"}]}))
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
})

app.get('/api/blogs/:userId?', (req, res) => {
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
})

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})