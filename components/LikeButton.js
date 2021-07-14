import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LIKE_POST } from '../utils/graphql';
import Link from 'next/link';

export default function LikeButton({ user, id, likeCount, likes }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <div className='w-1/2 bg-green-500 py-1' onClick={likePost}>
        <i className='fas fa-heart text-green-200'></i>
      </div>
    ) : (
      <div className='w-1/2 py-1' onClick={likePost}>
        <i className='fas fa-heart text-green-500'></i>
      </div>
    )
  ) : (
    <Link href='/login'>
      <div className='w-1/2 py-1'>
        <i className='fas fa-heart text-green-500'></i>
      </div>
    </Link>
  );

  return (
    <div className='border border-green-500 rounded w-20 text-center flex divide-x divide-green-500 cursor-pointer'>
      {likeButton}
      <div className='w-1/2 text-green-500 py-1'>{likeCount}</div>
    </div>
  );
}
