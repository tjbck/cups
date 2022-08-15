import React, { useEffect, useRef } from 'react'
import QrScanner from 'qr-scanner';
import toast from 'react-hot-toast';

type ScanQRCodeProps = {
    callback?: (result: QrScanner.ScanResult) => void
}

const ScanQrCode = ({ callback = (result: QrScanner.ScanResult) => console.log('decoded qr code:', result) }: ScanQRCodeProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current !== null) {

            const qrScanner = new QrScanner(
                videoRef.current,
                callback,
                {
                    maxScansPerSecond: 5,
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    // returnDetailedScanResult: true,
                    /* your options or returnDetailedScanResult: true if you're not specifying any other options */
                }
            );

            QrScanner.hasCamera().then((status) => {
                if (status) {
                    qrScanner.start();
                } else {
                    toast('Camera not found!');
                }
            })

            return () => {
                qrScanner.stop();
            }
        }

    }, [callback])



    return (
        <>
            <div className='relative'>
                <video ref={videoRef} className="rounded-lg w-full h-full" ></video>
            </div>
        </>
    )
}



export default ScanQrCode