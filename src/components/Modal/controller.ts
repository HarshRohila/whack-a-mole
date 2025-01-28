import { readOnlyState } from "@app/hooks/useStateStream"
import { createState } from "@rx-state-utils/react"

interface ModalData {
  title: string
  message: string
}

const state = createState<{ modalData: ModalData | undefined }>({
  modalData: undefined,
})

const ModalController = {
  showModal(data: ModalData) {
    state.update({ modalData: data })
  },
  hideModal() {
    state.update({ modalData: undefined })
  },
  state: readOnlyState(state),
}

export { ModalController }
export type { ModalData }
