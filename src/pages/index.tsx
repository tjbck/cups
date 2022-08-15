import type { NextPage } from "next";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ScanQRCodeModal from "../components/landing/ScanQRCodeModal";

const Home: NextPage = () => {
  const router = useRouter()

  const [roomCodeValue, setRoomCodeValue] = useState('')
  const [showScanQRCodeModal, setShowScanQRCodeModal] = useState(false)



  return (
    <div>
      <ScanQRCodeModal state={{ show: showScanQRCodeModal, setShow: setShowScanQRCodeModal }} />



      <div className="flex flex-row justify-center min-h-screen bg-indigo-900">
        <div className="basis-11/12 flex flex-col max-w-4xl text-gray-600 my-auto  pb-28">

          <div className="flex flex-col justify-center md:flex-row">

            <div className="text-center">
              <div className=" text-gray-100 text-3xl md:text-5xl font-bold">
                Fastcups
              </div>
              <div className="text-gray-200 text-sm md:text-base mt-3"><span className="text-white font-semibold">Staying in sync</span> with your instructor<br className=" md:hidden" /> has never been easier.</div>
              <div className="text-gray-200 text-xs mt-3 mb-5">
                Are you a instructor? <Link href="/rooms/create">
                  <a className=" underline hover:text-gray-300" >
                    Click here to create your room!
                  </a>
                </Link>
              </div>

              <div className="flex justify-center">
                <div className="basis-full max-w-xs">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="">
                      <button
                        className="rounded-lg py-2 px-4 w-full text-gray-600 font-semibold bg-gray-100 hover:bg-gray-200"
                        onClick={() => {
                          // location.href = '/timelines/add';
                          setShowScanQRCodeModal(true)

                        }}
                      >
                        Scan QR Code
                      </button>
                    </div>

                    <hr className="my-3" />
                    <div className=" text-center text-xs text-gray-500 mb-3">
                      or enter room code manually
                    </div>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      router.push(`/rooms/${roomCodeValue}`)
                    }}>

                      <div className="mb-2">
                        <input
                          type="text"
                          id="room-code"
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full px-3 py-2.5 "
                          placeholder="Room Code"
                          required
                          value={roomCodeValue}
                          onChange={(e) => { setRoomCodeValue(e.target.value) }}
                        />
                      </div>

                      <div className="">

                        <button
                          className="rounded-lg py-2 px-4 w-full text-white font-semibold bg-gray-700 hover:bg-gray-800"
                          type="submit"
                        >
                          Enter
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
