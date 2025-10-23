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

const EmployeesContext = createContext<{
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}>({
  employees: [],
  setEmployees: () => {},
});

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("employees") as string);
    } catch {
      return [];
    }
  });

  // à chaque modification du tableau employees il est poussé en local storage
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
}

// hooks custom
export function useEmployees() {
  return useContext(EmployeesContext);
}
