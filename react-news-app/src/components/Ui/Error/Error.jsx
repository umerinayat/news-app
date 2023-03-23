const Error = ({ errors }) => {
  return errors.map((errMessage, index) => (
    <p key={`err-${index}`} className="error-message">{errMessage}</p>
  ));
};

export default Error;
