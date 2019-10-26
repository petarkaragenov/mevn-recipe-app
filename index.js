const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const RecipeController = require('./controllers/RecipeController')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB created successfully'))
    .catch(err => console.log(err))

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/(.jpg|.jpeg|.png)$/)) {
            return cb(new Error('File must be jpg, jpeg or png'))
        }
        cb(undefined, true)
    }
})

app.post('/api/recipes', upload.array('images', 7), 
    RecipeController.create,
    (err, req, res, next) => {
        return res.status(400).json({
            message: err.message,
            success: false
        })
})

app.get('/api/recipes/:id/images/:index', RecipeController.image)

app.get('/api/recipes', RecipeController.index)

app.get('/api/recipes/:id', RecipeController.view)

app.patch('/api/recipes/:id', upload.array('images', 7), 
    RecipeController.update, 
    (err, req, res, next) => {
        return res.status(400).json({
            message: err.message,
            success: false
        })
})

app.patch('/api/recipes/:id/vote', RecipeController.like)

app.delete('/api/recipes/:id', RecipeController.destroy)

app.listen(port, () => console.log('Listening on port ' + port))
