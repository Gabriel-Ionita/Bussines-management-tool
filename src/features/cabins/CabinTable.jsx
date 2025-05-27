import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useServicii } from "./useServicii";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from 'react-router-dom';
import Empty from "../../ui/Empty";


function ServiciuTable() {
  const { isLoading, serviciu } = useServicii();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if(!serviciu.length) return <Empty resourceName="Servicii" />;

  const filterValue = searchParams.get( "reducere") || "all";


  let filteredServicii = [];
  if (serviciu) {
    if(filterValue === "all") filteredServicii = serviciu;
    if(filterValue === "noDiscount")
       filteredServicii = serviciu.filter((serviciu) => serviciu.reducere === 0);
    if(filterValue === "withDiscount") 
      filteredServicii = serviciu.filter((serviciu) => serviciu.reducere > 0);
  }

  //Sorteaza
  const sortBy = searchParams.get("sortBy") || "nume-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedServicii = filteredServicii.sort(
    (a, b) =>  (a[field] - b[field]) * modifier);
   
    
  

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
      
      <Table.Body
       data={sortedServicii} render={(serviciu) => (
        <CabinRow serviciu={serviciu} key={serviciu.id} />
      )}/>
      </Table>
    </Menus>
  );
}
export default ServiciuTable;
