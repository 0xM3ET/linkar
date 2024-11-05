'use client'
import { useEffect, useState } from 'react'
import { Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { IO } from '@ar.io/sdk'
import Arweave from 'arweave'

const io = IO.init()
const arweave = Arweave.init({
    host: 'ar-io.net',
    port: 443,
    protocol: 'https'
})

const Navbar = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')

    useEffect(() => {
        checkWalletConnection()
    }, [])

    const checkWalletConnection = async () => {
        try {
            const permissions = await window.arweaveWallet.getPermissions()
            if (permissions.includes('ACCESS_ADDRESS')) {
                const address = await window.arweaveWallet.getActiveAddress()
                setWalletAddress(address)
                setIsWalletConnected(true)
            }
        } catch (error) {
            console.error('Wallet not connected:', error)
            setIsWalletConnected(false)
            setWalletAddress('')
        }
    }

    const connectWallet = async () => {
        try {
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION'])
            await checkWalletConnection()
        } catch (error) {
            console.error('Failed to connect wallet:', error)
        }
    }

    return (
        <nav className="flex justify-between items-center max-container padding-container z-30 py-2 me-14 px-8 text-black font-mono bg-white bg-opacity-95 fixed top-0 w-full">
            <Link href="/" className="h-full py-1.5">
                <Image src="/LinkAR_Logo1.png" alt="logo" width={80} height={32} />
            </Link>
            <ul className="cursor-pointer py-2 px-2 items-center flex gap-12 h-full">
                <Link className="regular-16 cursor-pointer justify-center items-center transition-all hover:font-bold" href="/">
                    Home
                </Link>
                <Link className="regular-16 cursor-pointer transition-all hover:font-bold" href="/explore">
                    Explore
                </Link>
                <Link href="/profile" className="regular-16 cursor-pointer transition-all hover:font-bold">
                    Profile
                </Link>
                {isWalletConnected ? (
                    <div className="text-sm font-medium truncate max-w-[200px]">
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </div>
                ) : (
                    <Button size="lg" onClick={connectWallet}>
                        <Wallet className="mr-2 h-5 w-5" />
                        Connect Wallet
                    </Button>
                )}
            </ul>
        </nav>
    )
}

export default Navbar