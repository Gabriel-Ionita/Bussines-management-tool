import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    setari: {
      RezervareMinima,
      RezervareMaxima,
      MaxNrVizitatori,
      servireMasa,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }
  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow eticheta="Rezervare minima ">
        <Input
          type="number"
          id="min-nights"
          defaultValue={RezervareMinima}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "RezervareMinima")}
        />
      </FormRow>

      <FormRow eticheta="Rezervare maxima">
        <Input
          type="number"
          id="max-nights"
          defaultValue={RezervareMaxima}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "RezervareMaxima")}
        />
      </FormRow>
      <FormRow eticheta="Numar maxim de persoane">
        <Input
          type="number"
          id="max-guests"
          defaultValue={MaxNrVizitatori}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "MaxNrVizitatori")}
        />
      </FormRow>
      <FormRow eticheta="Costuri suplimentare">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={servireMasa}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "servireMasa")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
