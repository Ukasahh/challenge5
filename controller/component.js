const {Components} = require('../models/')

module.exports = {
    index: async (req, res, next) => {
        try {
            const component = await Components.findAll()

            return res.status(200).json({
                status: true,
                message: 'success',
                data: component
            });
        } catch (err) {
            next(err);
        }
    },

    show: async (req, res, next) => {
        try {
            const {id} = req.params;

            const component = await Components.findOne({where: {id: id}});

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: component
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

            const component = await Components.create({
                name: name,
                description: description
            });

            return res.status(201).json({
                status: true,
                message: 'Component has been created',
                data: component
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;

            const updated = await Components.update(req.body, {where: {id: id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'Component has been Updated!',
                data: null
            });
        } catch (error) {
            next(error);
        }
    },

    destroy: async (req, res, next) => {
        try {
            const {id} = req.params;

            const deleted = await Components.destroy({where: {id: id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};