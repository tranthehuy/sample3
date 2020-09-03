const mongoose = require("mongoose");
const generateSlug = require("../utils/slugify");

const { Schema } = mongoose;

const mongoSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
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

  static async getById({ id } = {}) {
    return await this.findById(id);
  }

  static async add({ content, postId, userId }) {
    return this.create({
      postId,
      content,
      userId,
      createdAt: new Date(),
    });
  }

  static async edit({ id, content }) {
    const comment = await this.findById(id);

    if (!comment) {
      throw new Error("Not found");
    }

    const modifier = {
      content,
    };

    const editedComment = await this.findOneAndUpdate(
      { _id: id },
      { $set: modifier }
    );

    return editedComment;
  }

  static async delete({ id }) {
    const comment = await this.findById(id);

    if (!comment) {
      throw new Error("Not found");
    }

    const deletedComment = await this.deleteOne({ _id: id });

    return deletedComment;
  }
}

mongoSchema.loadClass(CommentClass);

const Comment = mongoose.model("Comment", mongoSchema);

module.exports = Comment;
