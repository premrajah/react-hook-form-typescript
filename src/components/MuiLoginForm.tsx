import { TextField, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

type FormValues = {
  email: string;
  password: string;
};

export default function MuiLoginForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onFormSubmit = (data: FormValues) => {
    console.log('form values ', data);
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label='Email'
            type='email'
            variant='outlined'
            {...register('email', {
              required: 'Email is required',
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type='submit' variant='outlined' color='primary'>
            Submit
          </Button>
        </Stack>
      </form>
      {/* end form */}

      <DevTool control={control} />
    </>
  );
}
