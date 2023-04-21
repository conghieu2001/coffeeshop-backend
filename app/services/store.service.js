const { ObjectId } = require("mongodb");
class StoreService {
  constructor(client) {
    this.Store = client.db().collection("stores");
  }

  extractStoreData(payload) {
    const store = {
      name: payload.name,
      image: payload.image,
      address: payload.address,
      timeStart: payload.timeStart,
      timeEnd: payload.timeEnd,
    };
    Object.keys(store).forEach(
      (key) => store[key] === undefined && delete store[key]
    );
    return store;
  }

  async create(payload) {
    const store = this.extractStoreData(payload);
    const result = await this.Store.findOneAndUpdate(
      store,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.Store.find(filter);
    return await cursor.toArray();
  }
  async findbyname(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findById(id) {
    return await this.Store.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractStoreData(payload);
    const result = await this.Store.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    const result = await this.Store.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async deleteAll() {
    const result = await this.Store.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = StoreService;
