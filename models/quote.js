var mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
    author: String,
    content: String,
    pic: String
});

mongoose.model('Quote', QuoteSchema);
