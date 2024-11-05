import Link from "next/link";
import Image from "next/image"
import { ArrowRight, Wallet, FileText, Calculator, Share2 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex items-center justify-center ">

      <main className="container px-28 py-16">
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl pb-2">
            LinkAr
          </h1>
          <h1 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Your Gateway to the Arweave Ecosystem
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Showcase. Connect. Grow.
          </p>
          <p className="mt-6 text-muted-foreground">
            Welcome to LinkAr, the ultimate platform to showcase your contributions to the Arweave ecosystem.
          </p>
        </section>

        <section className="my-24">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Wallet,
                title: "Connect Your Arweave Wallet",
                description:
                  "Start by securely connecting your Arweave wallet to LinkAr. This lets us gather the details of your deployed projects and activities across the Arweave ecosystem.",
              },
              {
                icon: FileText,
                title: "Create Your Arweave Portfolio",
                description:
                  "Add links to your Arweave-deployed projects, key contributions, or anything else you'd like to showcase. Your LinkAr profile will be a simple yet powerful representation of your work.",
              },
              {
                icon: Calculator,
                title: "Calculate Your Ar-Score",
                description:
                  "LinkAr analyzes your portfolio and activity to calculate an Ar-Score—a unique score that reflects your engagement and impact in the Arweave ecosystem.",
              },
              {
                icon: Share2,
                title: "Share Your Profile",
                description:
                  "Once you've created your profile, you'll have a unique, shareable link to showcase your work, contributions, and Ar-Score.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10 group-hover:ring-primary/20" />
              </div>
            ))}
          </div>
        </section>

        <section className="my-24">
          <h2 className="text-center text-3xl font-bold">Why Choose LinkAr?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Easy Portfolio Creation",
                description: "Build your Arweave portfolio in minutes, with a straightforward and user-friendly interface.",
              },
              {
                title: "Personalized Ar-Score",
                description:
                  "Your Ar-Score reflects the impact of your work and dedication to the Arweave network, helping you gain visibility.",
              },
              {
                title: "One Link to Showcase All",
                description:
                  "Share a single link with all your contributions—perfect for social media, resumes, or networking within the Arweave ecosystem.",
              },
              {
                title: "Completely Decentralized",
                description:
                  "LinkAr leverages Arweave's permanent storage to make sure your profile and data are censorship-resistant and permanently available.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10 group-hover:ring-primary/20" />
              </div>
            ))}
          </div>
        </section>

        <section className="my-24 text-center">
          <h2 className="text-3xl font-bold">Get Started with LinkAr</h2>
          <p className="mt-4 text-muted-foreground">
            Connect your Arweave wallet, start adding your projects, and let your contributions be known.
          </p>
          <Link href='/profile'>
            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-purple-700">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </section>
      </main>
    </div>
  )
}
