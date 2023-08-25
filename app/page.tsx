'use client';

import { useState } from 'react';
import { convertTo24HourFormat } from './utils';
import { filmData } from './filmData';

export default function App() {
  const locations = filmData
    .map((item) => item.location)
    .filter((value, index, self) => self.indexOf(value) === index);

  const dates = filmData
    .map((item) => item.date)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => {
      const dateA: any = new Date(`2023 ${a}`);
      const dateB: any = new Date(`2023 ${b}`);
      return dateA - dateB;
    });

  const [activeFilter, setActiveFilter] = useState({
    location: '',
    date: '',
  });

  const filteredData = filmData
    .filter(
      (item) =>
        (!activeFilter.location || item.location === activeFilter.location) &&
        (!activeFilter.date || item.date === activeFilter.date)
    )
    .sort((a: any, b: any) => {
      // First, sort by location
      if (a.location !== b.location) {
        return a.location.localeCompare(b.location);
      }

      // If the films are the same, sort by date
      const dateA: any = new Date(`2023 ${a.date}`);
      const dateB: any = new Date(`2023 ${b.date}`);
      if (dateA - dateB !== 0) {
        return dateA - dateB;
      }

      // If the dates are the same, sort by time
      const timeA: any = new Date(`2023 01 01 ${convertTo24HourFormat(a.time)}`);
      const timeB: any = new Date(`2023 01 01 ${convertTo24HourFormat(b.time)}`);
      if (timeA - timeB !== 0) {
        return timeA - timeB;
      }
    });

  return (
    <div className='bg-white text-blue-900 w-screen h-screen pb-6'>
      <header className='flex p-4'>
        <p className='text-2xl'>Cinemalaya 2023</p>
      </header>
      <div className='m-4 text-lg'>
        <button
          className={`px-4 py-2 rounded border ${
            activeFilter.location === '' ? 'bg-blue-900 text-white' : 'bg-white border-gray-300'
          } hover:bg-blue-900 hover:text-white`}
          onClick={() => setActiveFilter({ ...activeFilter, location: '' })}>
          All
        </button>
        {locations.map((location) => (
          <button
            key={location}
            className={`px-4 py-2 m-2 rounded border ${
              activeFilter.location === location
                ? 'bg-blue-900 text-white'
                : 'bg-white border-gray-300'
            } hover:bg-blue-900 hover:text-white`}
            onClick={() => setActiveFilter({ ...activeFilter, location })}>
            {location}
          </button>
        ))}
      </div>
      <div className='m-4 text-sm'>
        <button
          className={`px-4 py-2 rounded border ${
            activeFilter.date === '' ? 'bg-blue-900 text-white' : 'bg-white border-gray-300'
          } hover:bg-blue-900 hover:text-white`}
          onClick={() => setActiveFilter({ ...activeFilter, date: '' })}>
          All
        </button>
        {dates.map((date) => (
          <button
            key={date}
            className={`px-4 py-2 m-2 rounded border ${
              activeFilter.date === date ? 'bg-blue-900 text-white' : 'bg-white border-gray-300'
            } hover:bg-blue-900 hover:text-white`}
            onClick={() => setActiveFilter({ ...activeFilter, date })}>
            {date}
          </button>
        ))}
      </div>
      <div className='p-4 m-4'>
        {filteredData.length === 0 ? (
          <div className='py-8'>
            <p className='text-center'>No Data Found</p>
          </div>
        ) : (
          <div className='overflow-auto max-h-96'>
            <table className='table-auto w-full'>
              <thead className='bg-white border-b sticky top-0'>
                <tr className='text-left'>
                  <th className='px-4 py-2'>Date</th>
                  <th className='px-4 py-2'>Time</th>
                  <th className='px-4 py-2'>Film</th>
                  <th className='px-4 py-2'>Location</th>
                  <th className='px-4 py-2'>Cinema</th>
                  <th className='px-4 py-2'></th>
                  <th className='px-4 py-2'></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className='px-4 py-2'>{item.date}</td>
                    <td className='px-4 py-2'>{item.time}</td>
                    <td className='px-4 py-2'>{item.film}</td>
                    <td className='px-4 py-2'>{item.location}</td>
                    <td className='px-4 py-2'>{item.specific_location}</td>
                    <td className='px-4 py-2'>
                      {item.gala_premiere === 'Yes' ? 'Gala Premiere' : null}
                    </td>
                    <td className='px-4 py-2'>
                      <a className='underline' href={item.url} target='_blank'>
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer className='flex justify-center mt-20 p-6'>
        <p className='text-xs'>Made with ♡ by stargirl.codes</p>
      </footer>
    </div>
  );
}
