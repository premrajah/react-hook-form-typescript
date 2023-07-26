import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
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
  const { register, control, handleSubmit, formState, watch, getValues, setValue, reset } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  //   console.log("touched ", touchedFields.username, " dirty ", dirtyFields.username, " isDirty whole form ",  isDirty);

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

  useEffect(() => {
    if (isSubmitSuccessful) {
        reset();
    }
  }, [reset, isSubmitSuccessful]);

  const handleOnSubmit = (data: FormValues) => {
    console.log('form submitted ', data);
  };

  const handleGetFormValues = () => {
    console.log('Get Values ', getValues());
    // console.log('Get Values ', getValues(['social', 'email']));
  };

  const handleSetValue = () => {
    setValue('username', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log('Form errors ', errors);
  };

  return (
    <div className='formContainer'>
      {/* <h2>Watched Values {JSON.stringify(watchForm)}</h2> */}

      <form onSubmit={handleSubmit(handleOnSubmit, onError)} noValidate>
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
                emailAvailable: async (fieldValue) => {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                    const data = await response.json();
                    return data.length === 0 || "Email already exist."
                }
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
          <input
            type='text'
            id='twitter'
            {...register('social.twitter', {
              // disabled: true,
              disabled: watch('channel') === '',
              // will be undefined when disabled and required will be turned off
              required: 'Twitter is required',
            })}
          />
          <p className='error'>{errors.social?.twitter?.message}</p>
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
          <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        </div>

        <div>
          <button style={{ marginRight: '10px' }} type='button' onClick={handleGetFormValues}>
            Get Values
          </button>
          <button style={{ marginRight: '10px' }} type='button' onClick={handleSetValue}>
            Set Value
          </button>
          <button type='button' onClick={() => reset()}>
            Reset
          </button>
        </div>
      </form>
      {/* end form */}
      <DevTool control={control} />
    </div>
  );
}
