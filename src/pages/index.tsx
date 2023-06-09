import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [address, setAddress] = useState('');
  const handleChange = (event: any) => {
    setAddress(event.target.value);
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <p className=" font-mono md:text-9xl text-4xl">PixelVault</p>
      <p className=" font-serif md:text-6xl text-2xl">Bio Link</p>
      
      <p className=" font-serif mt-12 font-medium">Put in your address below and get your link</p>


      <div className="mt-8">   
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative ">
            <input type="search" id="search" className="block w-[30rem] p-4 pl-1  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wallet address" required 
            value={address}
            onChange={handleChange}
            />
            <Link href={`/bio/${address}`}>
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Grab Bio
              </button>
            </Link>
        </div>
      </div>
    </div>

  )
}
