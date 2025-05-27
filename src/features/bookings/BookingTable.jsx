import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";


function BookingTable() {
const { isLoading, bookings } = useBookings();
console.log(bookings)
if(isLoading) return <Spinner />;
  if(!bookings ||!bookings.length) return <Empty resourceName="Rezervari" />;
  
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Serviciu</div>
          <div>Vizitator</div>
          <div>Data</div>
          <div>Status</div>
          <div>Pret</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings.filter(booking => !!booking.DataSosire)}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
