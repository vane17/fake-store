import Modal, { Styles } from "react-modal";
import Image from "next/image";

// ---- assets
import iconClose from "@/assets/icons/close.svg";

interface Props {
  children: JSX.Element | JSX.Element[];
  customContainerClass?: string;
  customMainClass?: string;
  isOpen: boolean;
  onClose: () => void;
}

const STYLES_MODAL: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "0",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(3, 13, 33, 0.6)",
    border: "0",
    padding: "0",
    height: "100vh",
    width: "100%",
    maxWidth: "100vw",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    overflow: "none"
  },
  overlay: {
    zIndex: 10000000,
  },
};

export const ModalContainer = ({
  children,
  customContainerClass,
  customMainClass,
  isOpen,
  onClose,
}: Props) => {
  Modal.setAppElement("body");

  return (
    <Modal isOpen={isOpen} style={STYLES_MODAL}>
      <div
        className={`flex flex-col w-max  rounded-3xl bg-white m-auto max-h-[90vh] h-auto shadow-md p-4  ${customContainerClass}`}
      >
        <div className="flex w-full justify-end">
          <Image src={iconClose} width={32} height={32} alt="icon close"  className="cursor-pointer" onClick={onClose}/>
        </div>

        <main className={`overflow-y-auto h-full ${customMainClass}`}>
          {children}
        </main>
      </div>
    </Modal>
  );
};
