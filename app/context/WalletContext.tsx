'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { IO } from '@ar.io/sdk'
import Arweave from 'arweave'

interface WalletContextType {
    isWalletConnected: boolean
    walletAddress: string
    connectWallet: () => Promise<void>
    io: any
    arweave: Arweave
}

// Initialize Arweave and IO outside the component
const arweave = Arweave.init({
    host: 'ar-io.net',
    port: 443,
    protocol: 'https'
})

const io = IO.init()

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
    const [isWalletConnected, setIsWalletConnected] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')

    // Check for existing wallet connection on mount
    useEffect(() => {
        const checkWalletConnection = async () => {
            try {
                const address = await window.arweaveWallet.getActiveAddress()
                if (address) {
                    setWalletAddress(address)
                    setIsWalletConnected(true)
                }
            } catch (error) {
                console.log('No wallet connected')
            }
        }

        checkWalletConnection()
    }, [])

    const connectWallet = async () => {
        try {
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION'])
            const address = await window.arweaveWallet.getActiveAddress()
            setWalletAddress(address)
            setIsWalletConnected(true)
        } catch (error) {
            console.error('Failed to connect wallet:', error)
        }
    }

    return (
        <WalletContext.Provider
            value={{
                isWalletConnected,
                walletAddress,
                connectWallet,
                io,
                arweave
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    const context = useContext(WalletContext)
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider')
    }
    return context
}