import React from 'react'
import Image from 'next/image';

const BookingList = ({ bookingList }) => {
  // Check if bookingList is an array
  if (!Array.isArray(bookingList)) {
    // Return some fallback UI or handle the case where bookingList is not an array
    return <div>No bookings available</div>;
  }

  return (
    <div>
      {bookingList.map((item, index) => (
        <div key={index}>
          <Image
            src={item.doctor.attributes?.image?.data[0].attributes?.url}
            className='rounded-full object-cover h-[70px] w-[70px]'
            width={100}
            height={100}
            alt='doctor image'
          />
          <div>
            <h2>{item.attributes.doctor.data.attributes.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;
