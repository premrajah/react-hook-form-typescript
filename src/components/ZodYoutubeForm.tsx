import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email(),
    channel: z.string().nonempty("Channel is required"),
})

type FromValues = {
  username: string;
  email: string;
  channel: string;
};

export default function ZodYoutubeForm() {
  const form = useForm<FromValues>({
    defaultValues: {
      username: 'Superman',
      email: '',
      channel: '',
    },
    resolver: zodResolver(schema)
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const handleOnFormSubmit = (data: FromValues) => {
    console.log('form ', data);
  };

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit(handleOnFormSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' {...register('username')} />
          <p className='error'>{errors.username?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' {...register('email')} />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input type='text' id='channel' {...register('channel')} />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <div className='form-control'>
          <button>Submit</button>
        </div>
      </form>
      {/* end form */}
      <DevTool control={control} />
    </div>
  );
}
