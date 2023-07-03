const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - title
 *        - desc
 *        - photo
 *        - username
 *      properties:
 *        title:
 *          type: string
 *          default: Top 3 Weight Loss Tips
 *        desc:
 *          type: string
 *          default: 1. Count calories. 2. Drink more water. 3. Reduce carbs
 *        photo:
 *          type: string
 *          default: WorkoutImage.jpg
 *        username:
 *          type: string
 *          default: BruceWayne
 *    CreatePostResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        desc:
 *          type: string
 *        photo:
 *          type: string
 *        username:
 *          type: string
 *        _id:
 *          type: string
 *        categories:
 *          type: array
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *   schema:
 *     Post:
 *       type: object
 *       required:
 *        - title
 *        - desc
 *        - photo
 *        - username
 *       properties:
 *         title:
 *           type: string
 *         desc:
 *           type: string
 *         photo:
 *           type: string
 *         username:
 *           type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    DeletePostschema:
 *      type: object
 *      required:
 *        - username
 *      properties:
 *        username:
 *          type: string
 *          default: BruceWayne
 */
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
