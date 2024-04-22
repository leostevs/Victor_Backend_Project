const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    tags: Number,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String,
        enum: [ 'published', 'draft' ]
    },
    read_count: Number,
    read_time: Number,
    body: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;