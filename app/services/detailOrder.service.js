const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
class DetailOrderService {
  constructor(client) {
    this.detailOrder = client.db().collection("detail-Orders");
  }

  async create(detaildata) {
    const result = await this.detailOrder.insertOne(detaildata, {
      returnDocument: "after",
      upsert: true,
    });
  }

  async findDetailOrderById(idhd) {
    const arrayDetail = await this.detailOrder.find({
      idhd: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
    });
    return await arrayDetail.toArray();
  }
  
  async deleteDetailOrder(idhd) {
    const result = await this.detailOrder.deleteMany({
      idhd: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
    });
    return result.deletedCount;
  }
}

module.exports = DetailOrderService;
