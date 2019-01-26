var express = require('express');
var router = express.Router();

// Require controller modules.
var customer_controller = require('../controllers/customerController');
var blog_controller = require('../controllers/blogController');

/// customer ROUTES ///

// GET request for creating customer. NOTE This must come before route for id (i.e. display customer).
router.get('/customer/create', customer_controller.customer_create_get);

// POST request for creating customer.
router.post('/customer/create', customer_controller.customer_create_post);

// GET request to delete customer.
router.get('/customer/:id/delete', customer_controller.customer_delete_get);

// POST request to delete customer.
router.post('/customer/:id/delete', customer_controller.customer_delete_post);

// GET request to update customer.
router.get('/customer/:id/update', customer_controller.customer_update_get);

// POST request to update customer.
router.post('/customer/:id/update', customer_controller.customer_update_post);

// GET request for one customer.
router.get('/customer/:id', customer_controller.customer_detail);

// GET request for list of all customers.
router.get('/customers', customer_controller.customer_list);

/// blog ROUTES ///

// GET request for creating customer. NOTE This must come before route for id (i.e. display customer).
router.get('/blog/create', blog_controller.blog_create_get);

// POST request for creating customer.
router.post('/blog/create', blog_controller.blog_create_post);

// GET request to delete customer.
router.get('/blog/:id/delete', blog_controller.blog_delete_get);

// POST request to delete customer.
router.post('/blog/:id/delete', blog_controller.blog_delete_post);

// GET request to update customer.
router.get('/blog/:id/update', blog_controller.blog_update_get);

// POST request to update customer.
router.post('/blog/:id/update', blog_controller.blog_update_post);

// GET request for one customer.
router.get('/blogs/:userId', blog_controller.customer_blog_list);

// GET request for list of all customers.
router.get('/blogs', blog_controller.blog_list);

module.exports = router;