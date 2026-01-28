import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { projects, sCurveData, financialData, progressItems, invoices, contractors, projectAlerts, purchaseOrders, expenses, vouchers } from '../data/mockData';
import { ArrowLeft, Download, Calendar, MapPin, DollarSign, Camera, FileText, AlertTriangle, Users, FileCheck, ShoppingCart, Wallet, FileSpreadsheet } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

export function ProjectDetailView({ projectId, onBack }) {
    const project = projects.find(p => p.id === projectId) || projects[0];
    const [activeTab, setActiveTab] = useState('office'); // office, field

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumSignificantDigits: 3 }).format(amount);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* HeaderNav */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center w-full md:w-auto gap-2">
                    <Button variant="ghost" onClick={onBack} size="icon" className="-ml-2 md:ml-0">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex-1 md:flex-none">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{project.name}</h1>
                            <Badge variant={project.status === 'success' ? 'success' : project.status === 'warning' ? 'warning' : 'destructive'}>
                                {project.status === 'success' ? 'En Plazo' : project.status === 'warning' ? 'Riesgo' : 'Atrasado'}
                            </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-slate-500 text-sm">
                            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {project.location}</div>
                            <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {project.startDate} - {project.endDate}</div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto md:ml-auto">
                    <Button variant="outline" className="flex-1 md:flex-none"><FileText className="h-4 w-4 mr-2" /> Reporte</Button>
                    <Button variant="default" className="flex-1 md:flex-none"><Download className="h-4 w-4 mr-2" /> Exportar</Button>
                </div>
            </div>

            {/* Alerts Section */}
            {projectAlerts.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-2 text-orange-800 font-semibold">
                        <AlertTriangle className="h-5 w-5" />
                        <h3>Alertas del Proyecto</h3>
                    </div>
                    <div className="space-y-2">
                        {projectAlerts.map((alert) => (
                            <div key={alert.id} className="flex items-center justify-between text-sm bg-white p-3 rounded border border-orange-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                                    <span className="text-slate-700">{alert.message}</span>
                                </div>
                                <span className="text-slate-400 text-xs">{alert.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="border-b border-slate-200 overflow-x-auto">
                <nav className="-mb-px flex space-x-8 min-w-max px-1">
                    <button
                        onClick={() => setActiveTab('office')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'office'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <DollarSign className="h-4 w-4" /> Oficina (Finanzas & Contratos)
                    </button>
                    <button
                        onClick={() => setActiveTab('field')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'field'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <Camera className="h-4 w-4" /> Terreno (Avances & Fotos)
                    </button>
                </nav>
            </div>

            {activeTab === 'office' && (
                <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                    {/* Top Row: Financials */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Chart: S-Curve */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Curva S: Avance Financiero</CardTitle>
                                <p className="text-sm text-slate-500">Comparativa Línea Base (Presupuesto) vs Real (ERP)</p>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={sCurveData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                            <RechartsTooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend />
                                            <Line type="monotone" dataKey="baseline" name="Planificado" stroke="#64748b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="actual" name="Ejecutado Real" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Side Stats */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Resumen Financiero</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-end border-b pb-2">
                                        <span className="text-slate-500 text-sm">Presupuesto Vigente</span>
                                        <span className="text-lg font-bold text-slate-900">{formatCurrency(project.budget.total)}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b pb-2">
                                        <span className="text-slate-500 text-sm">Costo Real a la Fecha</span>
                                        <span className="text-lg font-bold text-primary">{formatCurrency(project.budget.executed)}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-2">
                                        <span className="text-slate-500 text-sm">Desviación</span>
                                        <span className="text-lg font-bold text-danger">-2.4%</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Facturación por Item</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[200px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={financialData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                                <XAxis type="number" hide />
                                                <YAxis type="category" dataKey="name" width={100} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                                <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                                <Bar dataKey="executed" name="Ejecutado" fill="#0f172a" radius={[0, 4, 4, 0]} barSize={20} />
                                                <Bar dataKey="budget" name="Presupuesto" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Mid Row: Invoices & POs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Invoices List */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileCheck className="h-5 w-5 text-slate-500" />
                                    <CardTitle>Últimas Facturas (ERP)</CardTitle>
                                </div>
                                <Button variant="ghost" size="sm" className="text-xs">Ver Todo</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                            <tr>
                                                <th className="px-4 py-2">N° / Prov</th>
                                                <th className="px-4 py-2 text-right">Monto</th>
                                                <th className="px-4 py-2 text-right">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoices.map((inv) => (
                                                <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                    <td className="px-4 py-3">
                                                        <div className="font-medium text-slate-900">{inv.id}</div>
                                                        <div className="text-xs text-slate-500 truncate max-w-[150px]">{inv.provider}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-medium">
                                                        {formatCurrency(inv.amount)}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'destructive' : 'secondary'} className="text-[10px] px-1.5 py-0 h-5">
                                                            {inv.status}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Purchase Orders List */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5 text-slate-500" />
                                    <CardTitle>Órdenes de Compra</CardTitle>
                                </div>
                                <Button variant="ghost" size="sm" className="text-xs">Ver Todo</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                            <tr>
                                                <th className="px-4 py-2">OC / Prov</th>
                                                <th className="px-4 py-2 text-right">Monto</th>
                                                <th className="px-4 py-2 text-right">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseOrders.map((po) => (
                                                <tr key={po.id} className="border-b border-slate-100 hover:bg-slate-50">
                                                    <td className="px-4 py-3">
                                                        <div className="font-medium text-slate-900">{po.id}</div>
                                                        <div className="text-xs text-slate-500 truncate max-w-[150px]">{po.provider}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-medium">
                                                        {formatCurrency(po.amount)}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <Badge variant={po.status === 'approved' ? 'success' : 'warning'} className="text-[10px] px-1.5 py-0 h-5">
                                                            {po.status === 'approved' ? 'Aprobada' : 'Pendiente'}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Row: Expenses & Vouchers & Contractors */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cash Expenses & Petty Cash */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-slate-500" />
                                    <CardTitle>Gastos / Caja Chica</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {expenses.map((exp) => (
                                    <div key={exp.id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-medium text-slate-900">{exp.type}</div>
                                            <div className="text-xs text-slate-500">{exp.user}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-slate-700">{formatCurrency(exp.amount)}</div>
                                            <div className="text-[10px] text-slate-400">{exp.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Accounting Vouchers */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileSpreadsheet className="h-5 w-5 text-slate-500" />
                                    <CardTitle>Comprobantes</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {vouchers.map((v) => (
                                    <div key={v.id} className="flex items-center justify-between text-sm border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-medium text-slate-900">{v.id}</div>
                                            <div className="text-xs text-slate-500 truncate max-w-[180px]">{v.description}</div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="outline" className="text-[10px] h-5">{v.type}</Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Contractors List */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-slate-500" />
                                    <CardTitle>Subcontratistas</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {contractors.map((cont) => (
                                        <div key={cont.id} className="flex items-center justify-between p-2 border border-slate-100 rounded-lg bg-slate-50/50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {cont.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900 text-sm truncate max-w-[120px]">{cont.name}</div>
                                                    <div className="text-xs text-slate-500">{cont.role}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {cont.status === 'warning' ? (
                                                    <AlertTriangle className="h-4 w-4 text-warning" />
                                                ) : (
                                                    <FileCheck className="h-4 w-4 text-accent" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {activeTab === 'field' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Estado de Partidas (Drill-down)</CardTitle>
                            <p className="text-sm text-slate-500">Haz clic en una partida para ver detalle de ERP</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {progressItems.map((item) => (
                                    <div key={item.id} className="group flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-all cursor-pointer">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-slate-900 group-hover:text-primary transition-colors">{item.name}</h4>
                                            <div className="text-xs text-slate-500 mt-1">ID Unysoft: #{item.id} • Total: {item.total} {item.unit}</div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="min-w-[100px] text-right">
                                                <div className="text-sm font-bold text-slate-700">{Math.round((item.executed / item.total) * 100)}%</div>
                                                <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                                                    <div
                                                        className={`h-1.5 rounded-full ${item.status === 'completed' ? 'bg-success' :
                                                            item.status === 'delayed' ? 'bg-danger' : 'bg-primary'
                                                            }`}
                                                        style={{ width: `${(item.executed / item.total) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <Badge variant={item.status === 'completed' ? 'success' : item.status === 'delayed' ? 'destructive' : 'secondary'}>
                                                {item.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Galería de Avance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-300 transition-colors cursor-pointer">
                                        <Camera className="h-6 w-6" />
                                    </div>
                                    <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-300 transition-colors cursor-pointer">
                                        <span className="text-xs">Losa P12</span>
                                    </div>
                                    <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-300 transition-colors cursor-pointer">
                                        <span className="text-xs">Hormigonado</span>
                                    </div>
                                    <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 cursor-pointer hover:border-primary hover:text-primary">
                                        <span className="text-xs font-medium text-center">+ Subir Foto</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-4" variant="outline">Ver Galería Completa</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
