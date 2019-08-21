import React from "react";

export const Title = ({ message }) => <h2>{ message }</h2>;

export const Empty = ({ message }) => (
    <div>
        <p>{ message }</p>
    </div>
);