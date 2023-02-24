import {ArcanaAppAddress} from '../helper/constants.js' ;

import { AuthProvider } from '@arcana/auth'
import { ethers } from 'ethers'

const auth = new AuthProvider(`${ArcanaAppAddress}`)

window.onload = async () => {
  try {
    // await auth.init()

    const arcanaProvider = await auth.loginWithSocial('google')
    const provider = new ethers.providers.Web3Provider(arcanaProvider)

    await provider.getBlockNumber()
    // 14983200
  } catch (e) {
    // log error
    console.log("error from arcana connection, " ,e);
  }
}
