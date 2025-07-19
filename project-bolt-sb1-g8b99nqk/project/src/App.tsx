import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import HealthDiseasePage from './pages/HealthDiseasePage';
import PregnancySupportPage from './pages/PregnancySupportPage';
import PeriodSupportPage from './pages/PeriodSupportPage';
import AnimalTreatmentPage from './pages/AnimalTreatmentPage';
import AbortionSupportPage from './pages/AbortionSupportPage';
import AnimalBitePage from './pages/AnimalBitePage';
import ChildHealthPage from './pages/ChildHealthPage';
import MedicinePage from './pages/MedicinePage';
import FindDoctorPage from './pages/FindDoctorPage';
import BloodDonationPage from './pages/BloodDonationPage';
import HealthAlertPage from './pages/HealthAlertPage';
import DisasterSupportPage from './pages/DisasterSupportPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AmbulancePage from './pages/AmbulancePage';
import FeedbackPage from './pages/FeedbackPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/health-disease" element={<HealthDiseasePage />} />
            <Route path="/pregnancy-support" element={<PregnancySupportPage />} />
            <Route path="/period-support" element={<PeriodSupportPage />} />
            <Route path="/animal-treatment" element={<AnimalTreatmentPage />} />
            <Route path="/abortion-support" element={<AbortionSupportPage />} />
            <Route path="/animal-bite" element={<AnimalBitePage />} />
            <Route path="/child-health" element={<ChildHealthPage />} />
            <Route path="/medicine" element={<MedicinePage />} />
            <Route path="/find-doctor" element={<FindDoctorPage />} />
            <Route path="/blood-donation" element={<BloodDonationPage />} />
            <Route path="/health-alert" element={<HealthAlertPage />} />
            <Route path="/disaster-support" element={<DisasterSupportPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ambulance" element={<AmbulancePage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/notification" element={<NotificationPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;