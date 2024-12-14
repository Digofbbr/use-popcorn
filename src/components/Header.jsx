import React, { useState } from "react";

function Header({ children }) {
	return <nav className="nav-bar">{children}</nav>;
}

export default Header;
