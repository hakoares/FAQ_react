import React from "react";

const Button = ({ onClick, title }) => (
    <div>
        <button className="mx-2 btn btn-sm btn-outline-dark" onClick={onClick}>{title}</button>
    </div>
)

export default Button;