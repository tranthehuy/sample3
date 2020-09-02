const mongoose = require("mongoose");
const generateSlug = require("../utils/slugify");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  postId: {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
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

class CommentClass {
  static async list({ offset = 0, limit = 10, postId } = {}) {
    const comments = await this.find(postId ? { postId } : {})
      .sort({ createdAt: 1 })
      .skip(offset)
      .limit(limit);
    return { comments };
  }

  static async add({ content, postId, userId }) {
    return this.create({
      postId,
      content,
      userId,
      createdAt: new Date(),
    });
  }
}

mongoSchema.loadClass(CommentClass);

const Comment = mongoose.model("Comment", mongoSchema);

module.exports = Comment;
