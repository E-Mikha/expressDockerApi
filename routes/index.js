const express = require("express");
const router = express.Router();
const multer = require("multer");
const { UserController, PostController } = require("../controllers");
const authentificateToken = require("../middleware/auth");

const uploadDestination = "uploads";

// Показываем где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

// Роутеры пользователя
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authentificateToken, UserController.current);
router.get("/users/:id", authentificateToken, UserController.getUserById);
router.put("/users/:id", authentificateToken, UserController.updateUser);

// Роуты постов
router.post("/posts", authentificateToken, PostController.createPost);
router.get("/posts", authentificateToken, PostController.getAllPosts);
router.get("/posts/:id", authentificateToken, PostController.getPostById);
router.delete("/posts", authentificateToken, PostController.deletePost);

module.exports = router;
