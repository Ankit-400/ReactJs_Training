import './App.css'
// import Demo from './Demo'
// import Demo_2 from './Demo_2'
// import MyComponent from './Rendering'
import ReduxToolkitCounter from './ReduxToolkitCounter'
import { counterStore } from './store/counterStore'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      {/* <Demo /> */}
      {/* <Demo_2 /> */}
      {/* <MyComponent item={{ flag: false }} /> */}
      <Provider store={counterStore}>
        <ReduxToolkitCounter />
      </Provider>
    </>
  )
}

export default App
