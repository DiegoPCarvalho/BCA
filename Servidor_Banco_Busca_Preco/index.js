const app = require('express')()
const cors = require('cors')
const port = 443
const bancoPreco = require('./banco.json')
const axios = require('axios')

const loja = '584';
const ean = '7892840823146';
const url = `https://product-service.prod-hydra.azr.internal.americanas.io/search/price/prost?
loja=${loja}&ean=${ean}`;

app.use(cors())

app.get("/search/price/prost", (req, res) => {

    const loja = req.query.loja
    const ean = req.query.ean

    const dado = bancoPreco.filter(resp => resp.loja === loja)
    const descricaopreco = dado.filter(resp => resp.loja === loja && resp.ean === ean)


    if (dado.length === 0) {
        res.json(erros(1, loja, ean))
    } else if (descricaopreco.length === 0) {
        res.json(erros(0, loja, ean))
    } else {
        res.json(descricaopreco)
    }
})


app.get("/prost", (req, res) => {

    const loja = req.query.loja
    const ean = req.query.ean

    const dado = bancoPreco.filter(resp => resp.loja === loja)
    const descricaopreco = dado.filter(resp => resp.loja === loja && resp.ean === ean)


    if (dado.length === 0) {
        res.json(erros(1, loja, ean))
    } else if (descricaopreco.length === 0) {
        res.json(erros(0, loja, ean))
    } else {
        res.json(descricaopreco)
    }
})


app.get('/', async (req, res) => {
    res.send('ola mundo')
})

app.listen(port, () => {
    console.log("Servidor online")
})



function erros(status, loja, ean) {
    const resp = [
        {
            httpStatusCode: 404,
            errorCode: "404 NOT_FOUND",
            message: status === 1 ? `A Loja ${loja} não foi encontrada` : `O Código EAN: ${ean} da Loja: ${loja} não foi encontrado`,
        }
    ]

    return resp
}
