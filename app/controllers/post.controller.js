const PostService = require("../services/post.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");



exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const postService = new PostService(MongoDB.client);
        const document = await postService.create(req.body);
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
        const postService = new PostService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await postService.findByName(name);
        } else {
            documents = await postService.find({});
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
        const postService = new PostService(MongoDB.client);
        const document = await postService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Post not found"));
        }
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving post with id =${req.params.id}`
            )
        );
    }
};
exports.findLoai = async (req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const document = await postService.findbyLoai();
        // if(!document) {
        //     return next(new ApiError(404, "Post not found"));
        // }
        return res.send(document);
        
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving post with `
            )
        );
    }
};
exports.findLoaiT = async (req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const document = await postService.findbyLoaiT();
        // if(!document) {
        //     return next(new ApiError(404, "Post not found"));
        // }
        return res.send(document);
        
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving post with `
            )
        );
    }
};
exports.findLoaiB = async (req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const document = await postService.findbyLoaiB();
        // if(!document) {
        //     return next(new ApiError(404, "Post not found"));
        // }
        return res.send(document);
        
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving post with `
            )
        );
    }
};
exports.findAllFavorite = async (req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const documents = await postService.findAllFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while bestsaling posts")
        );
    }
    return res.send(documents);
};
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try{
        const postService = new PostService(MongoDB.client);
        const document = await postService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "Post not found"));
        }
        return res.send({message: "Post was updated successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error updating post with id=${req.params.id}`));
    }
};
exports.delete = async (req, res, next) => {
    try{
        const postService = new PostService(MongoDB.client);
        const document = await postService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Post not found"));
        }
        return res.send({message: "Post was deleted successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error deleting post with id=${req.params.id}`));
    }
};
exports.deleteAll = async (_req, res, next) => {
    try {
        const postService = new PostService(MongoDB.client);
        const deletedCount = await postService.deleteAll();
        return res.send({
            message: `${deletedCount} posts were deleted successfully`,
        });
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while removing all posts")
        );
    }
}; 
