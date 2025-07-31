const axios = require("axios")


const loja = '584';
const ean = '7892840823146';
const url = `https://product-service.prod-hydra.azr.internal.americanas.io/search/price/prost?
loja=${loja}&ean=${ean}`;

async function buscar(){
    const data = await axios(url).then(resp => console.log(resp.data))

    return data
}

buscar()

