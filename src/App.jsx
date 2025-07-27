import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    
      <Navbar/>
      <div className=' min-h-[78.5vh] md:min-h-[85.1vh] mb-3'>
        <Manager/>
      </div>
        <Footer/>
      
      
    </>
  )
}

export default App
