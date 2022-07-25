import "./PasswordSetterBox.scss";

const PasswordSetterBox = ({ rcode }) => {
  return (
    <div className="password-box-screen">
      <div className="password-box">
        <div className="password-box-header">
          <span>
            Room Codes - <span className="rcode">{rcode}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetterBox;
