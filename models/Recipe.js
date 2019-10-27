const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is the first and most important step - don\'t forget that!'],
        minlength: [3, 'Please provide at least 3 letters. The way shall not be that easy!'],
        maxlength: 150,
        unique: true
    },
    content: {
        type: [String],
        required: true,
        validate: {
            validator(v) {
                return v.length >=2 && v.length <= 7 
            },
            message(props) {
                return 'Ooops! Seems like you just missed Heaven...'
            }
        }
    },
    images: {
        type: [Buffer],
        required: true,
        validate: {
            validator(v) {
                return v.length >=1 && v.length <= 7 
            },
            message(props) {
                return 'Ooops! Seems like you are seing stars...'
            }
        }
    },
    ingredients: {
        type: [String],
        required: true,
        validate: {
            validator(v) {
                return v.length >= 1
            },
            message() {
                return 'If you don\'t show us the way, how do we follow you?'
            }
        }
    },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema)