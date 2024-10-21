import { LoginModal } from "@/components/modals/Login";
import { useModal } from "@/contexts/ModalContext";

import { EventController } from "@/utils/EventController";

function App() {
  const { showModal, hideModal, toggleModal } = useModal();

  EventController.addListener("show", show);
  EventController.addListener("hide", hide);
  EventController.addListener("toggle", toggle);

  function show(value: any) {
    showModal(value);
  }

  function hide(value: any) {
    hideModal(value);
  }

  function toggle(value: any) {
    toggleModal(value);
  }

  return (
    <>
      {/* Each modal listens to its own state */}
      <LoginModal />
    </>
  );
}

export default App;