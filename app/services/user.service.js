const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');
class UserService {
  constructor(client) {
    this.user = client.db().collection("users");
  }

  extractUserData(payload) {
    const password_hash = bcrypt.hashSync(payload.password,8)
    const user = {
      name: payload.name,
      sdt: payload.sdt,
      email: payload.email,
      gioitinh: payload.gioitinh,
      ngaysinh: payload.ngaysinh,
      password: password_hash,
      image: 'https://taytou.com/wp-content/uploads/2022/08/Hinh-anh-Avatar-trang-tron-nen-xam-don-gian.png',
      quyen: 1,
    };
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }


  async create(payload) {
    const user = this.extractUserData(payload);
    console.log(123)
    const result = await this.user.findOneAndUpdate(
      user,
      { $set: { } },
      { returnDocument: "after", upsert: true }
      );
      console.log(result)
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
  async findByEmail(email) {
    const userEmail= await this.user.findOne({
        email: email,
    });
    // console.log(userEmail);
    return userEmail;
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
    delete payload._id;
    // console.log(filter)
    // console.log(payload)
    const result = await this.user.findOneAndUpdate(
      filter,
      { $set: payload },
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
