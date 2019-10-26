const sharp = require('sharp')
const Recipe = require('../models/Recipe')

module.exports = {
    async create(req, res) {
        if (req.files.length < 1) return res.status(400).send({ 
            error: 'Please attach a file',
            success: false
        })
    
        const buffers = req.files.map(file => {
            return file.buffer
        })
    
        let images = []
    
        for (buffer of buffers) {
            let image = await sharp(buffer)
                .resize(600, 400)
                .png()
                .toBuffer()
            images.push(image)
        }
    
        const recipe = new Recipe({ ...req.body, images })
        
        try {
            await recipe.save()
            res.status(201).json({
                success: true
            })
        } catch(e) {
            res.status(400).json({
                message: e.message,
                success: false
            })
        }
    },
    async image(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id)
    
            if (!recipe) return res.send(404).json({ 
                message: 'No such recipe found', 
                success: false 
            })
    
            if (!recipe.images[req.params.index]) return res.send(404).json({ 
                message: 'No such image found', 
                success: false 
            })
    
            res.set('Content-Type', 'image/png')
            res.send(recipe.images[req.params.index])
        } catch (e) {
            return res.send(404).json({
                success: false
            })
        }
    },
    async view(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id)
            if (!recipe) return res.status(404).json({
                message: 'Recipe not found',
                success: false
            })
            res.json({ recipe, success: true })
        } catch (e) {
            res.status(500).json({
                message: e.message,
                success: false
            })
        }
    },
    async update(req, res) {
        try {
            const props = Object.keys(req.body)
            const recipe = await Recipe.findById(req.params.id)
            if (!recipe) return res.status(404).json({
                message: 'Recipe not found',
                success: false
            })
            
            props.map(prop => recipe[prop] = req.body[prop])
    
            if (req.files.length > 0) {
                console.log('ketra')
                let images = []
    
                const buffers = req.files.map(file => {
                    return file.buffer
                })
            
                for (buffer of buffers) {
                    let image = await sharp(buffer)
                        .resize(600, 400)
                        .png()
                        .toBuffer()
                    images.push(image)
                }
    
                recipe.images = images
            }
            
            await recipe.save()
            return res.json({
                success: true
            })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                success: false
            })
        }
    },
    async destroy(req, res) {
        try {
            const recipe = await Recipe.findByIdAndDelete(req.params.id)
            if (!recipe) return res.status(404).json({
                message: 'Recipe not found',
                success: false
            })
            res.json({ recipe, success: true })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                success: false
            })
        }
    },
    async index(req, res) {
        try {
            const recipes = await Recipe.find({})
            return res.json({ recipes })
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                success: false
            })
        }
    },
    async like(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id)
            if (!recipe) return res.status(404).json({
                message: 'Recipe not found',
                success: false
            })
            recipe.likes++
            await recipe.save()
            res.json({ recipe, success: true })
        } catch(e) {
            return res.status(500).json({
                message: e.message,
                success: false
            })
        }
    }
}