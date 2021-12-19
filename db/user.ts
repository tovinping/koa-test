import mongoose from "mongoose";
interface IUserModel {
  account: string;
  password: string;
  name: string;
  mail: string;
}

const schema = new mongoose.Schema<IUserModel>({
  account: String,
  password: String,
  name: String,
  mail: String,
});
export const User = mongoose.model("user", schema);
