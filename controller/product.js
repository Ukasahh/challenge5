const {Product} = require('../models/')

module.exports = {
    index: async (req, res, next) => {
        try {
            const products = await Product.findAll()

            return res.status(200).json({
                status: true,
                message: 'success',
                data: products
            });
        } catch (err) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const {id} = req.params;

            const product = await Product.findOne({where: {id: id}});

            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: product
            });
        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, description} = req.body;

            if (!name || !description) {
                return res.status(400).json({
                    status: false,
                    message: 'name or description is required!',
                    data: null
                }); 
            };

            const product = await Product.create({
                name: name,
                description: description
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: product
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;

            const updated = await Product.update(req.body, {where: {id: id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'Product was Updated!',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {id} = req.params;

            const deleted = await Product.destroy({where: {id: id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'Product has been removed!',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};