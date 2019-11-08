const router = require('express').Router()
const api = require('../services/api')

router.get('/news', (req, res) => {
    api.getNewsFeed()
        .then(chunk => res.json(chunk.data.news))
        .catch(error => res.status(400).json(error))
})

router.get('/companies', (req, res) => {
    api.getAllCompanies()
        .then(chunk => res.json(chunk.data.companies))
        .catch(error => res.status(400).json(error))
})

router.get('/companies/:ticker', (req, res) => {
    api.getIntraDayData(req.params.ticker)
        .then(chunk => res.json(chunk.data.intraday_prices))
        .catch(error => res.status(400).json(error))
})

router.get('/forex', (req, res) => {
    api.getFxPairs()
        .then(chunk => res.json(chunk.data.pairs))
        .catch(error => res.status(400).json(error))
})

router.get('/forex/:pair', (req, res) => {
    api.getFxRates(req.params.pair)
        .then(chunk => res.json(chunk.data.prices))
        .catch(error => res.status(400).json(error))
})

module.exports = router