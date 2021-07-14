import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import Link from 'next/link';
import moment from 'moment';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

export default function PostCard({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  return (
    <div className='rounded p-3 border shadow divide-y flex flex-col justify-between'>
      <div className='relative pb-3'>
        <img
          src='/icons/user.svg'
          alt='User'
          className='h-8 absolute top-0 right-0'
        />
        <h3 className='text-lg font-semibold'>{username}</h3>
        <small className='text-gray-500'>{moment(createdAt).fromNow()}</small>
        <Link href={`/post/${id}`}>
          <p className='mt-2 cursor-pointer'>{body}</p>
        </Link>
      </div>
      <div className='flex justify-between'>
        <div className='flex pt-3'>
          <LikeButton user={user} id={id} likeCount={likeCount} likes={likes} />
          <div className='border border-blue-500 rounded w-20 py-1 text-center ml-2 flex divide-x divide-blue-500'>
            <Link href={`/post/${id}`}>
              <div className='w-1/2 cursor-pointer'>
                <i className='fas fa-comment text-blue-500'></i>
              </div>
            </Link>
            <div className='w-1/2 text-blue-500'>{commentCount}</div>
          </div>
        </div>
        {user && username === user.username && <DeleteButton id={id} />}
      </div>
    </div>
  );
}
