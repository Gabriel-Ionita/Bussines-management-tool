import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import PropTypes from 'prop-types';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    // id,
    // created_at,
    DataSosire,
    DataPlecare,
    NumNopti,
    // numVizitatori,
    status,
    PretTotal,
    Vizitatori: { numePrenume, email },
    serviciu: { nume },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{nume}</Cabin>

      <Stacked>
        <span>{numePrenume}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(DataSosire))
            ? "Today"
            : formatDistanceFromNow(DataSosire)}{" "}
          &rarr; {NumNopti} night stay
        </span>
        <span>
          {format(new Date(DataSosire), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(DataPlecare), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(PretTotal)}</Amount>
    </Table.Row>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    created_at: PropTypes.string,
    DataSosire: PropTypes.string.isRequired,
    DataPlecare: PropTypes.string.isRequired,
    NumNopti: PropTypes.number.isRequired,
    numVizitatori: PropTypes.number,
    PretTotal: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    Vizitatori: PropTypes.shape({
      numePrenume: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    serviciu: PropTypes.shape({
      nume: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingRow;
