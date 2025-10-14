import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Tipos para el estado de la aplicación
export interface JobPosition {
  id: number;
  title: string;
  department: string;
  description?: string;
  status: "Activo" | "Borrador" | "Archivado";
  processStatus?: "No Iniciado" | "Activo" | "Cerrado";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  role: "consultor" | "empresario" | "empleado" | "gestor";
  avatar?: string;
  phone?: string;
  startDate?: Date;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  employees: Employee[];
}

// Estado de la aplicación
interface AppState {
  // Estado de carga
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Puestos de trabajo
  jobPositions: JobPosition[];
  addJobPosition: (position: Omit<JobPosition, 'id'>) => void;
  updateJobPosition: (id: number, updates: Partial<JobPosition>) => void;
  deleteJobPosition: (id: number) => void;
  setJobPositions: (positions: JobPosition[]) => void;

  // Empleados
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  setEmployees: (employees: Employee[]) => void;

  // Configuración de la aplicación
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Datos de la empresa
  company: Company | null;
  setCompany: (company: Company) => void;

  // Funciones de utilidad
  reset: () => void;
}

const initialState = {
  isLoading: false,
  jobPositions: [],
  employees: [],
  sidebarCollapsed: false,
  company: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Loading
      setLoading: (loading) => set({ isLoading: loading }),

      // Job Positions
      addJobPosition: (position) => {
        const newPosition: JobPosition = {
          ...position,
          id: Date.now(), // Temporal, en producción sería generado por Firestore
        };
        set((state) => ({
          jobPositions: [newPosition, ...state.jobPositions],
        }));
      },

      updateJobPosition: (id, updates) =>
        set((state) => ({
          jobPositions: state.jobPositions.map((pos) =>
            pos.id === id ? { ...pos, ...updates, updatedAt: new Date() } : pos
          ),
        })),

      deleteJobPosition: (id) =>
        set((state) => ({
          jobPositions: state.jobPositions.filter((pos) => pos.id !== id),
        })),

      setJobPositions: (positions) => set({ jobPositions: positions }),

      // Employees
      addEmployee: (employee) =>
        set((state) => ({
          employees: [...state.employees, employee],
        })),

      updateEmployee: (id, updates) =>
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id ? { ...emp, ...updates } : emp
          ),
        })),

      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
        })),

      setEmployees: (employees) => set({ employees }),

      // UI State
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Company
      setCompany: (company) => set({ company }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage', // nombre para localStorage
      storage: createJSONStorage(() => localStorage),
      // Solo persistir ciertos estados, no el loading
      partialize: (state) => ({
        jobPositions: state.jobPositions,
        employees: state.employees,
        sidebarCollapsed: state.sidebarCollapsed,
        company: state.company,
      }),
    }
  )
);