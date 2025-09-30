'use client'
import Image from "next/image";
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const [data, setData] = useState({ temp: null, humi: null, status: 'loading' });
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://api.gethonis.com/temp', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const date = await res.json();
          setData(date);
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
      <div className="w-screen flex justify-center">
        <div className="p-10 w-auto content-center shadow-xl/30 shadow-black rounded-lg">
          <h1 className="text-2xl font-bold "> <FontAwesomeIcon icon={faThermometerHalf} className="text-green-400"/> {data.temp}</h1>
        </div>
        <div className="p-10 w-auto content-center shadow-xl/30 shadow-black rounded-lg ml-10">
          <h1 className="text-2xl font-bold"> <FontAwesomeIcon icon={faTint} className="text-orange-400" /> {data.humi}</h1>
        </div>
      </div>
    </section>
  );
}
