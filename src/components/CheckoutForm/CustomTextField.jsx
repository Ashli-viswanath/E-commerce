import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value} // Ensure value is set for controlled input
            onChange={field.onChange} // Ensure onChange is set for controlled input
            fullWidth
            label={label}
            required
          />
        )}
      />
    </Grid>
  );
};
export default FormInput;
