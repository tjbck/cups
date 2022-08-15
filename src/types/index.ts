export type ModalState = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export type ModalProps = {
    state: ModalState
    title?: React.ReactNode | string | null
    children?: React.ReactNode
}
