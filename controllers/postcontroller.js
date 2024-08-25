const postModel = require("../models/post");
const userModel = require("../models/user");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const apiKey = req.query.apiKey;
  console.log(apiKey);

  if (apiKey) {
    const userInfo = await getUserInfo(apiKey);

    if (userInfo) {
      const userId = userInfo._id;
      const content = req.body.content;

      const newPost = new postModel({
        userId: userId,
        content: content,
      });

      try {
        const savedPost = await newPost.save();
        res.status(201).send({
          message: "Tạo bài viết thành công",
          data: savedPost,
        });
      } catch (error) {
        res.status(500).send({
          message: "Lỗi khi lưu bài viết",
          error: error.message,
        });
      }
    } else {
      res.status(400).send({
        message: "API Key không hợp lệ",
      });
    }
  } else {
    res.status(400).send({
      message: "Cần có API Key",
    });
  }
};

const getUserInfo = async (apiKey) => {
  const myArray = apiKey.split("-");
  if (myArray.length >= 3) {
    const userId = myArray[1];
    if (mongoose.isValidObjectId(userId)) {
      const user = await userModel.findById(userId).exec();
      return user;
    }
  }
  return null;
};

const updatePost = async (req, res) => {
  const apiKey = req.query.apiKey;

  if (apiKey) {
    const userInfo = await getUserInfo(apiKey);

    if (userInfo) {
      const postId = req.params.id;
      const content = req.body.content;

      if (mongoose.isValidObjectId(postId)) {
        try {
          const post = await postModel.findById(postId);

          if (post) {
            if (post.userId.toString() === userInfo._id.toString()) {
              post.content = content;
              post.updatedAt = new Date();

              const updatedPost = await post.save();
              res.status(200).send({
                message: "Cập nhật bài viết thành công",
                data: updatedPost,
              });
            } else {
              res.status(403).send({
                message: "Không có quyền cập nhật bài viết này",
              });
            }
          } else {
            res.status(404).send({
              message: "Không tìm thấy bài viết",
            });
          }
        } catch (error) {
          res.status(500).send({
            message: "Lỗi khi cập nhật bài viết",
            error: error.message,
          });
        }
      } else {
        res.status(400).send({
          message: "ID bài viết không hợp lệ",
        });
      }
    } else {
      res.status(400).send({
        message: "API Key không hợp lệ",
      });
    }
  } else {
    res.status(400).send({
      message: "Cần có API Key",
    });
  }
};

module.exports = {
  createPost,
  updatePost,
};
