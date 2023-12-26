import { Schema, model } from "mongoose"
const user = new Schema({
	_id: Schema.Types.ObjectId,
	email:Schema.Types.String,
    data:Schema.Types.Number,

})
const User = new model("User",user)
export default User;