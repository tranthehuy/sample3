const mongoose = require("mongoose");
const generateSlug = require("../utils/slugify");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },

  content: {
    type: String,
  },

  userId: {
    type: String,
  },
});

class PostClass {
  static async list({ offset = 0, limit = 10, userId, query } = {}) {
    const byPassedSpace = `.*${query}.*`;
    const regex = new RegExp(["^", byPassedSpace, "$"].join(""), "i");
    console.log("byPassedSpace", byPassedSpace);
    const posts = await this.find(
      userId
        ? { userId }
        : {
            $or: [{ name: { $regex: regex } }, { content: { $regex: regex } }],
          }
    )
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return { posts };
  }

  static async getBySlug({ slug }) {
    const postDoc = await this.findOne({ slug });
    if (!postDoc) {
      throw new Error("Post not found");
    }

    const post = postDoc.toObject();

    return post;
  }

  static async add({ name, content, userId }) {
    const slug = await generateSlug(this, name);

    return this.create({
      name,
      slug,
      content,
      userId,
      createdAt: new Date(),
    });
  }

  static async edit({ id, name, content = "" }) {
    const post = await this.findById(id, "slug name");

    if (!post) {
      throw new Error("Not found");
    }

    const modifier = {
      content,
    };

    if (name !== post.name) {
      modifier.name = name;
      modifier.slug = await generateSlug(this, name);
    }

    const editedPost = await this.findOneAndUpdate(
      { _id: id },
      { $set: modifier },
      { fields: "slug", new: true }
    );

    return editedPost;
  }

  static async delete({ id }) {
    const comment = await this.findById(id);

    if (!comment) {
      throw new Error("Not found");
    }

    const result = await this.deleteOne({ _id: id });

    return result;
  }
}

mongoSchema.loadClass(PostClass);

const Post = mongoose.model("Post", mongoSchema);

module.exports = Post;
