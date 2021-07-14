import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/auth';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const [activePath, setActivePath] = useState('');
  const routerPathName = useRouter().pathname;
  const path = routerPathName === '/' ? 'home' : routerPathName.substr(1);

  useEffect(() => {
    setActivePath(path);
  }, [routerPathName]);

  return (
    <div className='border-b-2'>
      <div className='container px-5 py-2 mx-auto flex justify-between'>
        <div>
          <Link href='/'>
            <a
              className={`font-semibold capitalize sm:hover:text-blue-400 pb-2 ${
                activePath === 'home' || activePath.includes('post')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : ''
              }`}
            >
              {user ? user.username : 'home'}
            </a>
          </Link>
        </div>
        {user ? (
          <div>
            <p
              className='ml-5 font-semibold sm:hover:text-blue-400 cursor-pointer inline-block'
              onClick={() => {
                logout();
              }}
            >
              Logout
            </p>
          </div>
        ) : (
          <div>
            <Link href='/login'>
              <a
                className={`font-semibold sm:hover:text-blue-400 pb-2 ${
                  activePath === 'login'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : ''
                }`}
              >
                Login
              </a>
            </Link>
            <Link href='/register'>
              <a
                className={`ml-5 font-semibold sm:hover:text-blue-400 pb-2 ${
                  activePath === 'register'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : ''
                }`}
              >
                Register
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
