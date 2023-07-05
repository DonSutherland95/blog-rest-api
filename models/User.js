const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAuthRegister:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: John
 *        email:
 *          type: string
 *          default: john@gmail.com
 *        password:
 *          type: string
 *          default: password
 *    CreateAuthRegisterResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        profilePic:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAuthLogin:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: John
 *        password:
 *          type: string
 *          default: password
 *    CreateAuthLoginResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateUserSchema:
 *      type: object
 *      required:
 *        - userId
 *        - username
 *        - password
 *      properties:
 *        userId:
 *          type: string
 *          default: 64a58d95badc623290b36160
 *        username:
 *          type: string
 *          default: Johnupdated
 *        password:
 *          type: string
 *          default: password
 *    UpdateUserSchemaResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        profilePic:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    DeleteUserSchema:
 *      type: object
 *      required:
 *        - userId
 *        - username
 *        - password
 *      properties:
 *        userId:
 *          type: string
 *          default: 64a5981544afa02658884a71
 *        username:
 *          type: string
 *          default: Johnupdated
 *        password:
 *          type: string
 *          default: password
 */

module.exports = mongoose.model("User", UserSchema);
