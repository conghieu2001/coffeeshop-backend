const { ObjectId } = require("mongodb");
class ItemService {
  constructor(client) {
    this.Item = client.db().collection("items");
  }

  extractItemData(payload) {
    const item = {
      name: payload.name,
      description: payload.description,
      image: payload.image,
      price: payload.price,
      bestsale: payload.bestsale,
      quantity: payload.quantity,
      deleted: payload.deleted,
    };
    Object.keys(item).forEach(
      (key) => item[key] === undefined && delete item[key]
    );
    return item;
  }

  async create(payload) {
    const item = this.extractItemData(payload);
    const result = await this.Item.findOneAndUpdate(
      item,
      { $set: { deleted: item.deleted === true, bestsale: item.bestsale === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.Item.find({"deleted": false});
    return await cursor.toArray();
  }
  async findDeleted(filter ) {
    const cursor = await this.Item.find({"deleted": true});
    return await cursor.toArray();
  }
  async findBestsale(filter ) {
    const cursor = await this.Item.find({"bestsale": true});
    return await cursor.toArray();
  }
  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findById(id) {
    return await this.Item.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractItemData(payload);
    const result = await this.Item.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  // async delete(id) {
  //   const filter = {
  //     _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  //   };
  //   const deletee = this.extractItemData(payload);
  //   const result = await this.Item.findOneAndUpdate(
  //     filter,
  //     { $set: {deleted: deletee.deleted === true} },
  //     { returnDocument: "after" }
  //   );
  //   return result.value;
  // }
  async delete(id) {
    const result = await this.Item.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async restore(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const deletee = this.extractItemData(payload);
    const result = await this.Item.findOneAndUpdate(
      filter,
      { $set: {deleted: deletee.deleted === false} },
      { returnDocument: "after" }
    );
    return result.value;
  }
}
module.exports = ItemService;
