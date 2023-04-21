const { ObjectId } = require("mongodb");
class TuyenDungService {
  constructor(client) {
    this.TDung = client.db().collection("recruitments");
  }

  extractTDungData(payload) {
    const tdung = {
      title: payload.title,
      image: payload.image,
      description1: payload.description1,
      description2: payload.description2,
      description3: payload.description3,
    };
    Object.keys(tdung).forEach(
      (key) => tdung[key] === undefined && delete tdung[key]
    );
    return tdung;
  }

  async create(payload) {
    const tdung = this.extractTDungData(payload);
    const result = await this.TDung.findOneAndUpdate(
      tdung,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.TDung.find(filter);
    return await cursor.toArray();
  }
  async findbyname(title) {
    return await this.find({
      title: { $regex: new RegExp(title), $options: "i" },
    });
  }
  async findById(id) {
    return await this.TDung.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractTDungData(payload);
    const result = await this.TDung.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    const result = await this.TDung.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async deleteAll() {
    const result = await this.TDung.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = TuyenDungService;
