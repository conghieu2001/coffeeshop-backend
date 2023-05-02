const CmtService = require("../services/cmt.service");
const ItemService = require("../services/item.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require("bcryptjs");

exports.create = async (req, res, next) => {
  try {
    // console.log(req.body)
    const cmtService = new CmtService(MongoDB.client);
    const document = await cmtService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const cmtService = new CmtService(MongoDB.client);

    documents = await cmtService.find({});
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving comments"));
  }
  return res.send(documents);
};
exports.findByIdpd = async (req, res, next) => {
  let documents = [];
  // let items = [];
  try {
      const cmtService = new CmtService(MongoDB.client);
      const itemService = new ItemService(MongoDB.client);
      const items = await itemService.find({});
      // const getID = req.params.id;
      console.log(items[0]._id)
      for (let i =0; i < items.length ; i++) {
        const comments = await cmtService.findByIdpd(items[i]._id.toString());
        documents[i] = {
          picture: items[i].image,
          nameItem: items[i].name,
          comments: comments
        }
      }
      
      // console.log(documents)
    } catch (error) {
    console.log(error)
      return next(
          new ApiError(500, "An error occurred while retrieving comments")
      );
  }
  return res.send(documents);
};
// exports.findAllbyEmail = async (req, res, next) => {
//     let documents = [];
//     try {
//         const cmtService = new cmtService(MongoDB.client);
//         const {name} = req.query;
//         if(name) {
//             documents = await cmtService.findbyemail(email);
//         } else {
//             documents = await cmtService.find({});
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving users")
//         );
//     }
//     return res.send(documents);
// };
// exports.loginAccount = async (req, res, next) => {

//     if (req.body.email) {
//         try {
//             const cmtService = new CmtService(MongoDB.client);

//             const user = await cmtService.findByEmail(req.body.email);
//             // console.log(user)
//             if (user) {

//                 const resultPW = bcrypt.compareSync(req.body.password, user.password);
//                 console.log(req.body.password)
//                 if(resultPW){
//                     delete user.password;
//                     return res.send(
//                         { user: user, message: 'Ban da dang nhap thanh cong!' }
//                     )
//                 }
//                 else{
//                     return res.send(
//                         { user: null, message: 'Ban da nhap sai mat khau!' }
//                     )
//                 }
//             }
//             else {
//                 return res.send(

//                     { user: null, message: 'Ban da nhap sai email' })
//             }

//         } catch (error) {
//             console.log(error);
//             return next(
//                 new ApiError(500, "An error occurred while login account")
//             );
//         }
//     } else {
//         return res.send(
//             { user: null, message: 'Khong co tai khoan giong email' }
//         )
//     }

// }
// exports.findByEmail = async (req, res, next) => {
//     if(req.body.email) {
//         try {
//             const cmtService = new CmtService(MongoDB.client);

//             const user = await cmtService.findByEmail(req.body.email);
//             res.send(user);
//         }catch (error) {
//             console.log(error);
//             return next(
//                 new ApiError(500, "An error occurred while login account")
//             );
//         }
//     }else {
//         return res.send(
//             { user: null, message: 'Khong co tai khoan giong email' }
//         )
//     }
// }
// exports.findOne = async (req, res, next) => {
//     try {
//         const cmtService = new CmtService(MongoDB.client);
//         const document = await cmtService.findById(req.params.id);
//         if(!document) {
//             return next(new ApiError(404, "User not found"));
//         }
//         console.log(document)
//         return res.send(document);
//     } catch(error) {
//         return next(
//             new ApiError(
//                 500,
//                 `Error retrieving user with id =${req.params.id}`
//             )
//         );
//     }
// };
// exports.update = async (req, res, next) => {
//     if(Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, "Data to update can not be empty"));
//     }

//     // console.log(req.params.id, req.body)
//     try{
//         const cmtService = new CmtService(MongoDB.client);
//         // console.log(req.params.id, req.body)
//         const document = await cmtService.update(req.params.id, req.body);
//         if(!document) {
//             return next(new ApiError(404, "User not found"));
//         }
//         // console.log(123)
//         return res.send({message: "User was updated successfully",infoAfterUpdate:document});
//     } catch(error) {
//         console.log(error)
//         return next(new ApiError(500, `Error updating user with id=${req.params.id}`));
//     }
// };
// exports.delete = async (req, res, next) => {
//     try{
//         const cmtService = new CmtService(MongoDB.client);
//         const document = await cmtService.delete(req.params.id);
//         if(!document) {
//             return next(new ApiError(404, "User not found"));
//         }
//         return res.send({message: "User was deleted successfully"});
//     } catch(error) {
//         return next(new ApiError(500, `Error deleting user with id=${req.params.id}`));
//     }
// };
// exports.deleteAll = async (_req, res, next) => {
//     try {
//         const cmtService = new CmtService(MongoDB.client);
//         const deletedCount = await cmtService.deleteAll();
//         return res.send({
//             message: `${deletedCount} users were deleted successfully`,
//         });
//     } catch(error) {
//         return next(
//             new ApiError(500, "An error occurred while removing all users")
//         );
//     }
// };
// exports.findByCondition = async (req, res, next) => {
//     try {
//         const cmtService = new CmtService(MongoDB.client);
//         const document = await CmtService.findByCondition()
//     } catch(error) {
//         console.log(error);
//     }
// };
exports.delete = async (req, res, next) => {
  try{
      const cmtService = new CmtService(MongoDB.client);
      const document = await cmtService.delete(req.params.id);
      if(!document) {
          return next(new ApiError(404, "Post not found"));
      }
      return res.send({message: "Post was deleted successfully"});
  } catch(error) {
      return next(new ApiError(500, `Error deleting post with id=${req.params.id}`));
  }
};