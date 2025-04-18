// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
// import heroImage from '../assets/hero-image.svg';
import '../styles/HeroSection.css';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ openModal }) => {
  const navigate=useNavigate();
  const [auth]=useAuth();
  return (
    <div className="hero-section">
      <div className="hero-left">
        <motion.h1 
          className="main-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Promato
        </motion.h1>
        
        <motion.h2 
          className="sub-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Get your Prompts Instantly on Promato
        </motion.h2>
        
        <motion.p 
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Dive into the world of AI with us
        </motion.p>
    {auth?.user?(
      <motion.div 
      className="hero-buttons"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6 }}
      >
          <motion.button 
            className="hero-btn explore-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>(navigate('/promato/market'))}
            >
            Explore Market
          </motion.button>
          
          <motion.button 
            className="hero-btn sell-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            >
            Sell Prompt
          </motion.button>
        </motion.div>
          ):(
        <motion.div 
        className="hero-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        >
         <motion.button 
            className="hero-btn sell-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>(navigate('/auth'))}
            >
            Get Started
          </motion.button>
        </motion.div>
          )}    
      </div>
      
      <motion.div 
        className="hero-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <img src='/hero.png'  alt="Promato Hero" className="hero-image" />
      </motion.div>
    </div>
  );
};

export default HeroSection;