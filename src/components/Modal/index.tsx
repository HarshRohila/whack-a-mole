import { FC } from "react"
import Modal from "react-bootstrap/Modal"
import { ModalData, useModalStore } from "./store"

interface ModalProps {
  modalData: ModalData | undefined
}

const ModalComponent: FC<ModalProps> = (props) => {
  const show = !!props.modalData

  const modalStore = useModalStore()

  const handleClose = () => {
    modalStore.hideModal()
  }

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      {props.modalData && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{props.modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.modalData.message}</Modal.Body>
        </>
      )}
    </Modal>
  )
}

export { ModalComponent as Modal }
