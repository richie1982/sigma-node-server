// const https = require('https')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const baseUrl = "https://api-v2.intrinio.com"
const apiKey = `api_key=${process.env.INTRINIO_KEY}`

//Url Suffix
const companiesUrl = baseUrl + "/companies"
const securitiesUrl = baseUrl + "/securities"
const forexPairsUrl = baseUrl + "/forex/pairs"
const forexUrl = baseUrl + "/forex/prices"
const newsUrl = "https://api-v2.intrinio.com/companies/news?page_size=20&"
// const newsUrl = "news"

// "https://api-v2.intrinio.com/securities/AAPL/prices/intraday"



exports.getAllCompanies = () => {
    return axios.get(companiesUrl + `?${apiKey}`)
}

exports.getIntraDayData = (ticker) => {
    return axios.get(securitiesUrl + `/${ticker}/prices/intraday?${apiKey}`)
} 

exports.getFxPairs = () => {
    return axios.get(forexPairsUrl + `?${apiKey}`)
}

exports.getFxRates = (pair) => {
    return axios.get(forexUrl + `/${pair}/D1?${apiKey}`)
}

exports.getNewsFeed = () => {
    return axios.get(newsUrl + apiKey)
}

// exports.fetchData = () => {
//     const request = https.request({ 
//         method: "GET", 
//         host: "api-v2.intrinio.com", 
//         path: `/companies/AAPL?api_key=${key}`
//      }, (resp) => { 
//             let body = ""; 
//             resp.on('data', (data) => { body += data; }); 
//             resp.on('end', () => { 
//                 const company = JSON.parse(body); 
//                 console.log(company); 
//         }); 
//     }); 
//     request.end();
// }
