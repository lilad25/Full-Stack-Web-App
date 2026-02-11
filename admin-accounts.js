// ==========================================
// ACCOUNTS ADMIN MODULE
// ==========================================

function renderAccounts() {
    if (window.db.accounts.length === 0) {
        document.getElementById('accounts-table').innerHTML = `
            <p class="text-muted">No accounts yet.</p>
        `;
        return;
    }
    
    let html = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Verified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    window.db.accounts.forEach(acc => {
        const isCurrentUser = acc.id === currentUser?.id;
        html += `
            <tr ${isCurrentUser ? 'class="table-info"' : ''}>
                <td>
                    ${acc.firstName} ${acc.lastName}
                    ${isCurrentUser ? '<span class="badge bg-info ms-2">You</span>' : ''}
                </td>
                <td>${acc.email}</td>
                <td>
                    <span class="badge ${acc.role === 'Admin' ? 'bg-danger' : 'bg-secondary'}">
                        ${acc.role}
                    </span>
                </td>
                <td>
                    ${acc.verified 
                        ? '<i class="bi bi-check-circle-fill text-success"></i> Verified' 
                        : '<i class="bi bi-x-circle-fill text-danger"></i> Not Verified'}
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editAccount('${acc.id}')">
                        <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="resetPassword('${acc.id}')">
                        <i class="bi bi-key"></i> Reset PW
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAccount('${acc.id}')" 
                        ${isCurrentUser ? 'disabled' : ''}>
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
        <div class="alert alert-info mt-3">
            <i class="bi bi-info-circle"></i> 
            <strong>Note:</strong> You cannot delete your own account. Admin accounts have full access to all features.
        </div>
    `;
    document.getElementById('accounts-table').innerHTML = html;
}

function openAccountModal(id = null) {
    const form = document.getElementById('account-form');
    form.reset();
    
    if (id) {
        const acc = window.db.accounts.find(a => a.id === id);
        if (acc) {
            form.querySelector('[name="id"]').value = acc.id;
            form.querySelector('[name="firstName"]').value = acc.firstName;
            form.querySelector('[name="lastName"]').value = acc.lastName;
            form.querySelector('[name="email"]').value = acc.email;
            form.querySelector('[name="role"]').value = acc.role;
            form.querySelector('[name="verified"]').checked = acc.verified;
            form.querySelector('[name="password"]').removeAttribute('required');
            form.querySelector('[name="password"]').placeholder = 'Leave blank to keep current';
            document.querySelector('#accountModal .modal-title').textContent = 'Edit Account';
        }
    } else {
        form.querySelector('[name="password"]').setAttribute('required', 'required');
        form.querySelector('[name="password"]').placeholder = 'Minimum 6 characters';
        document.querySelector('#accountModal .modal-title').textContent = 'Add Account';
    }
    
    accountModal.show();
}

function editAccount(id) {
    openAccountModal(id);
}

function resetPassword(id) {
    const newPassword = prompt('Enter new password (minimum 6 characters):');
    if (!newPassword) return;
    
    if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters', 'danger');
        return;
    }
    
    const acc = window.db.accounts.find(a => a.id === id);
    if (acc) {
        acc.password = newPassword;
        saveToStorage();
        showToast('Password reset successfully', 'success');
        
        // If resetting own password, show additional message
        if (acc.id === currentUser?.id) {
            showToast('Your password has been changed. Please remember it for next login.', 'info');
        }
    }
}

function deleteAccount(id) {
    if (id === currentUser?.id) {
        showToast('Cannot delete your own account', 'danger');
        return;
    }
    
    const acc = window.db.accounts.find(a => a.id === id);
    if (!acc) return;
    
    // Check if account has associated employee record
    const hasEmployee = window.db.employees.some(e => e.userId === id);
    
    let confirmMessage = `Are you sure you want to delete the account for ${acc.firstName} ${acc.lastName}?`;
    if (hasEmployee) {
        confirmMessage += '\n\nWarning: This account has an associated employee record which will also need to be managed separately.';
    }
    
    if (confirm(confirmMessage)) {
        window.db.accounts = window.db.accounts.filter(a => a.id !== id);
        saveToStorage();
        showToast('Account deleted successfully', 'success');
        renderAccounts();
    }
}
