import employeesData from "@/services/mockData/employees.json";

// Create a copy of the data to avoid mutating the original
let employees = [...employeesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const employeeService = {
  async getAll() {
    await delay(300);
    return [...employees];
  },

  async getById(id) {
    await delay(200);
    const employee = employees.find(emp => emp.Id === parseInt(id));
    if (!employee) {
      throw new Error("Employee not found");
    }
    return { ...employee };
  },

  async create(employeeData) {
    await delay(400);
    const maxId = Math.max(...employees.map(emp => emp.Id));
    const newEmployee = {
      ...employeeData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    employees.push(newEmployee);
    return { ...newEmployee };
  },

  async update(id, employeeData) {
    await delay(400);
    const index = employees.findIndex(emp => emp.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Employee not found");
    }
    
    const updatedEmployee = {
      ...employees[index],
      ...employeeData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    employees[index] = updatedEmployee;
    return { ...updatedEmployee };
  },

  async delete(id) {
    await delay(300);
    const index = employees.findIndex(emp => emp.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Employee not found");
    }
    
    const deletedEmployee = employees[index];
    employees.splice(index, 1);
    return { ...deletedEmployee };
  }
};