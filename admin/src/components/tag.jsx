import React from "react";

export const TagFinderForm = ({ onTagNameChange }) => (
    <div>
        <input type="text" className="uk-input uk-width-1-1" onChange={ ({ target: { value } }) => onTagNameChange(value )} />
    </div>
);

export const TagResume = ({ data: { name, _id }, onTagSelect }) => (
    <span onClick={ _ => onTagSelect({ name, _id }) } className="uk-label uk-margin-right-small">{ name }</span>
);