const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');


exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "User can not be empty"));
    }
    try {
        // console.log(req.body)
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        return res.send(document);
    } catch(error) {
        console.log(error)
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.findAllUser({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving users")
        );
    }
    return res.send(documents);
};
// exports.findAllbyEmail = async (req, res, next) => {
//     let documents = [];
//     try {
//         const userService = new UserService(MongoDB.client);
//         const {name} = req.query;
//         if(name) {
//             documents = await userService.findbyemail(email);
//         } else {
//             documents = await userService.find({});
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving users")
//         );
//     }
//     return res.send(documents);
// };
exports.loginAccount = async (req, res, next) => {
    // console.log(req.session.auth, 'null')
    if (req.body.email) {
        try {
            const userService = new UserService(MongoDB.client);

            const user = await userService.findByEmail(req.body.email);
            // console.log(user)
            if (user) {

                const resultPW = bcrypt.compareSync(req.body.password, user.password);
                // console.log(req.body.password)
                if(resultPW){
                    delete user.password;
                    return res.send(
                        { user: user, message: 'Ban da dang nhap thanh cong!' }
                    )
                }
                else{
                    return res.send(
                        { user: null, message: 'Ban da nhap sai mat khau!' }
                    )
                }
            }
            else {
                return res.send(

                    { user: null, message: 'Ban da nhap sai email' })
            }

        } catch (error) {
            console.log(error);
            return next(
                new ApiError(500, "An error occurred while login account")
            );
        }
    }
    else {
        return res.send(
            { user: null, message: 'Khong co tai khoan giong email' }
        )
    }

}
exports.findByEmail = async (req, res, next) => {
    if(req.body.email) {
        try {
            const userService = new UserService(MongoDB.client);

            const user = await userService.findByEmail(req.body.email);
            res.send(user);
        }catch (error) {
            console.log(error);
            return next(
                new ApiError(500, "An error occurred while login account")
            );
        }
    }else {
        return res.send(
            { user: null, message: 'Khong co tai khoan giong email' }
        )
    }
}
exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "User not found"));
        }
        console.log(document)
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(
                500,
                `Error retrieving user with id =${req.params.id}`
            )
        );
    }
};
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    // console.log(req.params.id, req.body)
    try{
        const userService = new UserService(MongoDB.client);
        // console.log(req.params.id, req.body)
        const document = await userService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, "User not found"));
        }
        // console.log(123)
        return res.send({message: "User was updated successfully",infoAfterUpdate:document});
    } catch(error) {
        console.log(error)
        return next(new ApiError(500, `Error updating user with id=${req.params.id}`));
    }
};
exports.delete = async (req, res, next) => {
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({message: "User was deleted successfully"});
    } catch(error) {
        return next(new ApiError(500, `Error deleting user with id=${req.params.id}`));
    }
};
exports.deleteAll = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} users were deleted successfully`,
        });
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while removing all users")
        );
    }
}; 
exports.updateQuyen = async (req, res, next) => {
    try {
      const userService = new UserService(MongoDB.client);
      const document = await userService.updateQuyen(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Order not found"));
      }
      return res.send({ message: "Quyền: 2" });
    } catch (error) {
      return next(
        new ApiError(500, `Error updating item with id=${req.params.id}`)
      );
    }
  };
  exports.backQuyen = async (req, res, next) => {
    try {
      const userService = new UserService(MongoDB.client);
      const document = await userService.backQuyen(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Order not found"));
      }
      return res.send({ message: "Quyền: 1" });
    } catch (error) {
      return next(
        new ApiError(500, `Error updating item with id=${req.params.id}`)
      );
    }
  };
  exports.loginGoogle = async (req, res, next) => {
    console.log(req.session?.auth, "conghieu")
    res.json(req.session?.auth)
  }
