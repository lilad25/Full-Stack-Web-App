# Full-Stack App - Frontend Prototype

A complete role-based single-page application (SPA) with authentication, CRUD operations, and request management system.

## 📁 Project Structure

```
fullstack-app/
├── index.html              # Main HTML file with all pages and modals
├── style.css               # All CSS styles and rules
├── script.js               # Core functionality (auth, routing, forms)
├── admin-employees.js      # Employee management (Admin only)
├── admin-departments.js    # Department management (Admin only)
├── admin-accounts.js       # Account management (Admin only)
└── README.md               # This file
```

## 🚀 Getting Started

### Installation

1. **No installation required!** This is a static frontend app.
2. Simply open `index.html` in your browser.

### Default Login Credentials

```
Email: admin@example.com
Password: Password123!
```

## ✨ Features

### Public Features
- ✅ User Registration with email verification (simulated)
- ✅ Login/Logout with session management
- ✅ Client-side routing (hash-based)
- ✅ Role-based UI (Admin/User)

### User Features
- ✅ View Profile
- ✅ Submit Requests (Equipment, Leave, Resources)
- ✅ View My Requests with status tracking
- ✅ Dynamic item management in requests

### Admin Features
- ✅ **Employees Management**
  - Create, Read, Update, Delete employees
  - Link employees to user accounts
  - Assign departments and positions
  
- ✅ **Departments Management**
  - Create, Read, Update, Delete departments
  - View employee count per department
  - Prevent deletion of departments with employees
  
- ✅ **Accounts Management**
  - Create, Read, Update, Delete user accounts
  - Reset user passwords
  - Set roles (Admin/User)
  - Manage email verification status
  - Prevent self-deletion

## 🗂️ File Descriptions

### index.html
Contains all HTML structure including:
- Navigation bar with role-based menu
- Page sections (Home, Register, Login, Profile, etc.)
- Admin pages (Employees, Departments, Accounts)
- Modals for data entry
- User requests page

### style.css
Manages all styling:
- Page visibility controls
- Authentication state classes
- Role-based display rules
- Status badges
- Toast notifications
- Responsive design

### script.js (Core Module)
Main application logic:
- **Data Persistence**: localStorage management
- **Routing**: Hash-based navigation
- **Authentication**: Login, logout, email verification
- **Form Handlers**: Registration, login, requests
- **Profile**: User profile display
- **Utilities**: Toast notifications, helpers

### admin-employees.js
Employee management module:
- `renderEmployees()` - Display employee table
- `openEmployeeModal()` - Open add/edit form
- `editEmployee()` - Edit existing employee
- `deleteEmployee()` - Remove employee
- `populateDepartmentSelect()` - Load department dropdown

### admin-departments.js
Department management module:
- `renderDepartments()` - Display department table
- `addDepartment()` - Create new department
- `editDepartment()` - Update department info
- `deleteDepartment()` - Remove department (if no employees)

### admin-accounts.js
Account management module:
- `renderAccounts()` - Display account table
- `openAccountModal()` - Open add/edit form
- `editAccount()` - Modify account details
- `resetPassword()` - Change user password
- `deleteAccount()` - Remove account (prevent self-deletion)

## 💾 Data Storage

All data is stored in browser's localStorage with key: `ipt_demo_v1`

### Data Structure
```javascript
{
  accounts: [
    {
      id: 'acc_1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'Password123!',
      role: 'Admin',
      verified: true
    }
  ],
  departments: [
    {
      id: 'dept_1',
      name: 'Engineering',
      description: 'Software Development'
    }
  ],
  employees: [
    {
      id: 'emp_1',
      employeeId: 'EMP001',
      userEmail: 'user@example.com',
      userId: 'acc_1',
      position: 'Developer',
      departmentId: 'dept_1',
      hireDate: '2024-01-01'
    }
  ],
  requests: [
    {
      id: 'req_1',
      type: 'Equipment',
      items: [
        { name: 'Laptop', quantity: 1 }
      ],
      status: 'Pending',
      date: '2024-02-11',
      employeeEmail: 'user@example.com'
    }
  ]
}
```

## 🔐 Authentication Flow

1. **Registration**
   - User fills registration form
   - Email duplicate check
   - Account created with `verified: false`
   - Redirect to email verification page

2. **Email Verification (Simulated)**
   - Click "Simulate Email Verification" button
   - Account `verified` set to `true`
   - Redirect to login

3. **Login**
   - Email and password validation
   - Check if account is verified
   - Set `auth_token` in localStorage
   - Update UI based on role

4. **Logout**
   - Clear `auth_token`
   - Reset authentication state
   - Redirect to home page

## 🛣️ Routing

### Public Routes
- `#/` - Home page
- `#/register` - Registration form
- `#/verify-email` - Email verification page
- `#/login` - Login form

### Protected Routes (Require Authentication)
- `#/profile` - User profile
- `#/my-requests` - User's requests

### Admin Routes (Require Admin Role)
- `#/employees` - Employee management
- `#/departments` - Department management
- `#/accounts` - Account management

## 🎨 UI Components

### Navigation Bar
- Displays user name when logged in
- Dropdown menu with contextual links
- Admin-only menu items
- Logout button

### Toast Notifications
Types: `success`, `danger`, `warning`, `info`

Usage:
```javascript
showToast('Message here', 'success');
```

### Modals
- Employee Modal
- Account Modal
- Request Modal

### Tables
- Responsive design
- Striped rows
- Hover effects
- Action buttons

## 🧪 Testing Scenarios

1. **Registration Flow**
   - Register → Verify → Login → View Profile ✓

2. **Admin Operations**
   - Login as admin
   - Create new user account
   - Create employee record
   - Assign to department ✓

3. **User Requests**
   - Login as user
   - Submit request
   - View in "My Requests" ✓

4. **Data Persistence**
   - Make changes
   - Refresh browser
   - Data persists ✓

5. **Access Control**
   - Login as user
   - Try accessing `#/employees`
   - Access denied ✓

## 🔧 Customization

### Adding New Pages
1. Add `<section id="new-page" class="page">` in index.html
2. Update routing in `handleRouting()` in script.js
3. Add navigation link

### Adding New Admin Sections
1. Create new JS file (e.g., `admin-newsection.js`)
2. Add render function
3. Include in index.html before closing body tag
4. Add route and page section

### Modifying Styles
Edit `style.css` to change:
- Colors and themes
- Layout and spacing
- Component styles

## 📝 Notes

- **No Backend**: This is a frontend-only prototype
- **localStorage Limits**: ~5-10MB depending on browser
- **Security**: Passwords stored in plain text (for demo only!)
- **Production**: Would need real backend with proper security

## 🚀 Next Steps (Backend Integration)

When connecting to a real backend:

1. Replace localStorage with API calls
2. Implement real JWT tokens
3. Add proper password hashing
4. Email verification via SMTP
5. Database integration (MySQL/PostgreSQL)
6. Server-side validation
7. Rate limiting
8. HTTPS/SSL

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Author

Created as a learning project for full-stack development fundamentals.

---

**Happy Coding! 🎉**
