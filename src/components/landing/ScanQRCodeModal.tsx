import type { ModalProps } from '../../types'
import React, { useEffect, useRef, useState } from 'react'
import Modal from '../common/Modal'
import ScanQrCode from './ScanQrCode'
import { useRouter } from 'next/router'


const ScanQRCodeModal = ({ state: { show, setShow } }: ModalProps) => {

    return (
        <>{show &&
            <Modal state={{ show, setShow }}>

                <ScanQrCode callback={(result) => {
                    // toast.success('Your cup status has been updated to yellow.');

                    if (result.data) {
                        console.log(result.data)
                        if (result.data.includes(window.location.origin)) {
                            location.href = result.data
                        }
                    }
                }} />

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setShow(false)}
                    >
                        Got it, thanks!
                    </button>
                </div>
            </Modal>}
        </>

    )
}


export default ScanQRCodeModal