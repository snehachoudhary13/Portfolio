import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { SkillsGrid } from './components/SkillsGrid';
import { SkillRadar } from './components/SkillRadar';
import { ProjectsBoard } from './components/ProjectsBoard';
import { TrainingTimeline as TrainingCinematic } from './components/TrainingCinematic';
import { EducationTimeline } from './components/Timeline';
import { Certifications, Achievements, ExtraActivities } from './components/MoreSections';
import { HexDecoder } from './components/HexDecoder';
import { CyberAvatar } from './components/CyberAvatar';
import { CursorGlow } from './components/CursorGlow';
import { MatrixRain } from './components/MatrixRain';
import { AcademicTimeline } from './components/AcademicTimeline';
import { ContactPage } from './components/ContactPage';

// Page Views
const DashboardView = () => (
  <>
    <Hero />
    <HexDecoder />
  </>
);

const CapabilitiesView = () => (
  <>
    <SkillsGrid />
    <SkillRadar />
  </>
);

const ModulesView = () => (
  <>
    <ProjectsBoard />
  </>
);

const ActivityView = () => (
  <>
    <TrainingCinematic />
    <EducationTimeline />
  </>
);

const VerificationView = () => (
  <>
    <Certifications />
    <Achievements />
    <ExtraActivities />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <ParticleBackground />
        <MatrixRain />
        <Navigation />
        
        <main className="relative z-10 pt-24 pb-20">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/capabilities" element={<CapabilitiesView />} />
            <Route path="/modules" element={<ModulesView />} />
            <Route path="/activity" element={<ActivityView />} />
            <Route path="/verification" element={<VerificationView />} />
            <Route path="/education" element={<AcademicTimeline />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        
        <CyberAvatar />
        <CursorGlow />
      </div>
    </BrowserRouter>
  );
}

export default App;
