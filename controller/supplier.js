const {Suppliers} = require('../models/');

module.exports = {
    index: async (req, res, next) => {
        try {
            const supplier = await Suppliers.findAll()

            return res.status(200).json({
                status: true,
                message: 'success',
                data: supplier
            });
        } catch (err) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const {id} = req.params;

            const supplier = await Suppliers.findOne({where: {id: id}});

            if (!supplier) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: supplier
            });
        } catch (error) {
            next(error);
        }
    },

    store: async (req, res, next) => {
        try {
            const {name, address} = req.body;
            if (!name || !address) {
                return res.status(400).json({
                    status: false,
                    message: 'name or address is required!',
                    data: null
                }); 
            };

            const supplier = await Suppliers.create({
                name: name,
                address : address
            });

            return res.status(201).json({
                status: true,
                message: 'Supplier has been created!',
                data: supplier
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;

            const updated = await Suppliers.update(req.body, {where: {id: id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'Supplier has been updated!',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {id} = req.params;

            const deleted = await Suppliers.destroy({where: {id: id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'Supplier has been removed!',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};