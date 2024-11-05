"use client";

import { useEffect, useState } from "react";
import { Github, Twitter, Linkedin, Wallet, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ethers } from "ethers";

// Constants
const PROVIDER = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_KEY");
const TURBO_ENDPOINT = "https://turbo.ardrive.io";

interface Profile {
    name: string;
    bio: string;
    avatar?: string;
    links: {
        title: string;
        url: string;
        icon?: string;
    }[];
    ensName?: string;
    arnsName?: string;
}

export default function ProfileComponent() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployedUrl, setDeployedUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        checkWalletConnection();
    }, []);

    const checkWalletConnection = async () => {
        try {
            if (typeof window !== 'undefined' && window.arweaveWallet) {
                const permissions = await window.arweaveWallet.getPermissions();
                if (permissions.includes('ACCESS_ADDRESS')) {
                    const address = await window.arweaveWallet.getActiveAddress();
                    setWalletAddress(address);
                    setIsConnected(true);
                    if (address.startsWith("0x")) {
                        await fetchEnsProfile(address);
                    }
                }
            }
        } catch (error) {
            console.error('Wallet connection error:', error);
            setError('Failed to connect to wallet. Please ensure ArConnect is installed.');
            setIsConnected(false);
        }
    };

    const fetchEnsProfile = async (address: string) => {
        try {
            const ensName = await PROVIDER.lookupAddress(address);
            if (ensName) {
                setProfile(prev => prev ? { ...prev, ensName } : null);
            }
        } catch (error) {
            console.error("ENS fetch error:", error);
        }
    };

    const handleConnect = async () => {
        try {
            if (typeof window !== 'undefined' && window.arweaveWallet) {
                await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
                await checkWalletConnection();
            } else {
                throw new Error('ArConnect not found');
            }
        } catch (error) {
            setError('Failed to connect wallet. Please install ArConnect extension.');
        }
    };

    const deployToArweave = async (profileData: Profile) => {
        setIsDeploying(true);
        setError('');

        try {
            const html = generateProfileHtml(profileData);
            const blob = new Blob([html], { type: 'text/html' });

            if (blob.size > 100000) {
                throw new Error('Profile content exceeds 100KB limit');
            }

            // Create form data for the file upload
            const formData = new FormData();
            formData.append('file', blob, 'index.html');

            const response = await fetch(`${TURBO_ENDPOINT}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Deployment failed');
            }

            const { id: transactionId } = await response.json();
            const deployedUrl = `https://arweave.net/${transactionId}`;
            setDeployedUrl(deployedUrl);

            await registerArnsName(transactionId, profileData.name);
        } catch (error) {
            console.error('Deployment error:', error);
            setError(error instanceof Error ? error.message : 'Deployment failed. Please try again.');
        } finally {
            setIsDeploying(false);
        }
    };

    const registerArnsName = async (transactionId: string, profileName: string) => {
        try {
            const arnsName = `${profileName.toLowerCase().replace(/[^a-z0-9]/g, '')}_linktree.ar`;

            const response = await fetch(`${TURBO_ENDPOINT}/names`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: arnsName,
                    target: transactionId
                })
            });

            if (!response.ok) {
                throw new Error('ArNS registration failed');
            }

            setProfile(prev => prev ? { ...prev, arnsName } : null);
        } catch (error) {
            console.error('ArNS registration error:', error);
            setError('Failed to register ArNS name. The profile is still deployed.');
        }
    };

    const generateProfileHtml = (profile: Profile): string => {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${profile.name}'s Links</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 min-h-screen py-12">
                <div class="max-w-2xl mx-auto px-4">
                    <div class="bg-white rounded-lg shadow-lg p-8">
                        <div class="text-center">
                            <h1 class="text-3xl font-bold mb-4">${profile.name}</h1>
                            <p class="text-gray-600 mb-8">${profile.bio}</p>
                        </div>
                        <div class="space-y-4">
                            ${profile.links.map(link => `
                                <a href="${link.url}" 
                                   class="block w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-center"
                                   target="_blank" 
                                   rel="noopener noreferrer">
                                    ${link.title}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </body>
        </html>`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newProfile: Profile = {
            name: formData.get('name') as string,
            bio: formData.get('bio') as string,
            links: [
                {
                    title: 'GitHub',
                    url: `https://github.com/${formData.get('github')}`,
                    icon: 'github'
                },
                {
                    title: 'Twitter',
                    url: `https://twitter.com/${formData.get('twitter')}`,
                    icon: 'twitter'
                },
                {
                    title: 'LinkedIn',
                    url: `https://linkedin.com/in/${formData.get('linkedin')}`,
                    icon: 'linkedin'
                },
                {
                    title: 'Website',
                    url: formData.get('website') as string,
                    icon: 'globe'
                }
            ].filter(link => link.url !== 'https://github.com/' &&
                link.url !== 'https://twitter.com/' &&
                link.url !== 'https://linkedin.com/in/')
        };

        setProfile(newProfile);
        await deployToArweave(newProfile);
    };
    if (!isConnected) {
        return (
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Welcome to ArNS Linktree</CardTitle>
                        <CardDescription>Connect your wallet to create your decentralized link page</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Button size="lg" onClick={handleConnect}>
                            <Wallet className="mr-2 h-5 w-5" />
                            Connect Arweave Wallet
                        </Button>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
                        <CardDescription>Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name*</Label>
                                    <Input id="name" name="name" placeholder="Your name" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio*</Label>
                                    <Input id="bio" name="bio" placeholder="A short bio about yourself" required />
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Social Links</h3>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="github">Github Username</Label>
                                            <Input id="github" name="github" placeholder="username" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="twitter">Twitter Username</Label>
                                            <Input id="twitter" name="twitter" placeholder="username" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="linkedin">LinkedIn Username</Label>
                                            <Input id="linkedin" name="linkedin" placeholder="username" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="website">Personal Website</Label>
                                            <Input id="website" name="website" placeholder="https://..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isDeploying}>
                                {isDeploying ? 'Deploying...' : 'Create & Deploy Profile'}
                            </Button>
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
                            {profile.arnsName && (
                                <CardDescription>
                                    <Badge variant="secondary" className="mt-2">
                                        {profile.arnsName}
                                    </Badge>
                                </CardDescription>
                            )}
                        </div>
                        {deployedUrl && (
                            <Button variant="outline" asChild>
                                <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
                                    <Globe className="mr-2 h-4 w-4" />
                                    View Live Page
                                </a>
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{profile.bio}</p>
                    <div className="flex flex-wrap gap-2">
                        {profile.links.map((link, index) => (
                            <Button key={index} variant="outline" size="sm" asChild>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.icon === 'github' && <Github className="mr-2 h-4 w-4" />}
                                    {link.icon === 'twitter' && <Twitter className="mr-2 h-4 w-4" />}
                                    {link.icon === 'linkedin' && <Linkedin className="mr-2 h-4 w-4" />}
                                    {link.icon === 'globe' && <Globe className="mr-2 h-4 w-4" />}
                                    {link.title}
                                </a>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}