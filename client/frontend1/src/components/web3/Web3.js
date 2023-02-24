import Web3 from 'web3' ; 

let web3 ; 

if (  window !==undefined &&  window.web3 != undefined ){
    // we are in the browser and metamask is running.
    // here we are assuming that the meta mask is already installed in the browser of user!!!

    web3 = new Web3(window.web3.currentProvider) ; 
}else { 
    //we are on the server  || user is using the metamask !!
    const provider = new Web3.providers.HttpProvider(
        '8eadcee4380c4092b3a7ff8bf0adb020',
        'https://rinkeby.infura.io/v3/1085bce53d19452ba2f585abeb4f324d',
    );
    web3 = new Web3(provider) ; 
}



export default web3 ; 