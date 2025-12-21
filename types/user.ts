export type UserRole = 'Author' | 'Reviewer' | 'Approver' | 'Admin';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string; // Display name
  nameEn: string;
  nameBn: string;
  email: string;
  role: UserRole;
  designationEn: string;
  designationBn: string;
  officeEn: string;
  officeBn: string;
  avatarId?: number; // 1 to 10
  status: UserStatus;
  dateJoined: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

