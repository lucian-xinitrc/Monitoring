'use client'
import Image from "next/image";
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [data, setData] = useState({ temp: null, humi: null, status: 'loading' });
  const [databubu, setDatabubu] = useState({ temp: null, humi: null, status: 'loading' });
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://api.gethonis.com/temp', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const resbubu = await fetch('https://api.gethonis.com/tempbubu', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const date = await res.json();
          const datebubu = await resbubu.json();
          setData(date);
          setDatabubu(datebubu);
        } catch (error) {
          setData({ status: 'error', message: error.message });
        }
      };
      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }, []);
  
  return (
    <section className="h-screen bg-[#0b131e] content-center">
    <div className="flex justify-center">
    <div className="sm:flex sm:justify-center gap-10">
      <div className="shadow-xl/30 border border-slate-950 rounded-full p-10 w-60 h-60 flex justify-center items-center content-center">
        <div className="text-4xl">
          <h1 className="font-bold my-2 flex text-center">{databubu.temp} <p className="text-md ml-2">°</p></h1>
          <h1 className="text-2xl text-center">Bubu</h1>
          <h1 className="font-bold my-2 flex text-center">{databubu.humi} <p className="text-sm mt-3 ml-2">%</p></h1>
        </div>
      </div>

      <div className="mt-10 sm:mt-0 shadow-xl/30 border border-slate-950 rounded-full p-10 w-60 h-60 flex justify-center items-center content-center">
        <div className="text-4xl">
           <h1 className="font-bold my-2 flex text-center">{data.temp} <p className="text-md ml-2">°</p></h1>
          <h1 className="text-2xl text-center">Dudu</h1>
          <h1 className="font-bold my-2 flex text-center">{data.humi} <p className="text-sm mt-3 ml-2">%</p></h1>
        </div>
      </div>
    </div>
    </div>
    </section>
  );
}
