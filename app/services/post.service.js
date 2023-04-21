const { ObjectId } = require("mongodb");
class PostService {
  constructor(client) {
    this.Post = client.db().collection("posts");
  }

  extractPostData(payload) {
    const post = {
      name: payload.name,
      date: payload.date,
      image: payload.image,
      description: payload.description,
      banner: payload.banner,
    };
    Object.keys(post).forEach(
      (key) => post[key] === undefined && delete post[key]
    );
    return post;
  }

  async create(payload) {
    const post = this.extractPostData(payload);
    const result = await this.Post.findOneAndUpdate(
      post,
      { $set: { banner: post.banner === true } },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  async find(filter) {
    const cursor = await this.Post.find(filter);
    return await cursor.toArray();
  }
  async findbyname(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  async findbyLoai() {
    return await this.find({
      loai: "coffeeholic",
      });
  }
  async findbyLoaiT() {
    return await this.find({
      loai: "teaholic",
      });
  }
  async findbyLoaiB() {
    return await this.find({
      loai: "blog",
      });
  }
  async findById(id) {
    return await this.Post.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractPostData(payload);
    const result = await this.Post.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    const result = await this.Post.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async findFavorite() {
    return await this.find({ favorite: true });
  }
  async deleteAll() {
    const result = await this.Post.deleteMany({});
    return result.deletedCount;
  }
}
module.exports = PostService;
