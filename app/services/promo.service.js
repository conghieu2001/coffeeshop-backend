const { ObjectId } = require("mongodb");
class PromoService {
  constructor(client) {
    this.Promo = client.db().collection("promos");
  }

  extractPromoData(payload) {
    const promo = {
      name: payload.name,
      description: payload.description,
      free: payload.free,
      loaiPromo: payload.loaiPromo,
      quantity: payload.quantity,
      payValue: payload.payValue,
    };
    Object.keys(promo).forEach(
      (key) => promo[key] === undefined && delete promo[key]
    );
    return promo;
  }

  async create(payload) {
    const promo = this.extractPromoData(payload);
    const result = await this.Promo.findOneAndUpdate(
      promo,
      { $set: { } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Promo.find(filter);
    return await cursor.toArray();
  }
  async findByName(name) {
    const cursor = await this.Promo.findOne({name: name})
    return cursor;
  }
  async findByNameUpdate(id) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const at = await this.Promo.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    console.log(at)
    const result = await this.Promo.findOneAndUpdate(
      filter,
      { $set: {quantity: at.quantity - 1} },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async findVoucherByMGG() {
    return await this.Promo.find({
      loaiPromo: "Ma giam gia",
    }).toArray();
  }
  async findVoucherByFS() {
    return await this.Promo.find({
      loaiPromo: "free ship",
    }).toArray();
  }
  async findById(id) {
    const at = await this.Promo.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    // console.log(at)
    return at;
  }
  async delete(id) {
    const result = await this.Promo.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}
module.exports = PromoService;
