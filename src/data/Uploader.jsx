import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { bookings } from "./data-bookings";

import { Vizitatori } from "./data-guests";
import { Cabins } from "./data-cabins";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxVizitatoriPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteVizitatori() {
  const { error } = await supabase.from("Vizitatori").delete().gt("id", 0);
  if (error) console.log(error.message);
}


async function deleteBookings() {
  const { error } = await supabase.from("Rezervari").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("serviciu").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createVizitatori() {
  const { error } = await supabase.from("Vizitatori").insert(Vizitatori);
  if (error) console.log(error.message);
}



async function createCabins() {
  const { error } = await supabase.from("serviciu").insert(Cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: VizitatoriIds, error: vizError } = await supabase
    .from("Vizitatori")
    .select("id")
    .order("id");
  if (vizError || !Array.isArray(VizitatoriIds)) {
    console.error("Error fetching Vizitatori IDs:", vizError);
    return;
  }
  const allGuestIds = VizitatoriIds.map((cabin) => cabin.id);

  const { data: ServiciuIds, error: srvError } = await supabase
    .from("serviciu")
    .select("id")
    .order("id");
  if (srvError || !Array.isArray(ServiciuIds)) {
    console.error("Error fetching Serviciu IDs:", srvError);
    return;
  }
  const allCabinIds = ServiciuIds.map((cabin) => cabin.id);

  // Log the raw bookings before processing
  console.log("Raw bookings before processing:", bookings);
  
  // Log the available guest and cabin IDs
  console.log("Available guest IDs:", allGuestIds);
  console.log("Available cabin IDs:", allCabinIds);
  // Filter out bookings missing a startDate and log them
  const validBookings = bookings.filter((booking) => {
    if (!booking.DataSosire) {
      console.warn("Skipping booking with missing DataSosire:", booking);
      return false;
    }
    return true;
  });

  const finalBookings = validBookings.map((booking) => {
    // Get the cabin by ID, using the booking's idServiciu
    const cabinIndex = booking.cabinId ? booking.cabinId - 1 : booking.idServiciu - 1;
    const cabin = Cabins.at(cabinIndex);
    // Calculate numNights safely, ensuring we have valid dates
    let numNights = 0;
    if (booking.endDate && booking.startDate) {
      numNights = subtractDates(booking.endDate, booking.startDate);
    } else if (booking.DataPlecare && booking.DataSosire) {
      numNights = subtractDates(booking.DataPlecare, booking.DataSosire);
    }
    // Ensure numNights is a valid number
    numNights = numNights || 0;
    // Calculate prices safely with fallbacks for missing values
    const regularPrice = cabin?.regularPrice || 0;
    const discount = cabin?.discount || 0;
    const cabinPrice = numNights * (regularPrice - discount);
    
    const numVizitatori = booking.numVizitatori || 1;
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * numVizitatori
      : 0; // hardcoded breakfast price
      
    // Ensure totalPrice is never null
    const totalPrice = cabinPrice + extrasPrice || 0;

    // Calculate status based on DataSosire and DataPlecare (not startDate/endDate)
    let status;
    const endDate = booking.DataPlecare || booking.endDate;
    const startDate = booking.DataSosire || booking.startDate;
    
    if (isPast(new Date(endDate)) && !isToday(new Date(endDate))) {
      status = "checked-out";
    } else if (isFuture(new Date(startDate)) || isToday(new Date(startDate))) {
      status = "unconfirmed";
    } else if ((isFuture(new Date(endDate)) || isToday(new Date(endDate))) && 
               isPast(new Date(startDate)) && !isToday(new Date(startDate))) {
      status = "checked-in";
    } else {
      // Default status if none of the conditions match
      status = "unconfirmed";
    }

    return {
      DataSosire: booking.DataSosire,
      DataPlecare: booking.DataPlecare,
      NumNopti: numNights,
      numVizitatori: booking.numVizitatori,
      status,
      PretTotal: totalPrice,
      // Map old IDs to new ones from the database
      // For idVizitator: if the booking has idVizitator=1, use the first ID from allGuestIds
      idVizitator: booking.idVizitator ? allGuestIds[booking.idVizitator - 1] : allGuestIds.at(booking.guestId - 1),
      // For idServiciu: if the booking has idServiciu=1, use the first ID from allCabinIds
      idServiciu: booking.idServiciu ? allCabinIds[booking.idServiciu - 1] : allCabinIds.at(booking.cabinId - 1),
    };
  });

  // Log each booking with detailed information
  finalBookings.forEach((booking, index) => {
    console.log(`Booking ${index + 1}:`, {
      idVizitator: booking.idVizitator,
      idServiciu: booking.idServiciu,
      DataSosire: booking.DataSosire,
      DataPlecare: booking.DataPlecare,
      NumNopti: booking.NumNopti,
      status: booking.status,
      PretTotal: booking.PretTotal
    });
  });
  
  console.log("Attempting to insert bookings:", finalBookings);
  const { error } = await supabase.from("Rezervari").insert(finalBookings);
  if (error) {
    console.error("Error inserting bookings:", error);
  } else {
    console.log("Bookings inserted successfully!");
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteVizitatori();
    await deleteCabins();

    // Bookings need to be created LAST
    await createVizitatori();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await delete Bookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
