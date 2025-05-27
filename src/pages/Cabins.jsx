import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddServiciu from "../features/cabins/AddServiciu.jsx";
import OperatiuniTabelServicii from "../features/cabins/OperatiuniTabelServicii";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Servicii Disponibile</Heading>
        <OperatiuniTabelServicii/>
       </Row>
      <Row>
        <CabinTable />
        <AddServiciu />
      </Row>
    </>
  );
}

export default Cabins;
