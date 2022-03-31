export const validate = (form, showAll = false) => {
  let errors = {};

  const inputGreaterLowerAndNumber = (input, minNumber, maxNumber) => {
    return !(input >= minNumber && input <= maxNumber && !isNaN(input));
  };
  if (showAll || form.dog_breed !== undefined) {
    if (!form.dog_breed) errors.dog_breed = "Dog breed is required";
    else if (!/^[a-zA-Z\s]{1,30}$/.test(form.dog_breed))
      errors.dog_breed = "Only accept a max of 30 letters and whitespaces";
  }

  if (
    showAll ||
    form.weight_min !== undefined ||
    form.weight_min !== undefined
  ) {
    if (!form.weight_min) errors.weight_min = "Number is required";
    else if (
      isNaN(form.weight_min) ||
      inputGreaterLowerAndNumber(form.weight_min, 1, 98)
    )
      errors.weight_min = "Only accept numbers between 1 to 98";

    if (!form.weight_max) errors.weight_max = "Number is required";
    else if (form.weight_max <= form.weight_min)
      errors.weight_max = "Max weight must be greater than min weight";
    else if (inputGreaterLowerAndNumber(form.weight_max, 2, 99)) {
      errors.weight_max = "Only accept numbers between 2 to 99";
    }
  }

  if (
    showAll ||
    form.height_min !== undefined ||
    form.height_max !== undefined
  ) {
    if (!form.height_min) errors.height_min = "Number is required";
    else if (inputGreaterLowerAndNumber(form.height_min, 10, 109))
      errors.height_min = "Only accept numbers between 10 to 109";

    if (!form.height_max) errors.height_max = "Number is required";
    else if (form.height_max <= form.height_min)
      errors.height_max = "Max height must be greater than min height";
    else if (inputGreaterLowerAndNumber(form.height_max, 11, 110))
      errors.height_max = "Only accept numbers between 11 to 110";
  }

  if (
    showAll ||
    form.life_span_min !== undefined ||
    form.life_span_max !== undefined
  ) {
    if (!form.life_span_min) errors.life_span_min = "Number is required";
    else if (inputGreaterLowerAndNumber(form.life_span_min, 1, 49))
      errors.life_span_min = "Only accept numbers between 1 to 49";
    if (!form.life_span_max) errors.life_span_max = "Number is required";
    else if (inputGreaterLowerAndNumber(form.life_span_max, 2, 50))
      errors.life_span_max = "Only accept numbers between 2 to 50";
    else if (form.life_span_max <= form.life_span_min)
      errors.life_span_max = "Max life span must be greater than min life span";
  }

  if (showAll || form.temperament !== undefined) {
    if (!form.temperament.length)
      errors.temperament = "Temperament is required";
  }

  return errors;
};
//   !/^([2-9]{1}[0-9]{1}|[1]{1}[1-9]{1}|[1]{1}[0]{1}[0-9]{1}|[1]{2}[0]{1})$/.test(
// form.life_span
