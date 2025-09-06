const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  user_id: {type: String, required: true},
  session_id: {type: String, required: true},
  message: {type: String, required: true},
  response: {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
  intent: String,
  metadata: { sentiment: String, context: object}
});

module.exports = mongoose.model("Chatbot", chatbotSchema);
