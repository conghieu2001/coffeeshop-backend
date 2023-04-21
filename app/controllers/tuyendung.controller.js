const TuyenDungService = require("../services/tuyendung.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



exports.create = async (req, res, next) => {
    if(!req.body?.title) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const tuyendungService = new TuyenDungService(MongoDB.client);
        const document = await tuyendungService.create(req.body);
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the recruitment")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const tuyendungService = new TuyenDungService(MongoDB.client);
        const {title} = req.query;
        if(title) {
            documents = await tuyendungService.findByName(title);
        } else {
            documents = await tuyendungService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving recruitment")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try {
        const tuyendungService = new TuyenDungService(MongoDB.client);
        const document = await tuyendungService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Recruitment not found"));
        }
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving recruitment with id =${req.params.id}`
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const tuyendungService = new TuyenDungService(MongoDB.client);
        const document = await tuyendungService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Recruitment not found"));
        }
        return res.send({message: "Recruitment was updated successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error updating Recruitment with id=${req.params.id}`));
    }
};
exports.delete = async (req, res, next) => {
    try{
        const tuyendungService = new TuyenDungService(MongoDB.client);
        const document = await tuyendungService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Recruitment not found"));
        }
        return res.send({message: "Recruitment was deleted successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error deleting recruitment with id=${req.params.id}`));
    }
};
exports.deleteAll = async (_req, res, next) => {
    try {
        const tuyendungService = new TuyenDungService(MongoDB.client);
        const deletedCount = await tuyendungService.deleteAll();
        return res.send({
            message: `${deletedCount} recruitments were deleted successfully`,
        });
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while removing all recruitments")
        );
    }
}; 
