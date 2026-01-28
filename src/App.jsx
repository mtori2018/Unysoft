import React, { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PortfolioView } from './views/PortfolioView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { projects } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // portfolio, analytics, settings, or project-detail
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProjectId(project.id);
    setCurrentView('project-detail');
  };

  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    setSelectedProjectId(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'portfolio':
        return <PortfolioView onProjectSelect={handleProjectSelect} />;
      case 'project-detail':
        return <ProjectDetailView projectId={selectedProjectId} onBack={() => setCurrentView('portfolio')} />;
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-96 text-slate-400">
            Analytics Globales (Próximamente)
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96 text-slate-400">
            Configuración de Cuenta (Próximamente)
          </div>
        );
      default:
        return <PortfolioView onProjectSelect={handleProjectSelect} />;
    }
  };

  return (
    <DashboardLayout currentView={currentView} onNavigate={handleNavigate}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
