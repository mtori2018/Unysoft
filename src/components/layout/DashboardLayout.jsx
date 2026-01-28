import React, { useState } from 'react';
import { LayoutDashboard, Building2, PieChart, Settings, Menu, Bell, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function DashboardLayout({ children, currentView, onNavigate }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { id: 'portafolio', label: 'Portafolio', icon: Building2 },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'settings', label: 'Configuración', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-slate-900 text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-20",
                    sidebarOpen ? "w-64" : "w-16"
                )}
            >
                <div className="h-16 flex items-center px-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <LayoutDashboard className="h-6 w-6 text-accent" />
                        {sidebarOpen && <span className="text-white">Unysoft<span className="text-slate-400 font-light">Control</span></span>}
                    </div>
                </div>

                <nav className="flex-1 py-6 px-2 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-slate-800",
                                currentView === item.id ? "bg-accent text-white" : "text-slate-400"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    {sidebarOpen && <div className="text-xs text-slate-500">v2.4.0 Enterprise</div>}
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-300 flex flex-col min-h-screen",
                sidebarOpen ? "ml-64" : "ml-16"
            )}>
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-6 flex items-center justify-between">
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-slate-500" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-danger rounded-full"></span>
                        </Button>
                        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-medium">Ing. Carlos Méndez</div>
                                <div className="text-xs text-slate-500">Administrador de Contratos</div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                                <User className="h-5 w-5 text-slate-500" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <div className="p-6 md:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
