import supabase from "./supabase";

export async function getServicii() {
  const { data, error } = await supabase.from("serviciu").select("*");
  if (error) {
    console.error(error);
    throw new Error("Serviciul nu a putut fi incarcat:");
  }

  return data;
}
