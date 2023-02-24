import web3 from "./Web3";

import FundraiseFactory from './build/FunraiseFactory.json'

const instance  = new web3.eth.Contract(
    FundraiseFactory.abi,
    '0xe20fE4d3fCA87c2956D7e51084C471E90BF0CDa7'
)
 

export default instance ; 