import departmentsData from "@/services/mockData/departments.json";

// Create a copy of the data to avoid mutating the original
let departments = [...departmentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const departmentService = {
  async getAll() {
    await delay(250);
    return [...departments];
  },

  async getById(id) {
    await delay(200);
    const department = departments.find(dept => dept.Id === parseInt(id));
    if (!department) {
      throw new Error("Department not found");
    }
    return { ...department };
  },

  async create(departmentData) {
    await delay(400);
    const maxId = Math.max(...departments.map(dept => dept.Id));
    const newDepartment = {
      ...departmentData,
      Id: maxId + 1,
      employeeCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    departments.push(newDepartment);
    return { ...newDepartment };
  },

  async update(id, departmentData) {
    await delay(400);
    const index = departments.findIndex(dept => dept.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Department not found");
    }
    
    const updatedDepartment = {
      ...departments[index],
      ...departmentData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    departments[index] = updatedDepartment;
    return { ...updatedDepartment };
  },

  async delete(id) {
    await delay(300);
    const index = departments.findIndex(dept => dept.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Department not found");
    }
    
    const deletedDepartment = departments[index];
    departments.splice(index, 1);
    return { ...deletedDepartment };
  }
};