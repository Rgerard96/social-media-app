import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST, CREATE_COMMENT } from '../../utils/graphql';
import moment from 'moment';
import LikeButton from '../../components/LikeButton';
import { useRouter } from 'next/router';
import DeleteButton from '../../components/DeleteButton';
import Comment from '../../components/Comment';

export default function Post() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const id = router.asPath.substr(6);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  const [body, setBody] = useState('');

  const onChange = (e) => {
    setBody(e.target.value);
  };

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, body },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createComment();
    setBody('');
  };

  if (loading)
    return (
      <div className='flex h-screen justify-center m-10'>
        <div className='flex w-14 justify-between'>
          <div className='h-3 w-3 bg-blue-600 rounded-full animate-bounce1'></div>
          <div className='h-3 w-3 bg-blue-600 rounded-full animate-bounce2'></div>
          <div className='h-3 w-3 bg-blue-600 rounded-full animate-bounce3'></div>
        </div>
      </div>
    );
  if (error) return 'Error';

  const deletePostCallback = () => {
    router.push('/');
  };

  return (
    <div key={id} className='container mx-auto p-5'>
      <div className='flex justify-center py-3'>
        <img
          src='/icons/user.svg'
          alt='User'
          className='h-20 mr-5 hidden sm:block'
        />
        <div className='flex flex-col w-full sm:w-3/4 md:w-3/4 lg:w-1/2'>
          <div className='rounded p-3 mb-3 border shadow divide-y flex flex-col justify-between w-full'>
            <div className='relative pb-3'>
              <img
                src='/icons/user.svg'
                alt='User'
                className='h-8 absolute top-0 right-0 block sm:hidden'
              />
              <h3 className='text-lg font-semibold'>{data.getPost.username}</h3>
              <small className='text-gray-500'>
                {moment(data.getPost.createdAt).fromNow()}
              </small>
              <p className='mt-2'>{data.getPost.body}</p>
            </div>
            <div className='flex justify-between'>
              <div className='flex pt-3'>
                <LikeButton
                  user={user}
                  id={id}
                  likeCount={data.getPost.likeCount}
                  likes={data.getPost.likes}
                />
                <div className='border border-blue-500 rounded w-20 py-1 text-center ml-2 flex divide-x divide-blue-500'>
                  <div className='w-1/2 cursor-pointer'>
                    <i className='fas fa-comment text-blue-500'></i>
                  </div>
                  <div className='w-1/2 text-blue-500'>
                    {data.getPost.commentCount}
                  </div>
                </div>
              </div>
              {user && data.getPost.username === user.username && (
                <DeleteButton id={id} callback={deletePostCallback} />
              )}
            </div>
          </div>
          {user && (
            <div className='p-3 mb-3 h-full flex flex-col justify-center border shadow rounded'>
              <div className='flex flex-col sm:flex-row sm:border sm:rounded sm:px-3 sm:py-2 relative'>
                <input
                  className='border-2 rounded px-3 py-2 w-full sm:border-none sm:rounded-none sm:px-0 sm:py-0 sm:focus:border-none focus:border-blue-600 outline-none mb-4 sm:mb-0'
                  type='text'
                  name='newPost'
                  id='newPost'
                  placeholder='Write a comment...'
                  onChange={onChange}
                  value={body}
                />
                <button
                  disabled={!body}
                  onClick={onSubmit}
                  className='bg-blue-600 disabled:opacity-50 rounded sm:rounded-r sm:rounded-l-none text-white px-6 py-2 w-full sm:w-max sm:absolute sm:right-0 sm:top-0'
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {data.getPost.comments.map((comment) => (
            <div className='flex flex-col justify-center w-full'>
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                id={data.getPost.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
