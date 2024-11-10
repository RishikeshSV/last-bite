import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
// import BackgroundWithFoodImages from './components/Background';
import Background from './components/Background';
import LandingPage from './components/LandingPage';
import { useRef, useState } from 'react';
import Ingredients from './components/Ingredients';
import FunFacts from './components/FunFacts';

function App() {
  const homeRef = useRef(null);
  const landingRef = useRef(null);
  const ingredientsRef = useRef(null);
  const funFactsRef = useRef(null);


  // Function to scroll to the Home component
  const scrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLanding = () => {
    if (landingRef.current) {
      landingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToIngredients = () => {
    if (ingredientsRef.current) {
      ingredientsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const scrollToFunFacts = () =>{
    if (funFactsRef.current) {
      funFactsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const [data, setData] = useState(null)
  return (
    <>
    <LandingPage scrollToHome={scrollToHome} ref={landingRef}/>
    <Home ref={homeRef} scrollToLanding={scrollToLanding} scrollToIngredients={scrollToIngredients} setData={setData}/>
    <Ingredients ref={ingredientsRef} scrollToIngredients={scrollToIngredients} data={data} scrollToFunFacts={scrollToFunFacts}/>
    <FunFacts ref={funFactsRef} data = {data}/>
    </>
  );
}

export default App;
