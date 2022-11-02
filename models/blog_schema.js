const moogoose = require('mongoose');

//Define a schema
const Schema = moogoose.Schema;
// const BlogId = Schema.BlogId;

//Define Blog schema
const BlogSchema = new Schema({
  id: moogoose.Schema.Types.ObjectId,
  user: {
    type: moogoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  read_count: { type: Number, default: 0 },

  author: String,
  description: String,

  read_time: Number,
  tags: Array,
  timestamps: Date,
});

// Export the model
// const Blog = moogoose.model('Blog', BlogSchema)
// module.exports = Blog
 module.exports = moogoose.model('Blog', BlogSchema); //This is the name of the collection in the database