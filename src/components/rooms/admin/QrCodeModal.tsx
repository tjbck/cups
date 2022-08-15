import Image from 'next/image'
import React from 'react'
import { ModalProps } from '../../../types'
import Modal from '../../common/Modal'

type QrCodeModalProps = {
    url: string
}

const QrCodeModal = ({ state: { show, setShow }, url }: ModalProps & QrCodeModalProps) => {
    return (
        <>
            {show &&
                <Modal state={{ show, setShow }}>

                    <div className='flex justify-center'>
                        <div className='h-full  w-96'>
                            <Image src={url} alt="QR Code" width="100%" height="100%" layout="responsive" />
                        </div>
                    </div>


                    <div className="mt-2 flex justify-end">
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

export default QrCodeModal