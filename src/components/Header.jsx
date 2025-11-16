import "./Header.css";
import logo from "../assets/Buen.png";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo-img" />
              <span className="smiley">:)</span>
            </div>
          </div>
    </header>
  );
}

export default Header;
