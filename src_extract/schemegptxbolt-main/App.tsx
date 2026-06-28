import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { DashboardPage } from './pages/DashboardPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { FamilyWelfarePage } from './pages/FamilyWelfarePage';
import { MissedOpportunitiesPage } from './pages/MissedOpportunitiesPage';

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-500/30 border-t-cyan-500" />
        <p className="text-white/50 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assistant" element={<AIAssistantPage />} />
            <Route path="/assistant/:id" element={<AIAssistantPage />} />
            <Route path="/family" element={<FamilyWelfarePage />} />
            <Route path="/missed" element={<MissedOpportunitiesPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
