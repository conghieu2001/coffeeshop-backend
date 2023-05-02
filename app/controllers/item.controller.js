const ItemService = require("../services/item.service");
const CmtService = require("../services/cmt.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.create(req.body);
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
        const itemService = new ItemService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await itemService.findByName(name);
        } else {
            documents = await itemService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items")
        );
    }
    return res.send(documents);
};
exports.findByLoai = async (req, res, next) => {
    
        // try {
        //     const itemService = new ItemService(MongoDB.client);

        //     const user = await itemService.findByLoai(loai);
        //     res.send(user);
        // }catch (error) {
        //     // console.log(error);
        //     return next(
        //         new ApiError(500, "An error occurred while login account")
        //     );
        // }
    
}
exports.findAllDeleted = async (req, res, next) => {
    let documents = [];
    try {
        const itemService = new ItemService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await itemService.findByName(name);
        } else {
            documents = await itemService.findDeleted({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items")
        );
    }
    return res.send(documents);
};
exports.findBestsale = async (req, res, next) => {
    try {
        const itemService = new ItemService(MongoDB.client);
        const documents = await itemService.findBestsale();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while bestsaling items")
        );
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    let products = {};
    try {
        const itemService = new ItemService(MongoDB.client);
        const cmtService = new CmtService(MongoDB.client);
        const document = await itemService.findById(req.params.id);
        const loai = await itemService.findByLoai(document.loaiItem);
        const comments = await cmtService.findByIdpd(req.params.id);
        products = {product : document, loai: loai, comments: comments};
        console.log(products)
        // console.log(document.loaiItem)
        if(!document) {
            return next(
                new ApiError(404, "Item not found")
            );
        }
        return res.send(products);
    } catch(error) {
        console.log(error)
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Item not found"));
        }
        return res.send({message: "Item was updated successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error updating item with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try{
        const postService = new ItemService(MongoDB.client);
        const document = await postService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Post not found"));
        }
        return res.send({message: "Post was deleted successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error deleting post with id=${req.params.id}`));
    }
};
exports.restore = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to restore can not be empty"));
    }

    try{
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.restore(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Item not found"));
        }
        return res.send({message: "Item was restore successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error restoring item with id=${req.params.id}`));
    }
};
exports.findAllCoffee = async (req, res, next) => {
    let documents = [];
    try {
        const itemService = new ItemService(MongoDB.client);
        
        documents = await itemService.findByCoffee({});
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items coffee")
        );
    }
    return res.send(documents);
};
exports.findAllHiTea = async (req, res, next) => {
    let documents = [];
    try {
        const itemService = new ItemService(MongoDB.client);
        
        documents = await itemService.findByHiTea({});
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items HiTea")
        );
    }
    return res.send(documents);
};
exports.findAllTea = async (req, res, next) => {
    let documents = [];
    try {
        const itemService = new ItemService(MongoDB.client);
        
        documents = await itemService.findBytea({});
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items tea")
        );
    }
    return res.send(documents);
};
exports.findName = async (req, res, next) => {
    let documents = [];
    try {
        const itemService = new ItemService(MongoDB.client);
        const name = req.params.name;
        console.log(req.params.name)
        documents = await itemService.findByName(name);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving items tea")
        );
    }
    return res.send(documents);
};
