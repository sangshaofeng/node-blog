const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = require('../config/config.js').url;

mongoose.connect(url);

// 文章schema
exports.ArticleSchema = new Schema({
  title: { type: String },
  content: { type: String },
  is_deleted: { type: String, default: '0' },
  meta: {
    created_at: { type: Date, default: Date.now() },
    update_at: { type: Date, default: Date.now() }
  }
}, { versionKey: false })
