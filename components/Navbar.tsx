import { link } from "fs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center max-container padding-container z-30 py-2 me-14 px-8 text-black font-mono bg-white bg-opacity-95 fixed top-0 w-full">
            <Link href="/" className="h-full py-1.5">
                <Image src="/LinkAr.png" alt="logo" width={64} height={24} />
            </Link >
            <ul className="cursor-pointer py-2 px-2 items-center flex gap-12 h-full">

                <Link className="regular-16 cursor-pointer justify-center items-center transition-all hover:font-bold" href="/">
                    Home
                </Link>
                <Link className="regular-16 cursor-pointer transition-all hover:font-bold" href="/explore">
                    Explore
                </Link>
                <Link className="regular-16 cursor-pointer transition-all hover:font-bold" href="/profile">
                    Profile
                </Link>
                <Button variant='default' className="bg-pink-800 flex pb-2 justify-evenly rounded-full">Connect Wallet</Button>
            </ul>
        </nav >
    )
}

export default Navbar