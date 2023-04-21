const { ObjectId } = require("mongodb");
class UserService {
  constructor(client) {
    this.user = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      name: payload.name,
      sdt: payload.sdt,
      email: payload.email,
      gioitinh: payload.gioitinh,
      ngaysinh: payload.ngaysinh,
      password: payload.password,
    };
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }


  async create(payload) {
    const user = this.extractUserData(payload);
    const result = await this.user.findOneAndUpdate(
      user,
      { $set: { } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.user.find(filter);
    return await cursor.toArray();
  }
  async findbyname(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findbyemail(email) {
    return await this.find({
      email: { $regex: new RegExp(email), $options: "i" },
    });
  }
  async findById(id) {
    return await this.user.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractUserData(payload);
    const result = await this.user.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    const result = await this.user.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async deleteAll() {
    const result = await this.user.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = UserService;
