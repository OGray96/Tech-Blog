const router = require('express').Router();
const {Post, Comment, User} = require('../../models/index');

router.post('/new', async(req,res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            textContent: req.body.textContent,
            date: req.body.date,
            user_id: req.session.user_id
        });
        res.status(200).json(postData)
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include:[
                {
                    model: Comment

                },
                {
                    model:User,
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(postData);
  
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/:id', async (req,res) => {
    try {
        const postData = await Post.findOne({
            where: {id:req.params.id},
            include:[
                {
                  model: Comment,
                },
                {
                  model: User,
                }

            ]
        })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Cannot found post by this id!' })
            }
            res.status(200).json(data)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                textContent: req.body.textContent
            },
            {
                where:{id:req.params.id}
            }
        )
        .then(data => {
            res.status(200).json({data: 'ok'})
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const postData = await Post.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;