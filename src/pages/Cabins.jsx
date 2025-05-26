import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddServiciu from "../features/cabins/AddServiciu.jsx";
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Servicii Disponibile</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <AddServiciu />
      </Row>
    </>
  );
}

export default Cabins;
