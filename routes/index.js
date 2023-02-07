const express = require('express')
const router = express.Router()
const UrlInfo = require('../models/UrlInfo')

router.get('/', async (req, res) => {
   
    try{
        const allUrl = await UrlInfo.find()
        res.render('', {
            allUrl : allUrl
        })
    }
    catch(ex){
        res.status(400).json({ errorMessage : ex})
    }
})

router.post('/', async (req, res) => {

    const newUrl = new UrlInfo({
        Url : req.body.url,
        ShortUrl : req.body.shortUrl
    })

    try{
        await newUrl.save()
        res.redirect('/index')
    }
    catch (ex){
        res.status(400).json({errorMessage : ex})
    }
})

router.put('/:url', async (req, res) => {
    try{
        const url = await UrlInfo.findOne({ShortUrl : req.params.url})

        if(url !== null){
            url.Clicks++ 
            await url.save()

            res.redirect(`https://${url.Url}`)
        }
        else{
            res.status(404).json({status : "Not found"})
        }
    }
    catch(ex){
        res.status(400).json({errorMessage : ex})
    } 
})

module.exports = router
