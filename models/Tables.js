const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  reserved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Table= mongoose.model('Table', tableSchema);
module.exports=Table;
