interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  tradeRole?: string;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
