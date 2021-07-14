import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { LOGIN_USER } from '../utils/graphql';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function login() {
  const router = useRouter();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context.user) {
      router.push('/');
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      router.push('/');
      setErrors({});
      setValues({
        email: '',
        password: '',
      });
    },
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-semibold text-center pb-3'>Login</h1>
      <p className='text-center pb-5'>
        Don't have an account yet?{' '}
        <Link href='/register'>
          <a className='text-blue-600'>Sign Up</a>
        </Link>
      </p>
      <form className='mx-auto max-w-md'>
        <div className='mb-4'>
          <label className='block mb-2'>Email</label>
          <input
            className={`border-2 ${
              errors.email && 'border-red-500'
            } rounded px-3 py-2 w-full focus:border-blue-600 outline-none`}
            type='email'
            name='email'
            id='email'
            placeholder={`${errors.email ? errors.email : 'Email'}`}
            onChange={onChange}
            value={values.email}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Password</label>
          <input
            className={`border-2 ${
              errors.password && 'border-red-500'
            } rounded px-3 py-2 w-full focus:border-blue-600 outline-none`}
            type='password'
            name='password'
            id='password'
            placeholder={`${errors.password ? errors.password : 'Password'}`}
            onChange={onChange}
            value={values.password}
          />
        </div>
        <button
          onClick={onSubmit}
          className='bg-blue-600 rounded text-white px-6 py-2 w-full sm:w-max'
        >
          Login
        </button>
      </form>
    </div>
  );
}
