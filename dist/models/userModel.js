"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    applications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Application"
        }
    ]
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map