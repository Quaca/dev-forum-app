const mongose = require("mongoose");
const Schema = mongose.Schema;

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.object.ObjectId,
    ref: users
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.object.ObjectId,
        reF: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.object.ObjectId,
        reF: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Post = mongose.model("Post", PostSchema);
