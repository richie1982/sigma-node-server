// const https = require('https')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const url = "https://api-v2.intrinio.com/companies/AAPL?api_key="
const key = process.env.INTRINIO_KEY

exports.getData = () => {
    axios.get(url + key)
        .then(resp => console.log(resp.data))
        .catch(error => console.log(error))
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
