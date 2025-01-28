import React, { FC } from "react"
import { ModalData } from "./controller"
import { styled } from "@app/libs/style"

interface ModalProps {
  modalData: ModalData
}

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid black;
`

const Modal: FC<ModalProps> = (props) => {
  return <StyledModal>{props.modalData.message}</StyledModal>
}

export { Modal }
export { ModalController } from "./controller"
