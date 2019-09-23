import React from "react";

export const Error = ({ message }) => (
    <div className="uk-alert-danger" uk-alert="true">
        <p>{ message }</p>
    </div>
);

export const Success = ({ message }) => (
    <div className="uk-alert-success" uk-alert="true">
        <p>{ message }</p>
    </div>
);

export const Messages = ({ success, error }) => (
    <>
        { success && <Success message={success} />}
        { error && <Error message={error} />}
    </>
);