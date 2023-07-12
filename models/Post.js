const mongoose = require('mongoose');
const validator = require('validator');

const PostSchema = new mongoose.Schema(
  {
    image: {
      type: Object,
      url: String,
      public_id: String,
    },
    images: [
      {
        type: Object,
        url: String,
        public_id: String,
      },
    ],
    video: {
      type: Object,
      url: String,
      public_id: String,
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nofComments: {
      type: Number,
      default: 0,
    },
    nofLikes: {
      type: Number,
    },
  }, // without toJSON: { virtuals: true }, toObject: { virtuals: true } our virtual field will now show
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

module.exports = mongoose.model('Post', PostSchema);
