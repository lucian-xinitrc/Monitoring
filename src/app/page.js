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
    <section className="h-screen w-screen bg-slate-950 content-center">
    <h1 className="text-5xl text-center font-bold mb-10">Monitoring system</h1>
    <div className="sm:flex sm:justify-center">
      <div className="w-screen gap-2 sm:flex sm:justify-center">
        <div className="py-10 px-20 w-auto content-center shadow-xl/30 shadow-black rounded-lg">
        <h1 className="text-2xl font-bold text-center pt-5 pb-5">Temperature</h1>
          <h1 className="text-2xl font-bold text-center"> <FontAwesomeIcon icon={faThermometerHalf} className="text-green-400"/> Bubu's {databubu.temp}</h1>
        </div>
        <div className="py-10 px-20 w-auto content-center shadow-xl/30 shadow-black rounded-lg sm:ml-10">
          <h1 className="text-2xl font-bold text-center pt-5 pb-5">Humidity</h1>
          <h1 className="text-2xl font-bold text-center"> <FontAwesomeIcon icon={faTint} className="text-orange-400" /> Bubu's {databubu.humi}</h1>
        </div>
      </div>
      <div className="w-screen gap-2 sm:flex sm:justify-center">
        <div className="py-10 px-20 w-auto content-center shadow-xl/30 shadow-black rounded-lg">
        <h1 className="text-2xl font-bold text-center pt-5 pb-5">Temperature</h1>
          <h1 className="text-2xl font-bold text-center"> <FontAwesomeIcon icon={faThermometerHalf} className="text-green-400"/> Dudu's {data.temp}</h1>
        </div>
        <div className="py-10 px-20 w-auto content-center shadow-xl/30 shadow-black rounded-lg sm:ml-10">
          <h1 className="text-2xl font-bold text-center pt-5 pb-5">Humidity</h1>
          <h1 className="text-2xl font-bold text-center"> <FontAwesomeIcon icon={faTint} className="text-orange-400" /> Dudu's {data.humi}</h1>
        </div>
      </div>
    </div>
    </section>
  );
}
