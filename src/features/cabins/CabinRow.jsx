import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteServiciu } from "./useDeleteServiciu";
import { FaCopy } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useCreateServiciu } from "./useCreateServiciu";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function ServiciuRow({ serviciu }) {
  const { isDeleting, deleteServiciu } = useDeleteServiciu();
  const { isCreating, createServiciu } = useCreateServiciu();

  const {
    id: serviciuId,
    nume = "N/A",
    Capacitate = "N/A",
    pret_deBaza = 0,
    reducere = "N/A",
    imagine = "default-image.jpg",
    descriere = "N/A",
  } = serviciu || {};

  function handleDuplicate() {
    createServiciu({
      nume: `Copie de la ${nume}`,
      Capacitate,
      pret_deBaza,
      reducere,
      imagine,
      descriere,
    });
  }

  return (
    <Table.Row>
      <Img src={imagine} alt={nume} />
      <Cabin>{nume}</Cabin>
      <div>Pentru: {Capacitate} persoane</div>
      <Price>{formatCurrency(pret_deBaza)}</Price>
      {reducere ? (
        <Discount>{formatCurrency(reducere)}</Discount>
      ) : (
        <span>N/A</span>
      )}
      <div>
        <button onClick={handleDuplicate} disabled={isCreating}>
          <FaCopy />
        </button>

        <Modal>
          <Modal.Open opensWindowName="edit">
            <button>
              <FaRegEdit />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm serviciuDeEditat={serviciu} />
          </Modal.Window>

          <Modal.Open>
            <button>
              <MdOutlineDeleteForever />
            </button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              resourceName="servicii"
              disabled={isDeleting}
              onConfirm={() => deleteServiciu(serviciuId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

ServiciuRow.propTypes = {
  serviciu: PropTypes.shape({
    nume: PropTypes.string,
    Capacitate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pret_deBaza: PropTypes.number,
    reducere: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imagine: PropTypes.string,
  }).isRequired,
};

export default ServiciuRow;
