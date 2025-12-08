export type UserRole = 'User' | 'Reviewer' | 'Approver' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  office?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

