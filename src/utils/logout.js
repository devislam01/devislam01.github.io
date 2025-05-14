export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  if (!window.location.pathname.includes("/login")) {
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }
}
