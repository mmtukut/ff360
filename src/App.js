import React from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { featuredProperties } from './data/properties'; // Import properties data
import Header from './components/Header';
import AIChatWidget from './components/AIChatWidget';

import HomePage from './components/HomePage';
import PropertyDetailView from "./pages/PropertyDetailView";
import Properties from './pages/Properties';
import Footer from './components/Footer';
import About from './components/About';
import SignIn from './components/auth/SignIn';
import SignUp from "./components/auth/SignUp";
import MapView from './components/MapView';
import AgentsPage from './pages/Agents/AgentsPage';
import TopAgents from './pages/Agents/TopAgents';
import VerifiedAgents from './pages/Agents/VerifiedAgents';
import AgencyDirectory from './pages/Agents/AgencyDirectory';

const AppRoutes = () => {
    const navigate = useNavigate();
    
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetailView />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route 
                path="/map" 
                element={
                    <MapView 
                        properties={featuredProperties} 
                        onClose={() => navigate(-1)}
                    />
                } 
            />
            <Route path="/agents" element={<AgentsPage />}>
                <Route index element={<TopAgents />} />
                <Route path="top" element={<TopAgents />} />
                <Route path="verified" element={<VerifiedAgents />} />
                <Route path="agencies" element={<AgencyDirectory />} />
            </Route>
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header properties={featuredProperties} />
                <main className="flex-grow">
                    <AppRoutes />
                    <AIChatWidget />
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
