const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const existUsername = await Post.findOne({ username: req.body.username });
    if (existUsername) {
      res.status(500).json({ message: "Username is already taken" });
    } else {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only update your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @openapi
 * '/api/posts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get all posts
 *     description: Fetch all posts from mongodb
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @openapi
 * '/api/posts':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a post
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server Error
 */

/**
 * @openapi
 * '/api/posts/{_id}':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get a single post by the id
 *     parameters:
 *      - name: _id
 *        in: path
 *        description: The id of the post
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Post _id should be 24 characters long
 */

/**
 * @openapi
 * '/api/posts/{_id}':
 *  put:
 *     tags:
 *     - Posts
 *     summary: Update a post by the id
 *     parameters:
 *      - name: _id
 *        in: path
 *        description: The id of the post
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePostInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePostResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      404:
 *        description: Post not found
 *      500:
 *        description: Post _id should be 24 characters long
 */

/**
 * @openapi
 * '/api/posts/{_id}':
 *  delete:
 *     tags:
 *     - Posts
 *     summary: Delete a post by id and corresponding username
 *     description:  Delete a user by id and corresponding username
 *     parameters:
 *      - name: _id
 *        in: path
 *        description: The id of the post and the current username is required
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/DeletePostschema'
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      404:
 *        description: Post not found
 *      500:
 *        description: Post _id should be 24 characters long
 */
module.exports = router;
