// ==========================================
// EMPLOYEES ADMIN MODULE
// ==========================================

function renderEmployees() {
    populateDepartmentSelect();
    
    if (window.db.employees.length === 0) {
        document.getElementById('employees-table').innerHTML = `
            <p class="text-muted">No employees yet. Click "+ Add Employee" to create one.</p>
        `;
        return;
    }
    
    let html = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>User</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Hire Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    window.db.employees.forEach(emp => {
        const dept = window.db.departments.find(d => d.id === emp.departmentId);
        html += `
            <tr>
                <td>${emp.employeeId}</td>
                <td>${emp.userEmail}</td>
                <td>${emp.position}</td>
                <td>${dept ? dept.name : 'N/A'}</td>
                <td>${emp.hireDate}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editEmployee('${emp.id}')">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmployee('${emp.id}')">
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
    document.getElementById('employees-table').innerHTML = html;
}

function openEmployeeModal(id = null) {
    populateDepartmentSelect();
    const form = document.getElementById('employee-form');
    form.reset();
    
    if (id) {
        const emp = window.db.employees.find(e => e.id === id);
        if (emp) {
            form.querySelector('[name="id"]').value = emp.id;
            form.querySelector('[name="employeeId"]').value = emp.employeeId;
            form.querySelector('[name="userEmail"]').value = emp.userEmail;
            form.querySelector('[name="position"]').value = emp.position;
            form.querySelector('[name="departmentId"]').value = emp.departmentId;
            form.querySelector('[name="hireDate"]').value = emp.hireDate;
            document.querySelector('#employeeModal .modal-title').textContent = 'Edit Employee';
        }
    } else {
        document.querySelector('#employeeModal .modal-title').textContent = 'Add Employee';
    }
    
    employeeModal.show();
}

function editEmployee(id) {
    openEmployeeModal(id);
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        window.db.employees = window.db.employees.filter(e => e.id !== id);
        saveToStorage();
        showToast('Employee deleted', 'success');
        renderEmployees();
    }
}

function populateDepartmentSelect() {
    const select = document.getElementById('dept-select');
    select.innerHTML = '<option value="">Select Department</option>';
    window.db.departments.forEach(dept => {
        select.innerHTML += `<option value="${dept.id}">${dept.name}</option>`;
    });
}
