const AdminAuxBtns = ({ className }) => {
  return (
    <div className={className}>
      <button
        onClick={() =>
          navigator.clipboard.writeText(
            "https://ballchasing.com/player/steam/76561198136291441"
          )
        }
      >
        Copy BijouBug's URL
      </button>

      <button
        onClick={() =>
          navigator.clipboard.writeText(
            "https://ballchasing.com/player/steam/76561198835242233"
          )
        }
      >
        Copy Tofu's URL
      </button>

      <button
        onClick={() =>
          navigator.clipboard.writeText(
            "https://ballchasing.com/player/epic/b843b77c31e74c6fa970db08f5796805"
          )
        }
      >
        Copy badwifibro's URL
      </button>
    </div>
  );
};

export default AdminAuxBtns;
