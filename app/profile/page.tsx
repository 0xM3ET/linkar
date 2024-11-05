"use client"

import { useState } from "react"
import { Github, Twitter, Linkedin, Wallet, Plus, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Component() {
    const [hasProfile, setHasProfile] = useState(false)
    const [isConnected, setIsConnected] = useState(false)

    // Simulated profile data
    const profile = {
        name: "Sarah Lee",
        username: "slee",
        role: "UX Designer",
        arScore: 92,
        protocolId: "protocol-123",
        bio: "UX designer with a focus on creating intuitive blockchain experiences. Passionate about making complex systems accessible to everyone.",
        tags: ["Blockchain", "UX Design", "Web3"],
        social: {
            github: "github/slee",
            twitter: "@slee_design",
            linkedin: "in/sarahlee",
            website: "sarahlee.design"
        },
        achievements: [
            { name: "Early Adopter", description: "Joined in the first month" },
            { name: "Active Contributor", description: "Regular ecosystem participation" },
            { name: "Community Leader", description: "Helps guide new members" }
        ]
    }

    const handleConnect = () => {
        setIsConnected(true)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setHasProfile(true)
    }

    if (!isConnected) {
        return (
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <Card className="w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Welcome to Your Profile</CardTitle>
                        <CardDescription>Connect your wallet to get started</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center p-6">
                        <Button size="lg" onClick={handleConnect}>
                            <Wallet className="mr-2 h-5 w-5" />
                            Connect Wallet
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!hasProfile) {
        return (
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
                        <CardDescription>Fill out the information below to create your profile</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username*</Label>
                                    <Input id="username" placeholder="Enter your username" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="protocolId">Protocol Land ID*</Label>
                                    <Input id="protocolId" placeholder="Enter your Protocol Land ID" required />
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Social Links</h3>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="github">Github ID</Label>
                                            <Input id="github" placeholder="Enter your Github ID" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="twitter">Twitter ID</Label>
                                            <Input id="twitter" placeholder="Enter your Twitter ID" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="linkedin">LinkedIn ID</Label>
                                            <Input id="linkedin" placeholder="Enter your LinkedIn ID" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="website">Personal Website</Label>
                                            <Input id="website" placeholder="Enter your website URL" />
                                        </div>
                                    </div>
                                </div>
                                <Button type="button" variant="outline" className="w-full">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add More Details
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Create Profile</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
            <Card className="w-full">
                <CardHeader className="relative">
                    <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            AR Score: {profile.arScore}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-900 flex items-center justify-center text-2xl font-bold text-white">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
                            <CardDescription className="text-lg">@{profile.username}</CardDescription>
                            <div className="flex gap-2 mt-2">
                                {profile.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Tabs defaultValue="about">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="achievements">Achievements</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                        </TabsList>
                        <TabsContent value="about" className="space-y-4">
                            <div className="prose prose-sm max-w-none">
                                <p>{profile.bio}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Protocol Land ID</Label>
                                    <p className="text-sm text-muted-foreground">{profile.protocolId}</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <p className="text-sm text-muted-foreground">{profile.role}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`https://github.com/${profile.social.github}`} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        Github
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`https://twitter.com/${profile.social.twitter}`} target="_blank" rel="noopener noreferrer">
                                        <Twitter className="mr-2 h-4 w-4" />
                                        Twitter
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`https://linkedin.com/${profile.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="mr-2 h-4 w-4" />
                                        LinkedIn
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`https://${profile.social.website}`} target="_blank" rel="noopener noreferrer">
                                        <Globe className="mr-2 h-4 w-4" />
                                        Website
                                    </a>
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="achievements" className="space-y-4">
                            {profile.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Badge variant="secondary" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                                            {index + 1}
                                        </Badge>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{achievement.name}</h4>
                                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="activity">
                            <div className="p-4 text-center text-muted-foreground">
                                Activity feed coming soon...
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}