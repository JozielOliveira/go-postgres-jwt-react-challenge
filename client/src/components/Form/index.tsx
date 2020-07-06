import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { FixMeLate } from 'types';

type FormProps = {
  children: React.ReactNode;
  initialValues?: FixMeLate;
  validationSchema: FixMeLate;
  onSubmit: FixMeLate;
  [x: string]: FixMeLate;
};

export const Form = ({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  ...props
}: FormProps) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  return (
    <FormProvider {...methods}>
      <form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
        <>{children}</>
      </form>
    </FormProvider>
  );
};
