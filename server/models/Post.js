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
});

class PostClass {
  static async list({ offset = 0, limit = 10 } = {}) {
    const posts = await this.find({})
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

  static async add({ name, content }) {
    const slug = await generateSlug(this, name);

    return this.create({
      name,
      slug,
      content,
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
}

mongoSchema.loadClass(PostClass);

const Post = mongoose.model("Post", mongoSchema);

module.exports = Post;
