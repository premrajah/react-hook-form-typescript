import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export default function YoutubeForm() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmitHandler = (data: FormValues) => {
    console.log('form submitted ', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
          })}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          {...register('email', {
            required: {
                value: true,
                message: "Email is required"
            },
            pattern: {
              value: /^[a-zA-Z0-9,!#$%&'*+/=?^_`{|}~-]+\@[a-zA-Z0-9]+?(?:\.[a-zA-Z0-9-]+)/,
              message: 'Invalid email format',
            },
          })}
        />
        <label htmlFor='channel'>Channel</label>
        <input type='text' id='channel' {...register('channel', { required: {
            value: true,
            message: 'Channel is required'} })} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
