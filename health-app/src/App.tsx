import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FindDoctorPage from './pages/FindDoctorPage';
import MedicinePage from './pages/MedicinePage';
import HealthDiseasePage from './pages/HealthDiseasePage';
import BloodDonationPage from './pages/BloodDonationPage';
import ChildHealthPage from './pages/ChildHealthPage';
import PeriodSupportPage from './pages/PeriodSupportPage';
import AbortionSupportPage from './pages/AbortionSupportPage';
import AnimalBitePage from './pages/AnimalBitePage';
import AnimalTreatmentPage from './pages/AnimalTreatmentPage';
import DisasterSupportPage from './pages/DisasterSupportPage';
import HealthAlertPage from './pages/HealthAlertPage';
import NotificationPage from './pages/NotificationPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/find-doctor" element={<FindDoctorPage />} />
          <Route path="/medicine" element={<MedicinePage />} />
          <Route path="/health-disease" element={<HealthDiseasePage />} />
          <Route path="/blood-donation" element={<BloodDonationPage />} />
          <Route path="/child-health" element={<ChildHealthPage />} />
          <Route path="/period-support" element={<PeriodSupportPage />} />
          <Route path="/abortion-support" element={<AbortionSupportPage />} />
          <Route path="/animal-bite" element={<AnimalBitePage />} />
          <Route path="/animal-treatment" element={<AnimalTreatmentPage />} />
          <Route path="/disaster-support" element={<DisasterSupportPage />} />
          <Route path="/health-alert" element={<HealthAlertPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;