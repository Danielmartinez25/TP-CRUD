const {loadProducts, storeProducts} = require('../data/productModule')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();
		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);
		return res.render('detail',{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {price,category,discount,description,name} = req.body;
		const products = loadProducts();
		const newProduct = {
			id : (products[products.length - 1].id + 1),
			name : name.trim(),
			description : description.trim(),
			price : +price,
			discount : +discount,
			image : 'default-image.png',
			category
		}
		const productModify = {...products, newProduct}
		storeProducts(productModify);
		return res.redirect('/');

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id);
		res.render('product-edit-form',{
			product
		})

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const {price,description,name,discount,category} = req.body;
		const productModify = products.map(product =>{
			if(product.id === +req.params.id){
				return {
					...product,
					price : +price,
					name : name.trim(),
					description : description.trim(),
					discount : +discount,
					category
				}	
			}
			return product
		})
		storeProducts(productModify);
		return res.redirect('/products/detail/' + req.params.id);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		const products = loadProducts();
		const productModify = products.filter(product.id != +id);
		storeProducts(productModify);
		return res.redirect('/products');
	}

};

module.exports = controller;