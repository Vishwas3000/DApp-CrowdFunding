const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    cid : String,
    rid: String,
    info: String, 
    amount: Number,
    date: { type: Date, default: Date.now },
    status: String,
  });
  
schema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
  
const request = mongoose.model("Request", schema);
module.exports = request