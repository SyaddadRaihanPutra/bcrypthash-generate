import { useState } from "react";
import bcrypt from "bcryptjs"; // Impor library bcryptjs
import "./app.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generateHash = () => {
    // Menggunakan bcryptjs untuk membuat hash bcrypt
    bcrypt.hash(password, 10, function (err, hashedPassword) {
      if (err) {
        console.error(err);
      } else {
        setHash(hashedPassword);
        setIsCopied(false);
      }
    });
  };

  const copyToClipboard = () => {
    const hashInput = document.getElementById("hash");
    hashInput.select();
    document.execCommand("copy");
    setIsCopied(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h2>🔐 Generate Hash</h2>
      <div className="container">
        <div className="title-card">
          <label htmlFor="password">Plain Text</label>
          <button onClick={openModal} className="info-button">
            <i className="ai-info"></i>
          </button>
        </div>
        <input
          className="plain"
          type="text"
          id="password"
          value={password}
          placeholder="Masukkan plain text"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={generateHash}>Generate Hash</button>
        <label htmlFor="hash">Hash:</label>
        <div className="copy-element">
          <input type="text" id="hash" value={hash} readOnly />
          <button onClick={copyToClipboard} className="copy-button">
            {isCopied ? (
              <i className="ai-circle-check"></i>
            ) : (
              <i className="ai-clipboard"></i>
            )}
          </button>
        </div>
      </div>
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        onClick={closeModal}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Informasi 🧐</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Bcrypt adalah algoritma hashing yang digunakan untuk mengamankan
                password. Bcrypt menggunakan salt untuk menghasilkan hash yang
                unik untuk setiap password.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>
          Made with <i className="ai-heart"></i> <br /> By{" "}
          <a href="https://instagram.com/syaddadrhnp_">@syaddadrhnp_</a>
        </p>
      </footer>
    </>
  );
}

export default App;
