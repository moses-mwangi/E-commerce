// interface UserSliceType {
//   users: UserType[];
//   currentUser: null;
//   isAuthenticated: boolean;
// }

// interface UserType {
//   name: string;
//   email: string;
// }

// export type { UserSliceType, UserType };

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};
