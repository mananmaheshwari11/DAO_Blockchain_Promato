// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import '../styles/Navbar.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
const Navbar = () => {
    const navigate=useNavigate()
    const [auth,setAuth]=useAuth();
    const [query, setQuery] = useState("");
  
    const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/promato/search?q=${encodeURIComponent(query)}`);
    }
  };
    const makeLogout=()=>{
      toast.success("Logout successfully")
      setAuth({
        ...auth,
        user:"",
        token:null
      })
      navigate('/')
    }
  return (
    <motion.nav 
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-left">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          <img src='/logo.png' height={50} width={50} alt='logo'/>
          <span className="brand-name">Promato</span>
        </motion.div>
      </div>
      
      <div className="navbar-right">
    { auth?.user && ( <motion.div 
        className="search-bar"
        initial={{ width: "200px" }}
        whileFocus={{ width: "250px" }}
      >
        <input 
          type="text" 
          placeholder="Search prompts..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-icon" onClick={handleSearch}>
          <FaSearch />
        </button>
      </motion.div>
    )}   
        <div className="nav-buttons">
          <motion.button 
            className="nav-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>(navigate('/about'))}

          >
            About
          </motion.button>
          <motion.button 
            className="nav-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>(navigate('/dao'))}
          >
            DAO
          </motion.button>
      {auth?.user?(
        <motion.button 
        className="nav-btn signup-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={makeLogout}
        >
        Sign Out
        </motion.button>
      ):(
        <motion.button 
        className="nav-btn signup-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={()=>(navigate('/auth'))}
        >
        Sign Up
        </motion.button>
      )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;