export enum UserType {
  CUSTOMER = 'Customer',
  EMPLOYEE = 'Employee',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended',
  DELETED = 'Deleted',
}

export enum CustomerType {
  NORMAL = 'Normal',
  PREMIUM = 'Premium',
}

export enum MaritalStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
}

export enum EmploymentStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On-Leave',
  RESIGNED = 'Resigned',
  TERMINATED = 'Terminated',
}

export enum EmploymentType {
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}

export enum PerformanceRating {
  EXCELLENT = 'Excellent',
  GOOD = 'Good',
  AVERAGE = 'Average',
  BELOW_AVERAGE = 'Below-Average',
  POOR = 'Poor',
}

export enum BranchStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ClOSED = 'Closed',
}

export enum AccountStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ClOSED = 'Closed',
  DORMANT = 'Dormant',
}

export enum TransactionStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  REVERSED = 'Reversed',
}

export enum CardStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  LOST = 'Lost',
  STOLEN = 'Stolen',
  SUSPENDED = 'Suspended',
}

export enum Permissions {
  // Users
  USERS_CREATE = 'users:create',
  USERS_READ = 'users:read',
  USERS_UPDATE = 'users:update',
  USERS_DELETE = 'users:delete',
  USERS_LIST = 'users:list',

  // Employees
  EMPLOYEES_CREATE = 'employees:create',
  EMPLOYEES_READ = 'employees:read',
  EMPLOYEES_UPDATE = 'employees:update',
  EMPLOYEES_DELETE = 'employees:delete',
  EMPLOYEES_LIST = 'employees:list',

  // Customers
  CUSTOMERS_CREATE = 'customers:create',
  CUSTOMERS_READ = 'customers:read',
  CUSTOMERS_UPDATE = 'customers:update',
  CUSTOMERS_DELETE = 'customers:delete',
  CUSTOMERS_LIST = 'customers:list',

  // Accounts
  ACCOUNTS_CREATE = 'accounts:create',
  ACCOUNTS_READ = 'accounts:read',
  ACCOUNTS_UPDATE = 'accounts:update',
  ACCOUNTS_DELETE = 'accounts:delete',
  ACCOUNTS_LIST = 'accounts:list',

  // Transactions
  TRANSACTIONS_CREATE = 'transactions:create',
  TRANSACTIONS_READ = 'transactions:read',
  TRANSACTIONS_UPDATE = 'transactions:update',
  TRANSACTIONS_DELETE = 'transactions:delete',
  TRANSACTIONS_LIST = 'transactions:list',

  // Cards
  CARDS_CREATE = 'cards:create',
  CARDS_READ = 'cards:read',
  CARDS_UPDATE = 'cards:update',
  CARDS_DELETE = 'cards:delete',
  CARDS_LIST = 'cards:list',

  // Loans
  LOANS_CREATE = 'loans:create',
  LOANS_READ = 'loans:read',
  LOANS_UPDATE = 'loans:update',
  LOANS_DELETE = 'loans:delete',
  LOANS_LIST = 'loans:list',

  // Permissions and Groups
  PERMISSIONS_MANAGE = 'permissions:manage',
  GROUPS_MANAGE = 'groups:manage',
}
