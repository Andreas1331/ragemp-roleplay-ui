interface ModalState {
    login: boolean;
}

interface ModalContextProps {
    modals: ModalState;
    showModal: (modalKey: keyof ModalState) => void;
    hideModal: (modalKey: keyof ModalState) => void;
    toggleModal: (modalKey: keyof ModalState) => void;
}