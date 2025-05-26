import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useEditServiciu } from "./useEditServiciu";
import PropTypes from "prop-types";
import { useCreateServiciu } from "./useCreateServiciu";

function CreateCabinForm({ serviciuDeEditat = {}, onCloseModal }) {
  const { id: editId, ...editValues } = serviciuDeEditat;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
    mode: "onBlur", // Validate on blur
  });
  const { errors } = formState;

  const { isCreating, createServiciu } = useCreateServiciu();
  const { isEditing, editServiciu } = useEditServiciu();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.imagine === "string" ? data.imagine : data.imagine[0];
    if (isEditSession)
      editServiciu(
        { newServiciuData: { ...data, imagine: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.(); // Close modal after successful edit
          },
        }
      );
    else
      createServiciu(
        { ...data, imagine: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.(); // Close modal after successful creation
          },
        }
      ); // Assuming 'imagine' is a file input and you want to send the first file
  }

  function onError(errors) {
    console.error("Form submission errors:", errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
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
            required: isEditSession ? false : "Acest camp este obligatoriu",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Anulare
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Editeaza Serviciu" : "Creaza serviciu"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  serviciuDeEditat: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
