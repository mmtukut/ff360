import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AIChatWidget from './components/AIChatWidget';

import HomePage from './components/HomePage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import UserProfile from './components/UserProfile';
import InfrastructureAnalysis from "./components/InfrastructureAnalysis";
import PropertyDetailView from "./pages/PropertyDetailView";
import Properties from './pages/Properties';
import InfrastructureMap from './pages/InfrastructureMap';
import Footer from './components/Footer';
import MarketAnalysis from "./pages/MarketAnalysis";


const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/market-analysis" element={<MarketAnalysis />} />

                        <Route path="/properties/:id" element={<PropertyDetailView />} />
                        <Route path="/infrastructure-analysis" element={<InfrastructureAnalysis />} />
                        <Route path="/infrastructure-map" element={<InfrastructureMap />} />
                        {/* Add routes or navigation as needed */}
                    </Routes>
                    <AIChatWidget />
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
