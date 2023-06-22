const PromoService = require("../services/promo.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const promoService = new PromoService(MongoDB.client);
        const document = await promoService.create(req.body);
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the item")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const promoService = new PromoService(MongoDB.client);
        const name = req.body.name;
        console.log(name)
        if(name) {
            documents = await promoService.findByName(name);
        } else {
            documents = await promoService.find({});
        }
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items")
        );
    }
    return res.send(documents);
};
exports.usePromoCode = async (req, res, next) => {
    try {
        const promoService = new PromoService(MongoDB.client);
        const document = await promoService.findByName(req.params.name);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items")
        );
    }
}
exports.usePromoCodeUpdate = async (req, res, next) => {
    try {
        const promoService = new PromoService(MongoDB.client);
        console.log(req.params.name)
        const document = await promoService.findByNameUpdate(req.params.name);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items")
        );
    }
}
exports.findByMGG = async (req, res, next) => {
    try {
        const promoService = new PromoService(MongoDB.client);
        const documents = await promoService.findVoucherByMGG();
        return res.send(documents);
    } catch(error) {
        return next(
            new ApiError(500, "Error 500")
        );
    }
}
exports.findByFS = async (req, res, next) => {
    try {
        const promoService = new PromoService(MongoDB.client);
        const documents = await promoService.findVoucherByFS();
        return res.send(documents);
    } catch(error) {
        return next(
            new ApiError(500, "Error 500")
        );
    }
}
exports.delete = async (req, res, next) => {
    try{
        const postService = new PromoService(MongoDB.client);
        const document = await postService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Promo not found"));
        }
        return res.send({message: "Promo was deleted successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error deleting Promo with id=${req.params.id}`));
    }
};