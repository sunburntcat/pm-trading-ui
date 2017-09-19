import _ from 'lodash'

import { ETHEREUM_NETWORKS, WALLET_PROVIDER } from 'integrations/constants'
import { registerProvider, updateProvider } from 'actions/blockchain'
import InjectedWeb3 from 'integrations/injectedWeb3'

class Metamask extends InjectedWeb3{
  async initialize(store) {
    this.store = store
    this.store.dispatch(registerProvider({ provider: WALLET_PROVIDER.METAMASK }))

    const walletEnabled = await new Promise((resolve) => {
      /* global Web3, window */
      window.addEventListener('load', () => {
        if (typeof window.web3 !== 'undefined' && window.web3.currentProvider.constructor.name === 'MetamaskInpageProvider') {
          this.web3 = new Web3(window.web3.currentProvider)
          return resolve(true)
        }

        return resolve(false)
      })
    })

    let account
    let network

    if (walletEnabled) {
      network = await this.getNetwork()
      account = await this.getAccount()
    }
    this.store.dispatch(updateProvider({
      provider: WALLET_PROVIDER.METAMASK,
      available: walletEnabled && account,
      network,
      account,
    }))
  }

  
}

export default new Metamask()
