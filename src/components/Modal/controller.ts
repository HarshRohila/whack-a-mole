import { createStateHook, readOnlyState } from "@app/hooks/useStateStream"
import { createState } from "@rx-state-utils/react"

interface ModalData {
  message: string
}

const state = createState<ModalData | undefined>(undefined)

const ModalController = {
  showModal(data: ModalData) {
    state.update(data)
  },
  hideModal() {
    state.update(undefined)
  },
  state: readOnlyState(state),
  useState: createStateHook(state),
}

export { ModalController }
export type { ModalData }
