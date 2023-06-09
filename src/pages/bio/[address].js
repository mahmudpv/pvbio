import { useRouter } from 'next/router';
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })
const config = {
    apiKey: "LSTAMEN1yp34wjYd3HraatfKz4GGkNZv",
    network: Network.ETH_MAINNET,
  };
const alchemy = new Alchemy(config);

export default function BioPage() {
  const router = useRouter();
  const { address } = router.query;
  const [total, setTotal] = useState(0)
  const [image, setImage] = useState('')
  const [totals, setTotals] = useState({});
  const [dotsNftData, setDotsNftData] = useState([]);
  const [planetsNftData, setPlanetsNftData] = useState([]);
  const [foundersNftData, setFoundersNftData] = useState([]);
  const [punksNftData, setPunksNftData] = useState([])

  const formatAddress = (address) => {
    return address?.slice(0, 7).concat('...').concat(address.slice(-6))
  }

  const contractNames = {
    '0xd07597b64b4878add0965bb1727247ced90c6ce8': 'Dots',
    '0x7deb7bce4d360ebe68278dee6054b882aa62d19c': 'Planets',
    '0xd0a07a76746707f6d6d36d9d5897b14a8e9ed493': 'Founders',
    '0x0BebAD1fF25c623DFF9605daD4a8F782d5DA37dF': 'Punks'
    // Add other contract addresses here...
  };

 const idAsString = address ? address.toString() : '';

 useEffect(() => {
    const fetchNFTs = async () => {
      // Fetch the NFT data for each contract address...
      const dotsNfts = await alchemy.nft.getNftsForOwner(address.toString(), {
        contractAddresses: ['0xd07597b64b4878add0965bb1727247ced90c6ce8'],
      });
  
      const planetsNfts = await alchemy.nft.getNftsForOwner(address.toString(), {
        contractAddresses: ['0x7deb7bce4d360ebe68278dee6054b882aa62d19c'],
      });
  
      const foundersNfts = await alchemy.nft.getNftsForOwner(address.toString(), {
        contractAddresses: ['0xd0a07a76746707f6d6d36d9d5897b14a8e9ed493'],
      });

      const punksNfts = await alchemy.nft.getNftsForOwner(address.toString(), {
        contractAddresses: ['0x0BebAD1fF25c623DFF9605daD4a8F782d5DA37dF', '0x128675d4fddbc4a0d3f8aa777d8ee0fb8b427c2f', '0xb716600ed99b4710152582a124c697a7fe78adbf', '0x54439d4908a3e19356f876aa6022d67d0b3b12d6' ],
      });

      const nftList = foundersNfts["ownedNfts"];
      // console.log(19, nftList)
      const nftList2 = planetsNfts["ownedNfts"];
      // console.log(20, nftList2)
      const nftList3 = dotsNfts['ownedNfts']
      // console.log(21, nftList3[0])
      const nftList4 = punksNfts['ownedNfts']
      // console.log(22, nftList4)


      // Function to extract titles and images from owned NFTs
    const extractTitlesAndImages = (nfts) => {
      const titlesAndImages = nfts.ownedNfts.map((nft) => ({
        title: nft.title,
        tokenId: nft.tokenId,
        image: nft.contract.openSea.imageUrl,
      }));
      return titlesAndImages;
    };

    const extractTitlesAndImages2 = (nfts) => {
      const titlesAndImages = nfts.ownedNfts.map((nft) => ({
        title: nft.title,
        tokenId: nft.tokenId,
        image: nft.media[0].gateway,
      }));
      return titlesAndImages;
    };

    const extractTitlesAndImages3 = (nfts) => {
      const titlesAndImages = nfts.ownedNfts.map((nft) => ({
        title: nft.title,
        tokenId: nft.tokenId,
        image: nft.rawMetadata.image,
      }));
      return titlesAndImages;
    };
  
      // Extract titles and images for each NFT
      const dotsNftData = extractTitlesAndImages3(dotsNfts);
      const planetsNftData = extractTitlesAndImages2(planetsNfts);
      const foundersNftData = extractTitlesAndImages(foundersNfts);
      const punksNftData = extractTitlesAndImages2(punksNfts)
      

      const total = dotsNftData.length + planetsNftData.length + foundersNftData.length + punksNftData.length

      setTotal(total)

      // Set the state with the new NFT data...
        setDotsNftData(dotsNftData);
        setPlanetsNftData(planetsNftData);
        setFoundersNftData(foundersNftData);
        setPunksNftData(punksNftData)
  
      // Create an object with contract addresses as keys and total counts as values...
      const totals = {
        '0xd07597b64b4878add0965bb1727247ced90c6ce8': dotsNfts.totalCount,
        '0x7deb7bce4d360ebe68278dee6054b882aa62d19c': planetsNfts.totalCount,
        '0xd0a07a76746707f6d6d36d9d5897b14a8e9ed493': foundersNfts.totalCount,
        '0x0BebAD1fF25c623DFF9605daD4a8F782d5DA37dF': punksNfts.totalCount
      };
  
      // Set the state with the new NFT data...
      setTotals(totals);
    };
  
    // Call the function...
    if(address){
        fetchNFTs();
    }

  }, [address]);
  


  return (
    <div className={`${inter.className} flex h-screen`}>
        <div className="w-1/2 bg-white h-screen p-14">
            <Image className="rounded-full" width={184} height={184} alt="image description" src={image ? image : '/avatr.png'} />
            <p className="text-4xl font-bold my-4">{formatAddress(address)}</p>
            <p className=" font-serif text-2xl">Total No of PV NFTS: {total}</p>

           <div className='flex gap-x-4 mt-6'>
           {Object.keys(totals).map((contractAddress) => (
              <div key={contractAddress} className='flex flex-row rounded-md text-black bg-green-300 gap-x-1 px-1.5 py-1.5 text-sm '>
                  <p className="">{contractNames[contractAddress]}:</p>
                  <p className="">{totals[contractAddress]}</p>
              </div>
            ))}
           </div>
        </div>
        <div className="w-1/2 overflow-y-auto p-5">
            <div className="h-screen my-5 ">

                    {/* DOTS */}
                  <div className='flex justify-between'>
                    <p className='text-2xl font-bold'>Inhabitants - DOTs: {dotsNftData.length}</p>
                    <button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                    <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                    Follow @inhabitants_
                  </button>
                  </div>

                  {
                    dotsNftData.length > 0 ?
                    <div className="container mx-auto px-5 py-2 lg:px-1 lg:pt-4">
                    <div className=" flex flex-wrap ">
                      <div className="flex w-1/2 flex-wrap">
                        <div className="w-1/2 p-1 md:p-2">
                          {
                            dotsNftData[0] &&
                            <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={dotsNftData[0]?.image} />
                          }
                          
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                        {
                            dotsNftData[1] &&
                            <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={dotsNftData[1]?.image} />
                          }
                        </div>
                        <div className="w-full p-1 md:p-2">
                        {
                            dotsNftData[2] &&
                            <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={dotsNftData[2]?.image} />
                          }
                        </div>
                      </div>
                      <div className="flex w-1/2 flex-wrap">
                        <div className="w-full p-1 md:p-2">
                        {
                            dotsNftData[3] &&
                            <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={dotsNftData[3]?.image} />
                          }
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                        {
                            dotsNftData[4] &&
                            <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={dotsNftData[4]?.image} />
                          }
                        </div>
                        <div className="w-1/2 p-1 md:p-2">
                        {
                            dotsNftData[5] &&
                            <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src={dotsNftData[5]?.image} />
                          }
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4  grid-cols-2 md:grid-cols-4 mt-4">
                    <div>
                        { dotsNftData[6] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[6]?.image} alt="" />
                        }
                    </div>
                    <div>
                    { dotsNftData[7] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[7]?.image} alt="" />
                        }
                    </div>
                      <div>
                      { dotsNftData[8] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[8]?.image} alt="" />
                        }
                      </div>
                      <div>
                      { dotsNftData[9] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[9]?.image} alt="" />
                        }
                      </div>
                  </div>
                  <div className="grid gap-4  grid-cols-2 md:grid-cols-4 mt-4">
                      <div>
                      { dotsNftData[10] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[10]?.image} alt="" />
                        }
                      </div>
                      <div>
                      { dotsNftData[11] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[11]?.image} alt="" />
                        }
                      </div>
                      <div>
                      { dotsNftData[12] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[12]?.image} alt="" />
                        }
                      </div>
                      <div>
                      { dotsNftData[13] && 
                        <img className="h-auto max-w-full rounded-lg" src={dotsNftData[13]?.image} alt="" />
                        }
                      </div>
                  </div>
                  </div> : null
                  }
                    
                  {/* Planets */}
                  
                   <div className='flex justify-between mt-10 mb-3'>
                    <p className='text-2xl font-bold'>Inhabitants - United Planets: {planetsNftData.length}</p>
                    <button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4
                     focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex 
                     items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                      <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                      Follow @inhabitants_
                  </button>
                  </div>
                  {
                    planetsNftData.length > 0 ? 
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-2">
                  {planetsNftData.map((nft, index) => (
                      <div className="relative" key={index}>
                          <video width="200" height="200" muted  className='rounded-md'>
                            <source src={nft.image} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute bottom-3 mx-5 font-semibold text-center text-[10px] text-gray-800 bg-white px-2 py-1 rounded-md">{nft.title} #{nft.tokenId}</div>
                      </div>
                    ))}
                    </div>
                    : null
                  }
  
                  {/* Founders DAO */}

                  <div className='flex justify-between mt-10 mb-3'>
                    <p className='text-2xl font-bold'>Founder&apos;s DAO: {foundersNftData.length}</p>
                    <button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50
                     font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                    <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                    Follow @pixelvault_
                  </button>
                  </div>
                  
                  {
                    foundersNftData.length > 0 ? 
                      <div className="grid grid-cols-2 gap-x-1 gap-y-2">
                  {foundersNftData.map((nft, index) => (
                    <div className='relative' key={index}>
                        <h2 className='absolute mx-4 top-3 font-semibold text-center text-md text-gray-800 bg-white px-2 py-1 rounded-md'>#{nft.tokenId}</h2>
                        <img src={nft.image} alt={nft.title} width="400" height="400" className='rounded-xl'/>
                    </div>
                    ))}
                  </div>
                    
                    : null
                  }
                

                <div className='flex justify-between mt-10 mb-3'>
                    <p className='text-2xl font-bold'>PUNKS Comics: {punksNftData.length}</p>
                    <button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50
                     font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                    <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
                    Follow @punkscomic
                  </button>
                </div>

                {
                  punksNftData.length > 0 ?
                  <div class="grid gap-4 pb-20">
                      <div className=''>
                          <img class="h-auto max-w-full rounded-lg" src={punksNftData[0].image} alt="" />
                      </div>
                      <div class="grid grid-cols-5 gap-4">
                        {punksNftData.map((nft, index) => (
                        <div className='relative' key={index}>
                            <h2 className='absolute mx-4 top-3 font-semibold text-center text-md text-gray-800 bg-white px-2 py-1 rounded-md'>#{nft.tokenId}</h2>
                            <img src={nft.image} alt={nft.title} width="400" height="400" className='h-[251px] max-w-full rounded-lg'/>
                        </div>
                        ))}

                      </div>
                  </div>




                  : null
                }

                
                  


            </div>
            <div className="h-screen mt-20 ">

            </div>
        </div>
    </div>
  )
}
