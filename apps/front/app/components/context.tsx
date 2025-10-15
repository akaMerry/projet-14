import { createContext, useContext, useEffect, useState } from "react";

export type Employee = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
};

const EmployeesContext = createContext<Employee[]>([]);
const SetEmployeesContext = createContext<React.Dispatch<
  React.SetStateAction<Employee[]>
> | null>(null);

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // si un tableau existe en local storage, met à jour le state de employees avec ce tableau
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  }, []);

  // à chaque modification du tableau employees il est poussé en local storage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeesContext.Provider value={employees}>
      <SetEmployeesContext.Provider value={setEmployees}>
        {children}
      </SetEmployeesContext.Provider>
    </EmployeesContext.Provider>
  );
}

// hooks custom
export function useEmployees() {
  return useContext(EmployeesContext);
}

export function useSetEmployees() {
  const context = useContext(SetEmployeesContext);
  if (!context) throw new Error();
  return context;
}
