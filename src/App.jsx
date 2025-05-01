import { Suspense } from 'react'
import './App.css'
import './styles/media-queries.css'
import RouteRenderer from './routing/RouteRenderer'

function App() {
 return(
  <Suspense fallback={<div className="spinner">Loading...</div>}>
    <RouteRenderer/>
  </Suspense>
 )
  
}

export default App
