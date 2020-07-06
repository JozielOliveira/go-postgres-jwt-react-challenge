import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FixMeLate } from 'types';

type InputTextType = {
  name: string;
  label: string;
  [x: string]: FixMeLate;
};

export const InputText = ({ name, label, ...props }: InputTextType) => {
  const { errors, control } = useFormContext();

  return (
    <>
      <Controller
        as={TextField}
        name={name}
        variant="outlined"
        fullWidth
        id={name}
        label={label}
        control={control}
        {...props}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <p className="text-danger mb-0">{message}</p>}
      />
    </>
  );
};
