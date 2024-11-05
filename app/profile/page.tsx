'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { IO, mIOToken } from '@ar.io/sdk'
import Arweave from 'arweave'

const io = IO.init()
const arweave = Arweave.init({
    host: 'ar-io.net',
    port: 443,
    protocol: 'https'
})

export default function ProfilePage() {
    const [isWalletConnected, setIsWalletConnected] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')
    const [additionalLinks, setAdditionalLinks] = useState<string[]>([])
    const [profile, setProfile] = useState<any>(null)

    const connectWallet = async () => {
        // This is a placeholder for actual wallet connection logic
        // You would typically use a library like ethers.js or web3.js here
        setIsWalletConnected(true)
        // setWalletAddress('0x1234...5678') // Example wallet address

        try {
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION'])
            const address = await window.arweaveWallet.getActiveAddress()
            setWalletAddress(address)
            // await fetchWalletDetails(address)
        } catch (error) {
            console.error('Failed to connect wallet:', error)
        }
    }

    const addMoreLink = () => {
        setAdditionalLinks([...additionalLinks, ''])
    }

    const updateAdditionalLink = (index: number, value: string) => {
        const updatedLinks = [...additionalLinks]
        updatedLinks[index] = value
        setAdditionalLinks(updatedLinks)
    }

    const createProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const profileData = {
            walletAddress,
            username: formData.get('username'),
            protocolLandId: formData.get('protocolId'),
            githubId: formData.get('githubId'),
            twitterId: formData.get('twitterId'),
            linkedinId: formData.get('linkedinId'),
            additionalLinks: additionalLinks.filter(link => link !== ''),
        }
        setProfile(profileData)
        console.log('Profile created:', profileData)
    }

    return (
        <main className=' bg-gray-50'>
            <div className="container mx-auto p-40">
                <h1 className="text-2xl font-bold mb-4">Profile Page</h1>

                {profile ? (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>Wallet Address:</strong> {profile.walletAddress}</p>
                            <p><strong>Username:</strong> {profile.username}</p>
                            <p><strong>Protocol.Land ID:</strong> {profile.protocolLandId}</p>
                            {profile.githubId && <p><strong>GitHub ID:</strong> {profile.githubId}</p>}
                            {profile.twitterId && <p><strong>Twitter ID:</strong> {profile.twitterId}</p>}
                            {profile.linkedinId && <p><strong>LinkedIn ID:</strong> {profile.linkedinId}</p>}
                            {profile.additionalLinks.length > 0 && (
                                <>
                                    <strong>Additional Links:</strong>
                                    <ul className="list-disc pl-5">
                                        {profile.additionalLinks.map((link, index) => (
                                            <li key={index}>{link}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ) : null}

                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Create Profile</CardTitle>
                    </CardHeader>
                    <form onSubmit={createProfile}>
                        <CardContent className="space-y-4">
                            {isWalletConnected ? (
                                <div className="p-2 bg-gray-100 rounded">
                                    <Label>Wallet Address</Label>
                                    <p className="font-mono">{walletAddress}</p>
                                </div>
                            ) : (
                                <Button type="button" onClick={connectWallet} className="w-full">Connect Wallet</Button>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="username" className='flex'><strong>Username </strong><p className='text-red-700'>*</p></Label>
                                <Input id="username" name="username" placeholder="Enter your username" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="protocolId">Protocol.Land ID (Required)</Label>
                                <Input id="protocolId" name="protocolId" placeholder="Enter your Protocol.Land ID" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="githubId">Github ID (Optional)</Label>
                                <Input id="githubId" name="githubId" placeholder="Enter your Github ID" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="twitterId">Twitter ID (Optional)</Label>
                                <Input id="twitterId" name="twitterId" placeholder="Enter your Twitter ID" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedinId">LinkedIn ID (Optional)</Label>
                                <Input id="linkedinId" name="linkedinId" placeholder="Enter your LinkedIn ID" />
                            </div>

                            {additionalLinks.map((link, index) => (
                                <div key={index} className="space-y-2">
                                    <Label htmlFor={`additionalLink${index}`}>Additional Link</Label>
                                    <Input
                                        id={`additionalLink${index}`}
                                        value={link}
                                        onChange={(e) => updateAdditionalLink(index, e.target.value)}
                                        placeholder="Enter additional link"
                                    />
                                </div>
                            ))}

                            <Button type="button" onClick={addMoreLink} variant="outline" className="w-full">
                                Add More
                            </Button>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Create Profile</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main >
    )
}