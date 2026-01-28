import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { projects } from '../data/mockData';
import { ArrowRight, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export function PortfolioView({ onProjectSelect }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'success': return <Badge variant="success">En Plazo</Badge>;
            case 'warning': return <Badge variant="warning">Atención</Badge>;
            case 'danger': return <Badge variant="destructive">Atrasado</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Portfolio de Obras</h2>
                    <p className="text-slate-500 mt-1">Vista general del estado de todos los proyectos activos.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Exportar Reporte</Button>
                    <Button>Nueva Obra</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Obras Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 flex items-center font-medium"><TrendingUp className="h-3 w-3 mr-1" /> Stable</span> last 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Facturado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$18.2B</div>
                        <p className="text-xs text-slate-500 mt-1">CLP Acumulado Año</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Obras en Riesgo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-danger">1</div>
                        <p className="text-xs text-slate-500 mt-1">Requiere atención inmediata</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Cumplimiento Global</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-accent">94%</div>
                        <p className="text-xs text-slate-500 mt-1">Promedio de avance físico</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onProjectSelect(project)}>
                        <div className="flex flex-col md:flex-row md:items-center">
                            {/* Project Info */}
                            <div className="p-6 flex-1 min-w-[300px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="h-10 w-10 min-w-10 rounded bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                        {project.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{project.name}</h3>
                                        <p className="text-sm text-slate-500">{project.location}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-500 block text-xs uppercase tracking-wider">Inicio</span>
                                        <span className="font-medium text-slate-700">{project.startDate}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-xs uppercase tracking-wider">Término</span>
                                        <span className="font-medium text-slate-700">{project.endDate}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500 block text-xs uppercase tracking-wider">Presupuesto</span>
                                        <span className="font-medium text-slate-700">{formatCurrency(project.budget.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Visuals */}
                            <div className="p-6 flex-1 bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-100 h-full flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-600">Avance Físico</span>
                                    <div className="flex items-center gap-2">
                                        <span className={project.progress < project.scheduledProgress ? "text-danger font-bold" : "text-slate-900 font-bold"}>
                                            {project.progress}%
                                        </span>
                                        <span className="text-xs text-slate-400">/ {project.scheduledProgress}% prog.</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden">
                                    <div
                                        className={project.progress < project.scheduledProgress ? "bg-danger h-2.5 rounded-full" : "bg-accent h-2.5 rounded-full"}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                    {/* Ghost bar for scheduled if projected is higher */}
                                    {project.scheduledProgress > project.progress && (
                                        <div className="bg-slate-300 h-2.5 rounded-full -mt-2.5 opacity-50 relative z-0" style={{ width: `${project.scheduledProgress}%` }}></div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    {getStatusBadge(project.status)}
                                    <Button variant="ghost" size="sm" className="text-primary gap-1 p-0 hover:bg-transparent hover:text-primary/80">
                                        Ver Detalles <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
