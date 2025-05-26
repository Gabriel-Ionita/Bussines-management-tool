import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useServicii } from "./useServicii";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
function ServiciuTable() {
  const { isLoading, serviciu } = useServicii();

  if (isLoading) return <Spinner />;

  return (
    <Menus>

    
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Nr.</div>
        <div>Serviciu</div>
        <div>Capacitate</div>
        <div>Pret</div>
        <div>Reducere</div>
        <div></div>
      </Table.Header>
      
      <Table.Body data={serviciu} render={(serviciu) => (
        <CabinRow serviciu={serviciu} key={serviciu.id} />
      )}/>
    </Table>
    </Menus>
  );
}
export default ServiciuTable;
