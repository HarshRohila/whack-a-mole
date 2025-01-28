import React, { FC } from "react"
import { ModalData } from "./controller"
import Modal from "react-bootstrap/Modal"
import { ModalController } from "./controller"

interface ModalProps {
  modalData: ModalData | undefined
}

const ModalComponent: FC<ModalProps> = (props) => {
  const show = !!props.modalData

  const handleClose = () => {
    ModalController.hideModal()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
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

export { ModalComponent as Modal, ModalController }
