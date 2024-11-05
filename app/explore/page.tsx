import { Github, Twitter, Linkedin, Globe, Instagram, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CardTemplate = ({ profile, theme }) => {
    const themes = {
        default: "bg-white dark:bg-gray-800",
        purple: "bg-purple-100 dark:bg-purple-900",
        green: "bg-green-100 dark:bg-green-900",
        blue: "bg-blue-100 dark:bg-blue-900",
    }

    return (
        <Card className={`${themes[theme]} overflow-hidden transition-all duration-300 hover:shadow-xl group`}>
            <div className="relative h-48">
                <img
                    src={profile.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
                <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-none">
                        AR Score: {profile.arScore}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold mr-4">
                        {profile.initials}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.role}</p>
                    </div>
                </div>
                <p className="text-sm mb-4 line-clamp-3">{profile.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {profile.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(profile.social).map(([platform, link]) => (
                        <Button key={platform} size="sm" variant="outline" className="h-8" asChild>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {platform === 'twitter' && <Twitter className="h-4 w-4 mr-2" />}
                                {platform === 'github' && <Github className="h-4 w-4 mr-2" />}
                                {platform === 'linkedin' && <Linkedin className="h-4 w-4 mr-2" />}
                                {platform === 'website' && <Globe className="h-4 w-4 mr-2" />}
                                {platform === 'instagram' && <Instagram className="h-4 w-4 mr-2" />}
                                {platform}
                            </a>
                        </Button>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex justify-between">
                <Button size="sm" variant="default">
                    View Profile
                </Button>
                <Button size="icon" variant="ghost">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share profile</span>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function Component() {
    const profiles = [
        {
            name: "Farhat Kadiwala",
            role: "Designer",
            arScore: 82,
            initials: "FK",
            tags: ["Blockchain", "UX Design"],
            bio: "UX designer with a focus on creating intuitive blockchain experiences. Passionate about making complex systems accessible to everyone.",
            image: "/cover1.jpg",
            social: {
                twitter: "#",
                github: "#",
                linkedin: "#",
                website: "#",
                instagram: "#"
            }
        },
        {
            name: "Sarthak Shah",
            role: "Full-stack Developer",
            arScore: 88,
            initials: "SS",
            tags: ["Web3", "DeFi"],
            bio: "Full-stack developer passionate about Web3 and decentralized systems. Building the future of finance one line of code at a time.",
            image: "/cover2.jpg",
            social: {
                github: "#",
                linkedin: "#",
                website: "#"
            }
        },
        {
            name: "Manav Gadhiya",
            role: "Blockchain Researcher",
            arScore: 75,
            initials: "MG",
            tags: ["Cryptography", "Consensus Algorithms"],
            bio: "Blockchain researcher specializing in cryptographic protocols and consensus algorithms. Committed to advancing the field of distributed systems.",
            image: "/cover3.jpg",
            social: {
                twitter: "#",
                github: "#",
                linkedin: "#"
            }
        },
        {
            name: "Haard Tripathi",
            role: "Smart Contract Developer",
            arScore: 61,
            initials: "HT",
            tags: ["Lua", "Arweave"],
            bio: "Smart contract developer with a passion for building secure and efficient decentralized applications on Ethereum and other blockchain platforms.",
            image: "/cover3.jpg",
            social: {
                github: "#",
                linkedin: "#",
                website: "#"
            }
        },
        {
            name: "Meet Pandya",
            role: "Blockchain Security Analyst",
            arScore: 63,
            initials: "MP",
            tags: ["Security", "Auditing"],
            bio: "Blockchain security analyst specializing in smart contract auditing and vulnerability assessment. Dedicated to making the blockchain ecosystem safer for everyone.",
            image: "/cover1.jpg",
            social: {
                twitter: "#",
                github: "#",
                linkedin: "#",
                website: "#"
            }
        },
        {
            name: "Ropost",
            role: "Decentralized Storage Expert",
            arScore: 89,
            initials: "RP",
            tags: ["IPFS", "Arweave", "AO"],
            bio: "Decentralized storage enthusiast working on innovative solutions using IPFS and Filecoin. Passionate about creating a more resilient and distributed web.",
            image: "/cover2.jpg",
            social: {
                twitter: '#',
                github: "#",
                linkedin: "#",
                website: "#"
            }
        }
    ]

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                Explore Ecosystem Contributers
            </h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Connect with blockchain professionals and discover innovative projects in the Arweave space
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile, index) => (
                    <CardTemplate
                        key={index}
                        profile={profile}
                        theme={['default', 'purple', 'green', 'blue'][index % 4]}
                    />
                ))}
            </div>
        </div>
    )
}