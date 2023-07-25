import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export default function YoutubeForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: 'Batman',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: '',
      },
      phoneNumbers: ['', ''],
      phNumbers: [
        {
          number: '',
        },
      ],
      age: 0,
      dob: new Date(),
    },
  });
  const { register, control, handleSubmit, formState, watch, getValues } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  //   const watchForm = watch();

  // useEffect(() => {
  //     const subscription = watch((value) => {
  //         console.log("watched values: ", value);
  //     });

  //     // cleanup
  //     return () => {
  //         subscription.unsubscribe();
  //     }
  // }, [watch])

  const handleOnSubmit = (data: FormValues) => {
    console.log('form submitted ', data);
  };

  const handleGetFormValues = () => {
    console.log('Get Values ', getValues());
    // console.log('Get Values ', getValues(['social', 'email']));
  };

  return (
    <div>
      {/* <h2>Watched Values {JSON.stringify(watchForm)}</h2> */}

      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div className='form-control'>
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
          <p className='error'>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[a-zA-Z0-9,!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+?(?:\.[a-zA-Z0-9-]+)/,
                message: 'Invalid email format',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return fieldValue !== 'admin@example.com' || 'Enter a different address';
                },
                notBlackListed: (fieldValue) => {
                  return !fieldValue.endsWith('baddomain.com') || 'This domain is not supported ';
                },
              },
            })}
          />
          <p className='error'>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register('channel', {
              required: {
                value: true,
                message: 'Channel is required',
              },
            })}
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='twitter'>Twitter</label>
          <input type='text' id='twitter' {...register('social.twitter')} />
        </div>

        <div className='form-control'>
          <label htmlFor='facebook'>Facebook</label>
          <input type='text' id='facebook' {...register('social.facebook')} />
        </div>

        <div className='form-control'>
          <label htmlFor='primary-phone'>Primary phone number</label>
          <input type='text' id='primary-phone' {...register('phoneNumbers.0')} />
        </div>

        <div className='form-control'>
          <label htmlFor='secondary-phone'>Secondary phone number</label>
          <input type='text' id='secondary-phone' {...register('phoneNumbers.1')} />
        </div>

        <div>
          <label htmlFor='phNumbers'>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div className='form-control' key={field.id}>
                <input type='text' {...register(`phNumbers.${index}.number` as const)} />
                {index > 0 && (
                  <button type='button' onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type='button' onClick={() => append({ number: '' })}>
            Add phone number
          </button>
        </div>

        <div className='form-control'>
          <label htmlFor='age'>Age</label>
          <input
            type='number'
            id='age'
            {...register('age', {
              valueAsNumber: true,
              required: {
                value: true,
                message: 'Age is required',
              },
            })}
          />
          <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='dob'>Date of Birth</label>
          <input
            type='date'
            id='dob'
            {...register('dob', {
              valueAsDate: true,
              required: {
                value: true,
                message: 'Date of birth is required',
              },
            })}
          />
          <p className='error'>{errors.dob?.message}</p>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <button>Submit</button>
        </div>

        <div>
          <button type='button' onClick={handleGetFormValues}>
            Get Values
          </button>
        </div>
      </form>
      {/* end form */}
      <DevTool control={control} />
    </div>
  );
}
