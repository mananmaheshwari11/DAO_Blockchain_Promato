import { useState, useEffect } from "react";
import axios from "axios";
import "./Marketplace.css";
import Navbar from "./Navbar";

const Marketplace = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await axios.get("/api/promato/prompt");
        setPrompts(res.data.prompts);
      } catch (err) {
        console.error("Error fetching prompts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const openModal = (prompt) => {
    setSelectedPrompt(prompt);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="marketplace-container">
      <Navbar/>
      <div className="marketplace-content">
        <h1>Prompt Marketplace</h1>
        <p className="marketplace-subtitle">Discover and purchase quality prompts from our community</p>

        {loading ? (
          <div className="loading-container">
            <p>Loading prompts...</p>
          </div>
        ) : (
          <div className="prompt-cards-container">
            {prompts.map((prompt, index) => (
              <div key={index} className="prompt-card">
                <h3 className="prompt-title">{prompt.title}</h3>
                <p className="prompt-description">
                  {prompt.description.length > 120
                    ? `${prompt.description.substring(0, 120)}...`
                    : prompt.description}
                </p>
                <div className="prompt-cost">{prompt.cost.toFixed(2)}$</div>
                <div className="prompt-actions">
                  <button
                    className="info-button"
                    onClick={() => openModal(prompt)}
                  >
                    Info
                  </button>
                  <button className="buy-button">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedPrompt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedPrompt.title}</h2>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="prompt-full-description">
                {selectedPrompt.description}
              </p>
              <div className="prompt-details">
                <div className="prompt-cost-detail">
                  <span className="detail-label">Cost:</span>
                  <span className="detail-value">
                    ${selectedPrompt.cost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="test-button">Test This Prompt</button>
              <button className="buy-button">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;