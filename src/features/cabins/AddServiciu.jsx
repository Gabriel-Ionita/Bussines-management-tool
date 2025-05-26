import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddServiciu() {
  return (
    <div>
      <Modal>
        <Modal.Open opensWindowName="cabin-form">
          <Button>Adauga un Serviciu</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {({ close }) => <CreateCabinForm onCloseModal={close} />}
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddServiciu() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         {" "}
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddServiciu;
