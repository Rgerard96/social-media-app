import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_POST, DELETE_COMMENT, GET_POSTS } from '../utils/graphql';

export default function DeleteButton({ id, callback, commentId }) {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: GET_POSTS,
        });

        let newData = [...data.getPosts];
        newData = newData.filter((p) => p.id !== id);

        proxy.writeQuery({
          query: GET_POSTS,
          data: {
            ...data,
            getPosts: {
              newData,
            },
          },
        });
      }

      if (callback) callback();
    },
    variables: { postId: id, commentId },
  });

  const onDelete = () => {
    deletePostOrComment();
  };

  return (
    <div
      className='border mt-3 border-red-500 rounded w-max px-2 py-1 items-center cursor-pointer'
      onClick={onDelete}
    >
      <i className='fas fa-trash text-red-500'></i>
    </div>
  );
}
