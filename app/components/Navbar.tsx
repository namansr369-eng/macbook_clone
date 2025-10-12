import Image from 'next/image'
import React from 'react'
import { navLinks } from '@/constants'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header>
        <nav>
            <Image src="/logo.svg" alt='Apple logo' width={30} height={30} />
            <ul>
                {navLinks.map(({label}) => (
                    <li key= {label}>
                        <Link href = {label}>{label}</Link>
                    </li>
                ))}
            </ul>
            <div className='flex-center gap-3'>
                <button type='button' title="Search">
                    <Image src="/search.svg" alt='Search' width={30} height={30} />
                </button>
                <button type='button' title="Cart">
                    <Image src="/cart.svg" alt='Cart'  width={30} height={30} />
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar