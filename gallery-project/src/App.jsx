import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=21`
    );
    setUserData(response.data);
  }

  useEffect(() => {
    getData();
  }, [index]);

  let printUserData = (
    <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>
      Loading...
    </h3>
  );

  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => {
      return (
        <div key={idx}>
          <a href={elem.url}>
            <div className='h-40 w-44 overflow-hidden bg-white rounded-xl'>
              <img
                className='h-full w-full object-cover'
                src={elem.download_url}
                alt=""
              />
            </div>
            <h2 className='font-bold text-lg'>{elem.author}</h2>
          </a>
        </div>
      )
    });
  }

  return (
    <div className='bg-black h-screen text-white flex flex-col'>

      {/* Images Section */}
      <div className='flex-1 overflow-auto flex flex-wrap gap-9 p-4'>
        {printUserData}
      </div>

      {/* Pagination */}
      <div className='flex justify-center gap-6 items-center p-4 bg-black sticky bottom-0'>
        
        <button
          className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1);
            }
          }}
        >
          Prev
        </button>

        <h4>Page {index}</h4>

        <button
          className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          Next
        </button>

      </div>
    </div>
  )
}

export default App;