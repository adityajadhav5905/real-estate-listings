import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './navbar.jsx';
import Cards from './cards.jsx';
import Mainimg from './mainimg.jsx';
import Footer from './footer.jsx';
import Enquirypop from './enquirypop.jsx';
import ListingPage from './listingpage.jsx'; 

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');

  const handleEnquireClick = (toemail) => {
    setTargetEmail(toemail);
    setShowPopup(true);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Mainimg />
              <Cards onEnquireClick={handleEnquireClick} />
              {showPopup && (
                <Enquirypop
                  onClose={() => setShowPopup(false)}
                  toemail={targetEmail}
                />
              )}
              <Footer />
            </>
          }
        />
        <Route path="/listing" element={<ListingPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
