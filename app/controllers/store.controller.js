const StoreService = require("../services/store.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const storeService = new StoreService(MongoDB.client);
        const document = await storeService.create(req.body);
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the store")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const storeService = new StoreService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await storeService.findByName(name);
        } else {
            documents = await storeService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving store")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const storeService = new StoreService(MongoDB.client);
        const document = await storeService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Store not found"));
        }
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving store with id =${req.params.id}`
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const storeService = new StoreService(MongoDB.client);
        const document = await storeService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Store not found"));
        }
        return res.send({message: "Store was updated successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error updating Store with id=${req.params.id}`));
    }
};
exports.delete = async (req, res, next) => {
    try{
        const storeService = new StoreService(MongoDB.client);
        const document = await storeService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Store not found"));
        }
        return res.send({message: "Store was deleted successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error deleting store with id=${req.params.id}`));
    }
};
exports.deleteAll = async (_req, res, next) => {
    try {
        const storeService = new StoreService(MongoDB.client);
        const deletedCount = await storeService.deleteAll();
        return res.send({
            message: `${deletedCount} stores were deleted successfully`,
        });
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while removing all stores")
        );
    }
}; 
