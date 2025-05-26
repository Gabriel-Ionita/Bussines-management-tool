import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>Esti sigur ca doresti sa stergi acest activ {resourceName} ?</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Anulare
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Sterge
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
ConfirmDelete.propTypes = {
  resourceName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default ConfirmDelete;
