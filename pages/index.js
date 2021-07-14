import Head from 'next/head';
import PostCard from '../components/PostCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS, CREATE_POST } from '../utils/graphql';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS);
  const [errors, setErrors] = useState({});
  const [body, setBody] = useState('');

  const onChange = (e) => {
    setBody(e.target.value);
  };

  const [createPost] = useMutation(CREATE_POST, {
    variables: { body },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      setErrors({});
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createPost();
    setBody('');
  };

  if (loading) return (
    <div className='flex h-screen justify-center m-10'>
      <div className='flex w-14 justify-between'>
        <div className='h-3 w-3 bg-blue-600 rounded-full animate-bounce1'></div>
        <div className='h-3 w-3 bg-blue-600 rounded-full animate-bounce2'></div>
        <div className='h-3 w-3 bg-blue-600 rounded-full animate-bounce3'></div>
      </div>
    </div>
  )
  if (error) return 'Error';

  return (
    <div className='container mx-auto p-5'>
      <h1 className='text-2xl font-semibold text-center'>Recent Posts</h1>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-5'>
        {user && (
          <div className='p-3 h-full flex flex-col justify-center'>
            <h3 className='font-semibold text-xl mb-4'>Create a post:</h3>
            <input
              className={`border-2 ${
                errors.post && 'border-red-500'
              } rounded px-3 py-2 w-full focus:border-blue-600 outline-none mb-4`}
              type='text'
              name='newPost'
              id='newPost'
              placeholder={`${errors.post ? errors.post : 'Hi World!'}`}
              onChange={onChange}
              value={body}
            />
            <button
              onClick={onSubmit}
              className='bg-blue-600 rounded text-white px-6 py-2 w-full sm:w-max'
            >
              Submit
            </button>
          </div>
        )}
        {data.getPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
