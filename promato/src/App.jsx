import { Route, Routes } from 'react-router-dom'
import DaoPage from './pages/DaoDash'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import SellPage from './pages/SellPage'
import About from './pages/About'
import DAOProposalModal from './DaoComponents/DaoProposal'
import HistoryTable from './DaoComponents/History'
import { Toaster } from 'react-hot-toast'
import AccessContext from './Context/AccessContext'
import { Search } from 'lucide-react'
import Marketplace from './PageComponents/Marketplace'
import SearchResults from './PageComponents/Search'


function App() {
 
  return (
    <>
    <Toaster/>
    <Routes>
    <Route path='/dao' element={<DaoPage/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='promato' element={<AccessContext/>}>
      <Route path='/promato' element={<Dashboard/>}/>
      <Route path='sell' element={<SellPage/>}/>
      <Route path='search' element={<SearchResults/>}/>
      <Route path='market' element={<Marketplace/>}/>
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/logs' element={<HistoryTable/>}/>
    </Routes>
    </>
  )
}

export default App
