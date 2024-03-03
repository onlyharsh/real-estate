import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-4 '>
 <p className="text-gray-800 font-semibold text-lg mt-[15px]">
  To inquire about <span className="text-red-500">{listing.name.toLowerCase()}</span>,
  please contact <span className="text-red-500">{landlord.username}</span>:
</p>
          <div className='bg-gray-100 border border-gray-300 p-3 rounded-lg flex items-center justify-between'>
            <div>
              <p className='font-semibold text-gray-800'>Phone Number:</p>
              <p className='text-red-500'>{landlord.phone}</p>
            </div>
            <button
              className='bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center'
              onClick={() => window.open(`tel:${landlord.phone}`, '_blank')}
            >
              <FaPhone className='mr-2' />
              Call
            </button>
          </div>
          <div className='bg-gray-100 border border-gray-300 p-3 rounded-lg'>
            <p className='font-semibold text-gray-800'>Message:</p>
            <textarea
              name='message'
              id='message'
              rows='4'
              value={message}
              onChange={onChange}
              placeholder='Enter your message here...'
              className='w-full mt-2 border p-3 rounded-lg resize-none'
            ></textarea>
          </div>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-gray-700 text-white text-center p-3 uppercase rounded-lg hover:bg-gray-600'
          >
            
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
