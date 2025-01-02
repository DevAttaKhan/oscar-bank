import { Session } from "next-auth";
import { UpdateSession } from "next-auth/react";

export interface ClientSession {
  update: UpdateSession;
  data: Session;
  status: "authenticated";
}

export interface ILoginResponse {
  status: boolean;
  path: string;
  statusCode: number;
  result: ILoginResult;
}

export interface ILoginResult {
  token: string;
  refreshToken: string;
  user: IUser;
}

export interface IRefreshToken {
  status: boolean;
  path: string;
  statusCode: number;
  result: {
    token: string;
    refreshToken: string;
  };
}

export interface IUser {
  id: number;
  username?: any;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  dateOfBirth?: any;
  address?: any;
  status: string;
  profileImageUrl?: any;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: Permissions[];
}

export interface IAuthSession extends Omit<ILoginResult, "user">, IUser {
  token: string;
  refreshToken: string;
}

export enum UserType {
  CUSTOMER = "Customer",
  EMPLOYEE = "Employee",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  SUSPENDED = "Suspended",
  DELETED = "Deleted",
}

export enum Permissions {
  // Users
  USERS_CREATE = "users:create",
  USERS_READ = "users:read",
  USERS_UPDATE = "users:update",
  USERS_DELETE = "users:delete",
  USERS_LIST = "users:list",

  // Employees
  EMPLOYEES_CREATE = "employees:create",
  EMPLOYEES_READ = "employees:read",
  EMPLOYEES_UPDATE = "employees:update",
  EMPLOYEES_DELETE = "employees:delete",
  EMPLOYEES_LIST = "employees:list",

  // Customers
  CUSTOMERS_CREATE = "customers:create",
  CUSTOMERS_READ = "customers:read",
  CUSTOMERS_UPDATE = "customers:update",
  CUSTOMERS_DELETE = "customers:delete",
  CUSTOMERS_LIST = "customers:list",

  // Accounts
  ACCOUNTS_CREATE = "accounts:create",
  ACCOUNTS_READ = "accounts:read",
  ACCOUNTS_UPDATE = "accounts:update",
  ACCOUNTS_DELETE = "accounts:delete",
  ACCOUNTS_LIST = "accounts:list",

  // BRANCHES
  BRANCH_CREATE = "branch:create",
  BRANCH_READ = "branch:read",
  BRANCH_UPDATE = "branch:update",
  BRANCH_DELETE = "branch:delete",
  BRANCH_LIST = "branch:list",

  // Transactions
  TRANSACTIONS_CREATE = "transactions:create",
  TRANSACTIONS_READ = "transactions:read",
  TRANSACTIONS_UPDATE = "transactions:update",
  TRANSACTIONS_DELETE = "transactions:delete",
  TRANSACTIONS_LIST = "transactions:list",

  // Cards
  CARDS_CREATE = "cards:create",
  CARDS_READ = "cards:read",
  CARDS_UPDATE = "cards:update",
  CARDS_DELETE = "cards:delete",
  CARDS_LIST = "cards:list",

  // Loans
  LOANS_CREATE = "loans:create",
  LOANS_READ = "loans:read",
  LOANS_UPDATE = "loans:update",
  LOANS_DELETE = "loans:delete",
  LOANS_LIST = "loans:list",

  // Designation
  DESIGNATION_CREATE = "designation:create",
  DESIGNATION_READ = "designation:read",
  DESIGNATION_UPDATE = "designation:update",
  DESIGNATION_DELETE = "designation:delete",
  DESIGNATION_LIST = "designation:list",

  // Permissions and Groups
  PERMISSIONS_MANAGE = "permissions:manage",
  GROUPS_MANAGE = "groups:manage",
}
