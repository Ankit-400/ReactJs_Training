"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MeetupList from "../../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie-1024x576.jpg',
    address: 'Some address 5, 12345 city name',
    description: 'This is the description of first meet ever.'
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/10/12093520/Types-of-building-materials.jpg',
    address: 'Another address 3, 134 city name here',
    description: 'This is the description of second meet.'
  }
]

function Home(props) {

  const [loadedMeetups, setLoadedmeetups] = useState([]);

  useEffect(() => {
    setLoadedmeetups(DUMMY_MEETUPS);
  }, [])
  console.log(props);
  return <Layout>
    <MeetupList meetups={loadedMeetups} />
    {/* <MeetupList meetups={props.meetups} /> */}
  </Layout>
}

// export async function getStaticProps() {
//   // fetch data from API
//   // securely connect database
//   // read from any file
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
// This in-built function does not work anymore. 

export default Home;
// Now here we already have dummy data as list of meetups and we are not making any request to the server for meetups list.

// But in general case, we will get data by making request to the server. It may return promise and then after awaiting it we can assign the response to our loadedMeetups state which then can be passed to the MeetupList component. 

// As we are making req from useEffect and assigning response to our local state in useEffect, we know that useEffect runs after the execution of the component.

// So initially our state is [], and MeetupList component will be rendered for [] list of meetups. Now this will be sent by the server to us as we know that nextjs bydefault supports server side rendering. So in this source code, the list of meetups will be empty and this unwanted source code for our page will be rendered at client side which is sent by the server.

// Now in second cycle, after the component is executed, useEffect will be executed, request will be made and data will be assigned to the local state. As state changes our component will be re-rendered with the actual list of meetups. But server does not wait for this second cycle, it returns the code generated by first cycle only. So like this we are having empty meetups list in this case.

// This can be problem for Search Engine Optimization. 

// NextJs also has solution for this problem. We can pre-render a page  with data, but with data for which we have to wait and we need to tell Nextjs, once we are done waiting. So let's see how we fetch data for pre-rendering.

// Brief issue : NextJs has built in page pre-rendering but the page that is pre-renderd has basically the snapshot after the component render cycle as its content and that might be missing crucial data.

// NextJs provides us two forms of pre-rendering which we can use for controlling how the page should be rendered.
// 1. Static generation
// 2. Server side rendering

// When using static generation, a page component  is pre-rendered when we build our application / when we buid the NextJs project(npm run build).
// With static generation, by default our page is not pre-rendered on the server when the request reaches the server but instead, it is pre-rendered when we as a developer build our site for production. And that means that after it was deployed. Now if you know that some data is updated then we have to re-build the application and redeploy it. But this may be worse as data of compoenent may not change frequently. And if it does, we have other alternatives for that too.

// But specifically for Static Generation, it bydfault generates our pages statically and it does this during the build process. But if we wanted to wait for data or if we need to add data fetching to a page component, we can do so by exporting a special function from inside your page component file. This function only works in your page component files, not in other component files., only in compoent files inside of the pages folder.

// In the component we can export a function called getStaticProps(reserved name). NextJs will look for a function with that name if it finds it, it executes this function during this pre-rendering process. So it will then not directly call your component function, but it will first of all, call getStaticProps before it calls the component function.

// The job of the getStaticProps function is to prepare props for the page. And these props, could then contain the data this page needs. This function can be async and can return promise. NextJs will wait for this promise to get resolved and then we return the props for the component function.

// In getStaticProps function we can run any code that would normally run on a server and it will never end up on the client side, it will never execute on the client side. Because this code is executed during the build process, not on the server, not on the clients. (this code will never reach to the machines of our visitors)

// getStaticProps function must always return an obejct. This must have props property, which holds another object which we will receive in our component function.

// getStaticprops function is not available in the NextJs 13 and above. In thses versions static generation is convertd to the Static rendering. For implementing this we simply can create normal function for which sends fetch req. But in the metadata(configuration object) of the req, we must pass one key-value pair as
// cache: 'force-cache'. That's all we have to do. Now we can simply call this function in our main component and store the returned data into simple variable.