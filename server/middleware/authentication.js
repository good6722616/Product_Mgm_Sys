import jwt from "jsonwebtoken";
import User from "../models/users.js";

const userAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ error: "Please Log in or Create An Account" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Invalid Headers" });
  }
};

const adminAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user.isAdmin) {
        return res.status(401).json({ error: "You are not an admin" });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: "Please Log in or Create An Account" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Invalid Headers" });
  }
};

export { userAuth, adminAuth };
