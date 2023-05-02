const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');
class CmtService {
  constructor(client) {
    this.cmt = client.db().collection("cmts");
  }

  extractCmtData(payload) {
    const cmt = {
      comment: payload.comment,
      idpd: payload.idpd,
      idus: payload.idus,
      nameus: payload.nameus,
      image: payload.image,
    };
    return cmt;
  }


  async create(payload) {
    const cmt = this.extractCmtData(payload);
    const result = await this.cmt.insertOne(cmt, { returnDocument: "after", upsert: true });
    // return result.value;
  }
  async find(filter) {
    const cursor = await this.cmt.find(filter);
    return await cursor.toArray();
  }
  async findByIdpd(idpd) {
    const cursor = await this.cmt.find({idpd: idpd});
    return await cursor.toArray();
  }
  async findOrderByEmail(email) {
    const arrayOrder = await this.cmt.find({
        email: email,
    });
    return await arrayOrder.toArray();
}
  async findById(id) {
    return await this.cmt.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async delete(id) {
    const result = await this.cmt.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}
module.exports = CmtService;
