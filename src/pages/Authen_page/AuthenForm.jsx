import React from "react";

const AuthenForm = ({ children, subtitle, logoSrc = "images/Screenshot_2025-05-27_080730-removebg-preview.png",
   imageSrc = "images/hinh-anh-mam-non_23202317.jpg", cssClass = "login-container" }) => (
  <div className="auth-page">
    <div className={cssClass}>
      <div className="login-image-section">
        <img src={imageSrc} alt="Healthcare" className="login-image" />
        <div className="image-overlay"></div>
      </div>
      <div className="login-form-section">
        <div className="form-wrapper">
          <img src={logoSrc} alt="Logo" />
          {subtitle && <p className="subtitle welcome-text">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default AuthenForm; 