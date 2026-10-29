export const Loader = () => {
  return <p className="loader">Loading...</p>;
};

export const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
};

export const SelectedMovie = ({ selectedId }) => {
  return <div className="details">{selectedId}</div>;
};
