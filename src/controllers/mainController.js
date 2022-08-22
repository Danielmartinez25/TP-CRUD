const {loadProducts,storeProducts} = require('../data/productModule')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();	
		const inSale = products.filter(product => product.category === 'in-sale');
		const visited = products.filter(product => product.category === 'visited');
		res.render('index',{
			inSale,
			visited,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
		res.render('results',{
			products : result,
			keywords : req.query.keywords,
			toThousand
		});
	},
};

module.exports = controller;
