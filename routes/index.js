const express = require('express');
const router = express.Router();
const multer = require('multer');
const {UserController, PostController, CommentController, LikeController, FollowController} = require('../controllers');
const authenticateToken = require('../middleware/auth');

//Показываю, где хранить файлы
const uploadDestination = 'uploads';

const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploads = multer({storage: storage})


// Rotes пользователя
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', authenticateToken, UserController.current)
router.get('/users/:id', authenticateToken, UserController.getUserById)
router.put('/users/:id', authenticateToken, UserController.updateUser)


//Routes постов
router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPosts)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)


//Routes комментариев
router.post('/comments', authenticateToken, CommentController.createComment)
router.delete('/comments/:id', authenticateToken, CommentController.deleteComment)


//Routes лайков
router.post('/likes', authenticateToken, LikeController.likePost)
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost)

//Routes подписок
router.post('/follow', authenticateToken, FollowController.followUser)
router.delete('/unfollow/:id', authenticateToken, FollowController.unFollowUser)

module.exports = router;