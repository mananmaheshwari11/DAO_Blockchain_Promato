import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SellPromptModal.css';
import { useNavigate } from 'react-router-dom';

const SellPromptModal = ({ isOpen, onClose }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate=useNavigate()
  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div 
          className="modal-content"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-header">
            <h2>Sell Your Prompt</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-body">
            <h3>Terms and Conditions</h3>
            <ul className="terms-list">
              <li>You need to have a metamask integrated crypto wallet for sell and transaction</li>
              <li>You have to pay the threshold fees of transaction for market governance to verify your prompt</li>
              <li>Prompt only get the platform once it is verified by the DAO</li>
              <li>Any kind of duplication or digital forgery will suspend the seller account with all the profits or royalty seized</li>
              <li>All jurisdiction under the court of digital forgery</li>
            </ul>
            
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="terms-checkbox" 
                checked={termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms-checkbox">I agree to all terms & conditions</label>
            </div>
          </div>
          
          <div className="modal-footer">
            {termsAccepted && (
              <motion.button 
                className="get-started-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>(navigate('/promato/sell'))}

              >
                Get Started
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SellPromptModal;