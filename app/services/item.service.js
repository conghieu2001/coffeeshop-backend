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
      loaiItem: payload.loaiItem,
      favorite: payload.favorite,
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
      { $set: { deleted: item.deleted === true, bestsale: item.bestsale === true, favorite: item.favorite === true} },
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
  async findFavorite(filter ) {
    const cursor = await this.Item.find({"favorite": true});
    return await cursor.toArray();
  }
  async findByName(name) {
    console.log(name)
    return await this.Item.find({
      name: { $regex: new RegExp(name), $options: "i" },
    }).toArray();
  }
  async findByLoai(loai) {
    // console.log(loai);
    return await this.Item.find({
      loaiItem: loai,
    }).toArray();
  }
  async findById(id) {
    const at = await this.Item.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    // console.log(at)
    return at;
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
  async updateFavorite(id) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    // const update = this.extractItemData(payload);
    // console.log(filter, '123')
    const at = await this.Item.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      });
      // console.log(at.favorite)
      const isFavorite = at.favorite;
    const result = await this.Item.findOneAndUpdate(
      filter,
      { $set: {favorite: !isFavorite} },
      { returnDocument: "after" }
    );
    return result.value;
    // const at = await this.Item.findOne({
    //   _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    // });
    // console.log(at)
    // const result = await this.Item.updateOne(
    //     at._id,
    //     { $set: {favorite: true} },
    //     { returnDocument: "after" }
    //   );
    //   return result.value;
  }
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
  async findByCoffee(filter) {
    const cursor = await this.Item.find({"loaiItem": "coffee"});
    return await cursor.toArray();
  }
  async findByHiTea(filter) {
    const cursor = await this.Item.find({"loaiItem": "hitea"});
    return await cursor.toArray();
  }
  async findBytea(filter) {
    const cursor = await this.Item.find({"loaiItem": "tea"});
    return await cursor.toArray();
  }
}
module.exports = ItemService;
