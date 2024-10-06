const AdminLoginBtn = () => {
  return (
    <button
      onClick={() =>
        (window.location.href = "http://localhost:3000/users/sign_in")
      }
    >
      Admin Login
    </button>
  );
};

export default AdminLoginBtn;
