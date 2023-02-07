const mongoose = require('mongoose')
const shortId = require('shortid')

const urlInfoSchema = new mongoose.Schema({
    Url : {
        type : String,
        required : true
    },
    ShortUrl : {
        type : String,
        default : shortId.generate
    },
    Clicks : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('UrlInfo', urlInfoSchema)