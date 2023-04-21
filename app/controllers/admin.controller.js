const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const adminService = new AdminService(MongoDB.client);
        const {username} = req.query;
        if(username) {
            documents = await adminService.findByName(username);
        } else {
            documents = await adminService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const adminService = new AdminService(MongoDB.client);
        const document = await adminService.findById(req.params.id);
        if(!document) {
            return next(
                new ApiError(404, "Item not found")
            );
        }
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};