import React from "react";

export const File = ({ data: { _id, path }}) => (
    <div>
        <div>
            <img src={path} alt={path} />
        </div>
    </div>
);