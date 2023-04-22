import * as Yup from "yup";

const AutoServiceValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name Required")
    .min(2, "Name must be 2 characters at minimum"),
  sku: Yup.string()
    .required("SKU Required")
    .min(2, "SKU must be 2 characters at minimum"),
  description: Yup.string().max(
    500,
    "Description exceeded limit of 500 characters"
  ),
  organizationId: Yup.number().required("Id Required"),
  serviceTypeId: Yup.number().required("Id Required"),
  unitTypeId: Yup.number().required("Id Required"),
  unitCost: Yup.number().required("Cost Required"),
  estimatedDuration: Yup.number().required("Required"),
});

export default AutoServiceValidationSchema;
