const userModel = require("../model/user");

const authentication = async (req, res, next) => {
  const bearerToken = req.query; //Khi đăng nhập thành công -> backend cấp cho phía client 1 đoạn mã

  if (!bearerToken) {
    return res.status(401).json({ message: "Ban chua dang nhap" });
  }

  const token = bearerToken.split(" ")[1]; // Bearer token
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = checkToken.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Ban chua dang nhap" });
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Ban chua dang nhap" });
  }
};