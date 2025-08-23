import { FallbackProps } from 'react-error-boundary';

export function UIErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className='bg-pink-200'>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
