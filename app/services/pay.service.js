const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
class PayService {
  constructor(client) {
    this.pay = client.db().collection("pays");
  }

  extractPayData(payload) {
    const time = new Date();
    const pay = {
      address: payload.address,
      // deliveryTime: payload.deliveryTime,
      nameKH: payload.nameKH,
      sdt: payload.sdt,
      ghichu: payload.ghichu,
      methodPay: payload.methodPay,
      email: payload.email,
      thoigian: time,
      trangthai: "Cho xac nhan",
      TongTien: payload.TongTien,
    };
    // Object.keys(pay).forEach(
    //   (key) => pay[key] === undefined && delete pay[key]
    // );
    return pay;
  }

  async create(payload) {
    const pay = this.extractPayData(payload);
    const result = await this.pay.insertOne(pay, {
      returnDocument: "after",
      upsert: true,
    });
    // return result.value;
  }
  async findOrderByEmail(email) {
    const arrayOrder = await this.pay.find({
      email: email,
    });
    return await arrayOrder.toArray();
  }
  async find(filter) {
    const cursor = await this.pay.find(filter);
    return await cursor.toArray();
  }

  async findOrderById(idhd) {
    const arrayOrder = await this.pay.findOne({
      _id: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
    });
    return await arrayOrder;
  }

  async update(idhd) {
    const filter = {
      _id: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
    };
    // const update = this.extractItemData(payload);
    const result = await this.pay.findOneAndUpdate(
      filter,
      { $set: { trangthai: "Dang giao hang" } },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async deleteOrdered(idhd) {
    const result = await this.pay.findOneAndDelete({
      _id: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
    });
    return result.value;
  }
  async backStatus(idhd) {
    const filter = {
      _id: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
    };
    // const update = this.extractItemData(payload);
    const result = await this.pay.findOneAndUpdate(
      filter,
      { $set: { trangthai: "Cho xac nhan" } },
      { returnDocument: "after" }
    );
    return result.value;
  }
}
module.exports = PayService;
