const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    content:  {
        type: String,
        require: true,
    }
}, {
    timeStamps: true
})

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;