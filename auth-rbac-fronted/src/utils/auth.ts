export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};