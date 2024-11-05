import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter, Globe, Archive, Gift } from "lucide-react"

const templates = [
    {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "Full-stack developer passionate about Web3 and decentralized systems.",
        twitter: "alexjohnson",
        github: "alexj",
        protocolLand: "alexj.protocol.land",
        arweave: "alexj.arweave.net",
        arScore: 85,
        tags: ["Full-stack Developer", "Web3"],
        layout: "standard"
    },
    {
        name: "Sarah Lee",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "UX designer with a focus on creating intuitive blockchain experiences.",
        twitter: "sarahlee_ux",
        github: "sarahlee",
        protocolLand: "sarahlee.protocol.land",
        arweave: "sarahlee.arweave.net",
        arScore: 92,
        tags: ["UX Designer", "Blockchain"],
        layout: "compact"
    },
    {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "Blockchain developer specializing in smart contracts and DeFi.",
        twitter: "mikechen_dev",
        github: "mikec",
        protocolLand: "mikec.protocol.land",
        arweave: "mikec.arweave.net",
        arScore: 78,
        tags: ["Back-end Developer", "Smart Contracts"],
        layout: "minimal"
    },
    {
        name: "Emma Watson",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "Crypto enthusiast and technical writer. Simplifying blockchain for everyone.",
        twitter: "emma_writes",
        github: "emmaw",
        protocolLand: "emmaw.protocol.land",
        arweave: "emmaw.arweave.net",
        arScore: 88,
        tags: ["Technical Writer", "Dev-Rel"],
        layout: "standard"
    },
    {
        name: "David Kim",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "NFT artist and developer. Bridging the gap between art and technology.",
        twitter: "davidkim_nft",
        github: "davidk",
        protocolLand: "davidk.protocol.land",
        arweave: "davidk.arweave.net",
        arScore: 95,
        tags: ["Front-end Developer", "NFT Artist"],
        layout: "compact"
    },
    {
        name: "Olivia Martinez",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "Cybersecurity expert focusing on blockchain and decentralized systems.",
        twitter: "olivia_sec",
        github: "oliviam",
        protocolLand: "oliviam.protocol.land",
        arweave: "oliviam.arweave.net",
        arScore: 82,
        tags: ["Cybersecurity", "Blockchain"],
        layout: "minimal"
    },
    {
        name: "Ryan Taylor",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "Decentralized storage enthusiast. Building the future of data persistence.",
        twitter: "ryan_storage",
        github: "ryant",
        protocolLand: "ryant.protocol.land",
        arweave: "ryant.arweave.net",
        arScore: 90,
        tags: ["Back-end Developer", "Decentralized Storage"],
        layout: "standard"
    },
    {
        name: "Sophia Nguyen",
        avatar: "/placeholder.svg?height=100&width=100",
        cover: "/placeholder.svg?height=200&width=400",
        bio: "Blockchain researcher and educator. Empowering the next generation of Web3 developers.",
        twitter: "sophia_edu",
        github: "sophian",
        protocolLand: "sophian.protocol.land",
        arweave: "sophian.arweave.net",
        arScore: 87,
        tags: ["Community Manager", "Educator"],
        layout: "compact"
    }
]

const TemplateCard = ({ template, index }) => {
    const layouts = {
        standard: (
            <Card className={`overflow-hidden ${index % 2 === 0 ? 'bg-primary/5' : 'bg-secondary/5'}`}>
                <CardHeader className="p-0">
                    <div className="relative h-32">
                        <img src='/cover1.jpg' alt="Cover" className="w-full h-full object-cover" />
                        <Avatar className="absolute -bottom-6 left-4 w-16 h-16 border-4 border-background">
                            <AvatarImage src={template.avatar} alt={template.name} />
                            <AvatarFallback>{template.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            AR Score: {template.arScore}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-8">
                    <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {template.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{template.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-start space-x-2">
                    <Button variant="outline" size="icon" aria-label={`Twitter profile of ${template.name}`}>
                        <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label={`GitHub profile of ${template.name}`}>
                        <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label={`Protocol Land profile of ${template.name}`}>
                        <Globe className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label={`Arweave profile of ${template.name}`}>
                        <Archive className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        ),
        compact: (
            <Card className={`overflow-hidden ${index % 2 === 0 ? 'bg-primary/5' : 'bg-secondary/5'}`}>
                <CardHeader className="p-0">
                    <div className="relative h-24">
                        <img src='/cover2.jpg' alt="Cover" className="w-full h-full object-cover" />
                        <Badge className="absolute bottom-2 right-2 bg-primary text-primary-foreground">
                            AR Score: {template.arScore}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={template.avatar} alt={template.name} />
                            <AvatarFallback>{template.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold">{template.name}</h2>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {template.tags.map((tag, i) => (
                                    <Badge key={i} variant="outline">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{template.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-center space-x-2">
                    <Button variant="ghost" size="sm" aria-label={`Twitter profile of ${template.name}`}>
                        <Twitter className="h-4 w-4 mr-2" /> Twitter
                    </Button>
                    <Button variant="ghost" size="sm" aria-label={`GitHub profile of ${template.name}`}>
                        <Github className="h-4 w-4 mr-2" /> GitHub
                    </Button>
                </CardFooter>
            </Card>
        ),
        minimal: (
            <Card className={`overflow-hidden ${index % 2 === 0 ? 'bg-primary/5' : 'bg-secondary/5'}`}>
                <CardHeader className="p-0">
                    <div className="relative h-32">
                        <img src='/cover3.jpg' alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Avatar className="w-20 h-20 border-4 border-background">
                                <AvatarImage src={template.avatar} alt={template.name} />
                                <AvatarFallback>{template.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="text-center p-4">
                    <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
                    <Badge className="mb-2 bg-primary text-primary-foreground">AR Score: {template.arScore}</Badge>
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {template.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{template.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-center space-x-2">
                    <Button variant="outline" size="icon" aria-label={`Twitter profile of ${template.name}`}>
                        <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label={`GitHub profile of ${template.name}`}>
                        <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label={`ProtocolLand profile of ${template.name}`}>
                        <Gift className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return layouts[template.layout]
}

export default function Component() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Explore Templates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template, index) => (
                    <TemplateCard key={index} template={template} index={index} />
                ))}
            </div>
        </div>
    )
}