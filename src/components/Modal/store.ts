import { Store, createStoreHook } from "context-scoped-state"

interface ModalData {
  title: string
  message: string
}

class ModalStore extends Store<{ modalData: ModalData | undefined }> {
  protected getInitialState(): { modalData: ModalData | undefined } {
    return { modalData: undefined }
  }

  private showModal(data: ModalData) {
    this.setState({ ...this.getState(), modalData: data })
  }

  showGameOverModal(score: number) {
    this.showModal({
      title: "Game Over!",
      message: `Your score is ${score}`,
    })
  }

  hideModal() {
    this.setState({ ...this.getState(), modalData: undefined })
  }
}

const useModalStore = createStoreHook(ModalStore)

export { useModalStore, type ModalData }
