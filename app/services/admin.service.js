const { ObjectId } = require("mongodb");
class AdminService {
  constructor(client) {
    this.Admin = client.db().collection("admins");
  }

  extractAdminData(payload) {
    const admin = {
      name: payload.name,
      image: payload.image,
      username: payload.username,
      password: payload.password,
    };
    Object.keys(admin).forEach(
      (key) => admin[key] === undefined && delete admin[key]
    );
    return admin;
  }


  async find(filter) {
    const cursor = await this.Admin.find(filter);
    return await cursor.toArray();
  }
  async findByName(username) {
    return await this.find({
      username: { $regex: new RegExp(username), $options: "i" },
    });
  }
  async findById(id) {
    return await this.Admin.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
}
module.exports = AdminService;
