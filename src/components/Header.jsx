import { Link } from "react-router-dom"



function Header () {
  return (
<header className="fixed top-2 left-1/2 transform -translate-x-1/2 w-5/6">
   
      <nav className="flex justify-between items-center border-4 border-white bg-blue-600 text-white font-semibold rounded-lg">
        <h1 className="text-2xl">The WeatherApp</h1>
      <Link to="/" className="p-3 hover:bg-blue-800 cursor-pointer rounded-lg flex items-center">Home</Link>
        <Link to="/WeatherApp" className="p-3 hover:bg-blue-800 cursor-pointer rounded-lg flex items-center">Forecast</Link>
    </nav>
    </header>
  )
}


export default Header