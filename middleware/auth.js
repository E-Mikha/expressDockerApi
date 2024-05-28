const jwt = require("jsonwebtoken");

const authentificateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = !authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorazed" });

    jwt.verify(token, process.env.SECRET_KEY, (err, uset) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      req.user = user;

      next();
    });
  }
};

module.exports = authentificateToken;
