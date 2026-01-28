import React, { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PortafolioView } from './views/PortafolioView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { projects } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('portafolio'); // portafolio, analytics, settings, or project-detail
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
      case 'portafolio':
        return <PortafolioView onProjectSelect={handleProjectSelect} />;
      case 'project-detail':
        return <ProjectDetailView projectId={selectedProjectId} onBack={() => setCurrentView('portafolio')} />;
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
        return <PortafolioView onProjectSelect={handleProjectSelect} />;
    }
  };

  return (
    <DashboardLayout currentView={currentView} onNavigate={handleNavigate}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
