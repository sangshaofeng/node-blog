const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const url = require('../config/config.js').url;

mongoose.connect(url);

// 文章schema
exports.ArticleSchema = new Schema({
  title: { type: String },
  content: { type: String },
  summary: { type: String },
  author: { type: String },
  isDeleted: { type: String, default: '0' },
  category: { type: Schema.Types.ObjectId, ref: 'categories' },
  meta: {
    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
  }
}, { versionKey: false })

// 文章分类标签schema
exports.ArticleCate = new Schema({
  label: { type: String },
  createdAt: { type: Date, default: Date.now() }
}, { versionKey: false })

// 文章留言schema
exports.ArticleComments = new Schema({
  nickname: { type: String },
  isDeleted: { type: String, default: '0' },
  createdAt: { type: Date, default: Date.now() },
  articleId: { type: Schema.Types.ObjectId, ref: 'articles' }
}, { versionKey: false })
