const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');
class UserService {
  constructor(client) {
    this.user = client.db().collection("users");
  }

  extractUserData(payload) {
    // const password_hash = bcrypt.hashSync(payload.password,8)
    const user = {
      name: payload.name,
      // sdt: payload.sdt,
      email: payload.email,
      // gioitinh: payload.gioitinh,
      // ngaysinh: payload.ngaysinh,
      image: payload.picture,
      // password: password_hash,
      // image: 'https://taytou.com/wp-content/uploads/2022/08/Hinh-anh-Avatar-trang-tron-nen-xam-don-gian.png',
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
}
module.exports = UserService;
