
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import People from './components/pages/People/People'
import PeopleDetail from './components/pages/People/PeopleDetail/PeopleDetail'
import config from './config/app.json'
const App = () => {
  const baseUrl = config.baseUrl
  return (
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path={`${baseUrl}/`} element={<People />} />
              <Route path={`/${baseUrl}/:id`} element={<PeopleDetail />} />

            </Routes>
          </main>
        </div>
      </Router>
  )
}

export default App
