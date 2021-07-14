import moment from 'moment';
import DeleteButton from './DeleteButton';

export default function Comment({ comment, user, id }) {
  return (
    <div className='rounded p-3 mb-3 border flex flex-col justify-between relative shadow'>
      <div className='relative'>
        <h3 className='text-lg font-semibold'>{comment.username}</h3>
        <small className='text-gray-500'>
          {moment(comment.createdAt).fromNow()}
        </small>
        <p className='mt-2'>{comment.body}</p>
      </div>
      <div className='absolute bottom-3 right-3'>
        {user && comment.username === user.username && (
          <DeleteButton commentId={comment.id} id={id} />
        )}
      </div>
    </div>
  );
}
