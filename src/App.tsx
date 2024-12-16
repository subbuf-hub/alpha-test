import { Link, Route, BrowserRouter , Routes } from 'react-router-dom'
import './App.css'
import HeroesPage from './pages/HeroesPage'
import HeroDetail from './pages/HeroDetail '
import CreateHeroe from './pages/CreateHeroe'

function App() {

  return (
    <div>
      <BrowserRouter >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Альфа тест
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/heroes">
                  Герои
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-heroe">
                  Создать героя
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HeroesPage />} />
          <Route path="/heroes" element={<HeroesPage />} />
          <Route path="/heroes/:id" element={<HeroDetail  />} />
          <Route path="/create-heroe" element={<CreateHeroe />} />
        </Routes>
      </div>
    </BrowserRouter >
    </div>
  )
}

export default App
