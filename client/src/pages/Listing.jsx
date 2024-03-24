import React, { useState, useEffect } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Footer from '../components/Footer';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [slideNumber, setSlideNumber] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? listing.imageUrls.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === listing.imageUrls.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div className='bg-cover bg-center h-[410px] sm:h-[500px] '>
    <main className="p-3 mt-1 ">
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
         <div>
          <div>
         <div className="relative ">
           <div className="flex items-center h-[350px] sm:h-[550px] w-full mx-auto sm:w-[70%] ">
             <FontAwesomeIcon
               icon={faCircleArrowLeft}
               onClick={() => handleMove("l")}
               className="text-3xl sm:text-5xl text-gray-200 sm:text-gray-600 cursor-pointer absolute left-1 sm:left-[231px] z-20"
             />
             {listing.imageUrls && (
               <img
                 src={listing.imageUrls[slideNumber]}
                 alt=""
                 className="w-full h-full object-cover rounded-md"
               />
             )}
             <FontAwesomeIcon
               icon={faCircleArrowRight}
               onClick={() => handleMove("r")}
               className="text-3xl sm:text-5xl text-gray-200 sm:text-gray-600 cursor-pointer absolute right-1 sm:right-[231px] z-20"
             />
           </div>
           <div className="absolute right-1 sm:right-[231px] top-1.5 z-10 border rounded-full w-8 sm:w-12 h-8 sm:h-12 flex justify-center items-center bg-gray-200 cursor-pointer">
             <FaShare
               className="text-gray-600"
               onClick={() => {
                 navigator.clipboard.writeText(window.location.href);
                 setCopied(true);
                 setTimeout(() => {
                   setCopied(false);
                 }, 2000);
               }}
             />
           </div>
         </div>
         {copied && (
           <p className='fixed top-[110px] sm:top-[16%] right-3 sm:right-[8%] z-10 rounded-md bg-gray-700 text-gray-200 p-2'>
             Link copied!
           </p>
         )}
       </div>
     

        
         
          <div className='max-w-[66rem] mx-auto p-3 my-7 space-y-4 bg-gray-100 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-gray-800'>
  <span className='text-2xl text-red-600'> ₹{listing.offer ? (+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
  {listing.type === 'rent' && ' /month'}</span>
</h2>
<span className='text-xl '>{listing.name}</span>
  <p className='flex items-center gap-2 text-gray-600 text-sm'>
    <FaMapMarkerAlt className='text-green-700' />
    {listing.address}
  </p>
  <div className='flex gap-4'>
    <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
    </p>
    {listing.offer && (
      <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
        <b>₹</b>{listing.discountPrice} OFF
      </p>
    )}
  </div>
  <p className='text-gray-700'>
    <span className='font-semibold text-black'>Description - </span>
    {listing.description}
  </p>
  <ul className='text-gray-800 font-semibold text-sm flex flex-wrap gap-4 sm:gap-6'>
    <li className='flex items-center gap-1 whitespace-nowrap '>
      <FaBed className='text-lg text-green-700' />
      {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
    </li>
    <li className='flex items-center gap-1 whitespace-nowrap '>
      <FaBath className='text-lg text-green-700' />
      {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
    </li>
    <li className='flex items-center gap-1 whitespace-nowrap '>
      <FaParking className='text-lg text-green-700' />
      {listing.parking ? 'Parking spot' : 'No Parking'}
    </li>
    <li className='flex items-center gap-1 whitespace-nowrap '>
      <FaChair className='text-lg text-green-700' />
      {listing.furnished ? 'Furnished' : 'Unfurnished'}
    </li>
  </ul>
  {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 w-full text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
</div>

        </div>
      )}
    </main>
    <Footer/>
    </div>
  );
}