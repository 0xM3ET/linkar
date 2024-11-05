import React from 'react'

import { useState, useEffect } from 'react'

import { IO, mIOToken } from '@ar.io/sdk'
import Arweave from 'arweave'

const io = IO.init()
const arweave = Arweave.init({
    host: 'ar-io.net',
    port: 443,
    protocol: 'https'
})



const walletButton = () => {

    const [isWalletConnected, setIsWalletConnected] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')

    const connectWallet = async () => {
        try {
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION'])
            const address = await window.arweaveWallet.getActiveAddress()
            setWalletAddress(address)
            setIsWalletConnected(true)
            // await fetchWalletDetails(address)
        } catch (error) {
            console.error('Failed to connect wallet:', error)
        }
    }
}

export default walletButton