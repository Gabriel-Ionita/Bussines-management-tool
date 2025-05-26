import supabase, { supabaseUrl } from "./supabase";

export async function getServicii() {
  const { data, error } = await supabase.from("serviciu").select("*");
  if (error) {
    console.error(error);
    throw new Error("Serviciul nu a putut fi incarcat:");
  }

  return data;
}

export async function createEditServiciu(serviciuNou, id) {
  const hasImagePath = serviciuNou.imagine?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${serviciuNou.nume}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? serviciuNou.imagine
    : `${supabaseUrl}/storage/v1/object/public/imagini-servicii/${imageName}`;
  //https://aexzaxwiuolrythxzjml.supabase.co/storage/v1/object/public/imagini-servicii//atv.jpg

  // creare serviciu nou
  let query = supabase.from("serviciu");

  //CREATE
  if (!id) query = query.insert([{ ...serviciuNou, imagine: imagePath }]);

  //Editare serviciu
  if (id)
    query = query.update({ ...serviciuNou, imagine: imagePath }).eq("id", id);

  //Executare query
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Serviciul nu a putut fi actualizat");
  }

  //Incarcare imagine
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("imagini-servicii")
    .upload(imageName, serviciuNou.imagine);

  // delete serviciuNou.imagine if error
  if (storageError) {
    await supabase.from("serviciu").delete().eq("id", data[0].id);
    console.error(error);
    throw new Error("Imaginea Serviciului, nu a putut fi incarcata");
  }
  return data;
}
export async function deleteServiciu(id) {
  const { error } = await supabase.from("serviciu").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Serviciul nu a putut fi sters");
  }
}
