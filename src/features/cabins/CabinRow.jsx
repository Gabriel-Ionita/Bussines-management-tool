import styled from "styled-components";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteServiciu } from "./useDeleteServiciu";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteServiciu } = useDeleteServiciu();

  // Fallback for missing properties
  const {
    id: serviciuId = "N/A",
    nume = "N/A",
    Capacitate = "N/A",
    pret_deBaza = 0,
    reducere = "N/A",
    imagine = "default-image.jpg",
  } = serviciu || {};

  return (
    <>
      <TableRow role="row">
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
          <button onClick={() => setShowForm((show) => !show)}>Editeaza</button>
          <button
            onClick={() => deleteServiciu(serviciuId)}
            disabled={isDeleting}
          >
            Sterge
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm serviciuDeEditat={serviciu} />}
    </>
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
