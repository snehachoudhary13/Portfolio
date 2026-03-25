import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { SkillsGrid } from './components/SkillsGrid';
import { ProjectsBoard } from './components/ProjectsBoard';
import { TrainingTimeline as TrainingCinematic } from './components/TrainingCinematic';
import { Certifications, Achievements } from './components/MoreSections';
import { CursorGlow } from './components/CursorGlow';
import { MatrixRain } from './components/MatrixRain';
import { AcademicTimeline } from './components/AcademicTimeline';
import { ContactPage } from './components/ContactPage';
import { BeyondSection } from './components/BeyondSection';

// Page Views
const DashboardView = () => (
  <>
    <Hero />
  </>
);

const SkillsView = () => (
  <>
    <SkillsGrid />
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
  </>
);

const VerificationView = () => (
  <>
    <Certifications />
    <Achievements />
  </>
);

function App() {
  return (
    <HashRouter>
      <div className="relative min-h-screen">
        <ParticleBackground />
        <MatrixRain />
        <Navigation />

        <main className="relative z-10 pt-24 pb-20">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/capabilities" element={<SkillsView />} />
            <Route path="/modules" element={<ModulesView />} />
            <Route path="/activity" element={<ActivityView />} />
            <Route path="/verification" element={<VerificationView />} />
            <Route path="/education" element={<AcademicTimeline />} />
            <Route path="/beyond" element={<BeyondSection />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <CursorGlow />
      </div>
    </HashRouter>
  );
}

export default App;
