import React from "react";

export const Title = ({ message }) => (
    <>
        <h3>{ message }</h3>
        <hr />
    </>
);

export const Empty = ({ message }) => (
    <div>
        <p>{ message }</p>
    </div>
);