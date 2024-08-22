export type Role = 'Admin' | 'User' | 'Company';

export const roles: Record<Role, string[]> = {
  Admin: ['viewDashboard', 'manageUsers', 'viewReports'],
  User: ['viewDashboard'],
  Company: ['viewDashboard'],
};
