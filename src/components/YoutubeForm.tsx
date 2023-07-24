import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
    username: string,
    email: string,
    channel: string
}

export default function YoutubeForm() {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit } = form;

  const onSubmitHandler = (data: FormValues) => {
    console.log("form submitted ", data);
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' {...register('username')} />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' {...register('email')} />
        <label htmlFor='channel'>Channel</label>
        <input type='text' id='channel' {...register('channel')} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
