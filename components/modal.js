import Modal from "react-modal";

export default function SiteModal(props) {
  return (
    <>
      <Modal
        {...props}
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      />
      <style jsx global>{`
        .modal {
          background: white;
          outline: none;
          padding: 30px;
          width: 100%;
          max-width: 800px;
          transform: translate(-50%, -50%);
          position: absolute;
          top: 50%;
          left: 50%;
          box-sizing: border-box;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </>
  );
}
