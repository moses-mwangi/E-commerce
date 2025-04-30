interface User {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  telephone: number;
  password?: string;
  tradeRole?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  createdAt?: string;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  passwordReset: {
    requestStatus: "idle" | "loading" | "succeeded" | "failed";
    validationStatus: "idle" | "loading" | "succeeded" | "failed";
    resetStatus: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
}
