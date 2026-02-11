// ==========================================
// DEPARTMENTS ADMIN MODULE
// ==========================================

function renderDepartments() {
    if (window.db.departments.length === 0) {
        document.getElementById('departments-table').innerHTML = `
            <p class="text-muted">No departments yet.</p>
        `;
        return;
    }
    
    let html = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Employees</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    window.db.departments.forEach(dept => {
        const empCount = window.db.employees.filter(e => e.departmentId === dept.id).length;
        html += `
            <tr>
                <td><strong>${dept.name}</strong></td>
                <td>${dept.description}</td>
                <td><span class="badge bg-primary">${empCount} ${empCount === 1 ? 'employee' : 'employees'}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editDepartment('${dept.id}')">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteDepartment('${dept.id}')" ${empCount > 0 ? 'disabled' : ''}>
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('departments-table').innerHTML = html;
}

function addDepartment() {
    const name = prompt('Enter department name:');
    if (!name) return;
    
    const description = prompt('Enter department description:');
    if (!description) return;
    
    const department = {
        id: 'dept_' + Date.now(),
        name: name,
        description: description
    };
    
    window.db.departments.push(department);
    saveToStorage();
    showToast('Department added successfully', 'success');
    renderDepartments();
}

function editDepartment(id) {
    const dept = window.db.departments.find(d => d.id === id);
    if (!dept) return;
    
    const name = prompt('Enter department name:', dept.name);
    if (!name) return;
    
    const description = prompt('Enter department description:', dept.description);
    if (!description) return;
    
    dept.name = name;
    dept.description = description;
    
    saveToStorage();
    showToast('Department updated successfully', 'success');
    renderDepartments();
}

function deleteDepartment(id) {
    const empCount = window.db.employees.filter(e => e.departmentId === id).length;
    
    if (empCount > 0) {
        showToast('Cannot delete department with employees', 'danger');
        return;
    }
    
    if (confirm('Are you sure you want to delete this department?')) {
        window.db.departments = window.db.departments.filter(d => d.id !== id);
        saveToStorage();
        showToast('Department deleted', 'success');
        renderDepartments();
    }
}
