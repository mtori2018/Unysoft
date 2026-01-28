export const projects = [
    {
        id: 1,
        name: "Edificio Alto Las Condes",
        location: "Santiago, RM",
        progress: 78,
        scheduledProgress: 82,
        status: "warning", // on time, warning, delayed
        budget: {
            total: 4500000000,
            executed: 3510000000,
            currency: "CLP"
        },
        startDate: "2024-03-01",
        endDate: "2025-12-15"
    },
    {
        id: 2,
        name: "Puente Maipo - Ampliación",
        location: "Buin, RM",
        progress: 45,
        scheduledProgress: 42,
        status: "success",
        budget: {
            total: 8200000000,
            executed: 3690000000,
            currency: "CLP"
        },
        startDate: "2024-06-15",
        endDate: "2026-03-30"
    },
    {
        id: 3,
        name: "Hospital Provincial Melipilla",
        location: "Melipilla, RM",
        progress: 92,
        scheduledProgress: 98,
        status: "danger",
        budget: {
            total: 12500000000,
            executed: 11800000000,
            currency: "CLP"
        },
        startDate: "2023-01-10",
        endDate: "2025-02-28"
    },
    {
        id: 4,
        name: "Parque Eólico Loa",
        location: "Calama, II Región",
        progress: 15,
        scheduledProgress: 15,
        status: "success",
        budget: {
            total: 15000000000,
            executed: 2250000000,
            currency: "CLP"
        },
        startDate: "2024-09-01",
        endDate: "2026-09-01"
    }
];

// S-Curve Data (Cumulative Cost vs Baseline)
export const sCurveData = [
    { month: 'Mar', baseline: 0, actual: 0 },
    { month: 'Abr', baseline: 5, actual: 4 },
    { month: 'May', baseline: 12, actual: 10 },
    { month: 'Jun', baseline: 22, actual: 25 }, // ahead
    { month: 'Jul', baseline: 35, actual: 38 },
    { month: 'Ago', baseline: 48, actual: 50 },
    { month: 'Sep', baseline: 60, actual: 61 },
    { month: 'Oct', baseline: 72, actual: 70 }, // slipping
    { month: 'Nov', baseline: 82, actual: 78 }, // delayed
    { month: 'Dic', baseline: 90, actual: null }, // future
    { month: 'Ene', baseline: 96, actual: null },
    { month: 'Feb', baseline: 100, actual: null },
];

export const financialData = [
    { name: 'Obra Gruesa', budget: 120000000, executed: 115000000 },
    { name: 'Terminaciones', budget: 85000000, executed: 40000000 },
    { name: 'Instalaciones', budget: 95000000, executed: 60000000 },
    { name: 'Gastos Generales', budget: 45000000, executed: 48000000 }, // overbudget
];

export const progressItems = [
    { id: 101, name: "Hormigonado Losa Piso 12", unit: "m3", total: 120, executed: 120, status: "completed" },
    { id: 102, name: "Enfierradura Muros Piso 13", unit: "kg", total: 4500, executed: 3800, status: "in-progress" },
    { id: 103, name: "Instalación Sanitaria - Verticales", unit: "ml", total: 200, executed: 45, status: "delayed" },
    { id: 104, name: "Montaje Estructura Metálica", unit: "ton", total: 15, executed: 0, status: "pending" },
];

export const invoices = [
    { id: "FAC-001", provider: "Cementos Melón S.A.", amount: 15400000, date: "2024-10-15", status: "paid", dueDate: "2024-11-15" },
    { id: "FAC-002", provider: "Aceros AZA", amount: 42000000, date: "2024-10-20", status: "pending", dueDate: "2024-11-20" },
    { id: "FAC-003", provider: "Ingeniería y Construcción Ltda.", amount: 8500000, date: "2024-10-25", status: "overdue", dueDate: "2024-10-30" },
    { id: "FAC-004", provider: "Rental Maquinarias", amount: 2300000, date: "2024-11-01", status: "pending", dueDate: "2024-12-01" },
];

export const contractors = [
    { id: 1, name: "Instalaciones Sanitarias Hnos.", role: "Sanitario", status: "compliant", workers: 12 },
    { id: 2, name: "Electricidad Industrial SpA", role: "Eléctrico", status: "warning", workers: 8, issue: "Doc. Previsional Pendiente" },
    { id: 3, name: "Climatización Total", role: "HVAC", status: "compliant", workers: 5 },
];

export const projectAlerts = [
    { id: 1, severity: "critical", message: "Atraso crítico en partida: Losa Piso 12", date: "Hace 2 días" },
    { id: 2, severity: "warning", message: "Factura impaga a proveedor clave (Aceros AZA)", date: "Hace 5 horas" },
    { id: 3, severity: "info", message: "Visita de inspección técnica programada para mañana", date: "Hoy" },
];

export const purchaseOrders = [
    { id: "OC-4021", provider: "Sodimac Profesional", amount: 450000, date: "2024-11-05", status: "approved" },
    { id: "OC-4022", provider: "Construmart", amount: 1250000, date: "2024-11-06", status: "pending" },
    { id: "OC-4023", provider: "Hormigones Transex", amount: 8900000, date: "2024-11-07", status: "approved" },
];

export const expenses = [
    { id: 1, type: "Combustible", amount: 45000, user: "Juan Pérez (Capataz)", date: "2024-11-08" },
    { id: 2, type: "Caja Chica", amount: 12500, user: "Oficina Técnica", date: "2024-11-08", memo: "Café/Insumos" },
    { id: 3, type: "Combustible", amount: 52000, user: "Camioneta 4x4", date: "2024-11-09" },
];

export const vouchers = [
    { id: "CB-2024-901", type: "Egreso", description: "Pago Factura FAC-001 Melón", date: "2024-11-01", status: "posted" },
    { id: "CB-2024-902", type: "Traspaso", description: "Reclasificación Costo Mano de Obra", date: "2024-11-02", status: "posted" },
    { id: "CB-2024-903", type: "Ingreso", description: "Devolución Garantía", date: "2024-11-03", status: "draft" },
];
