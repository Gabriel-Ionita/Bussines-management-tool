import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createServiciu } from "../../services/apiservicii";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  // Initialize the query client to manage cache and invalidate queries
  const queryClient = useQueryClient();

  const { mutate, isLoading, isCreating } = useMutation({
    mutationFn: createServiciu,
    onSuccess: () => {
      toast.success("Serviciu creat cu succes!");
      queryClient.invalidateQueries({
        queryKey: ["serviciu"],
      });
      reset(); // Reset the form after successful submission
    },
    onError: (error) => {
      toast.error(`Eroare la crearea serviciului: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    // console.log("Form data submitted:", data);
    mutate({ ...data, imagine: data.imagine[0] }); // Assuming 'imagine' is a file input and you want to send the first file
    // Here would typically send the data to  API
    // For example: createCabin(data).then(response => { ... });
  };

  function onError(errors) {
    console.error("Form submission errors:", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow eticheta="Nume Serviciu" error={errors?.nume?.message}>
        <Input
          type="text"
          id="nume"
          {...register("nume", {
            required: "Acest camp este obligatoriu",
            min: 1,
            message: "Numele serviciului trebuie sa aiba cel putin 1 caracter",
          })}
        />
      </FormRow>
      <FormRow eticheta="Capacitate maxima" error={errors?.Capacitate?.message}>
        <Input
          type="number"
          id="Capacitate"
          {...register("Capacitate", {
            required: "Acest camp este obligatoriu",
            min: 1,
            message: "Capacitatea trebuie sa fie cel putin 1",
          })}
        />
      </FormRow>

      <FormRow eticheta="Pret de baza" error={errors?.pret_deBaza?.message}>
        <Input
          type="number"
          id="pret_deBaza"
          {...register("pret_deBaza", {
            required: "Acest camp este obligatoriu",
            min: 1,
            message: "Pretul de baza trebuie sa fie cel putin 1",
          })}
        />
      </FormRow>

      <FormRow eticheta="Reducere" error={errors?.reducere?.message}>
        <Input
          type="number"
          id="reducere"
          defaultValue={0}
          {...register("reducere", {
            required: "Acest camp este obligatoriu",
            validate: (value) =>
              value <= getValues().pret_deBaza ||
              "Reducerea nu poate fi mai mare decat pretul de baza",
          })}
        />
      </FormRow>

      <FormRow eticheta="Descriere" error={errors?.descriere?.message}>
        <Textarea
          type="number"
          id="descriere"
          defaultValue=""
          {...register("descriere", {
            required: "Acest camp este obligatoriu",
          })}
        />
      </FormRow>

      <FormRow eticheta="Imagine Serviciu">
        <FileInput
          id="imagine"
          accept="image/*"
          type="file"
          {...register("imagine", {
            required: "Acest camp este obligatoriu",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Anulare
        </Button>
        <Button disabled={isCreating}>Adauga</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
