import { useForm } from 'react-hook-form';

export default function YoutubeForm() {
  const form = useForm();
  const { register } = form;

  return (
    <form>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' {...register("username")} />
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' {...register("email")} />
      <label htmlFor='channel'>Channel</label>
      <input type='text' id='channel' {...register("channel")} />

      <button>Submit</button>
    </form>
  );
}