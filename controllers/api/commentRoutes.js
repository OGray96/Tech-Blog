const router = require('express').Router();
const { Post, User, Comment } = require('../../models/index');

router.get('/', async (req,res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (error) {
        
    }
})

router.post('/new', async (req,res) => {
    try {
        const commentData = await Comment.create({
            comment: req.body.comment,
            date: req.body.date,
            post_id: req.body.post_id
        });
        res.status(200).json(commentData)
    } catch (error) {
        res.status(400).json(error);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;