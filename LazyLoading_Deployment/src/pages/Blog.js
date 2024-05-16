import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';

function BlogPage() {
  const posts = useLoaderData();
  return <PostList posts={posts} />;
}

export default BlogPage;

export function loader() {
  return fetch('https://jsonplaceholder.typicode.com/posts');
}


// import statement =>  The code specified in the statement from some other file must be loaded when this perticuler file or component evaluated by browser. 

// Having to load all the code initially will slow down that initial page load, which leads to a bad UX.

// Lazy loading => Load certain components in the end only when  they're needed of ahead of time.