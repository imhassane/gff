import React from "react";
import { FormattedDate as Date } from "./utility";

export const Reader = ({ data: { email, unsuscribed, createdAt }}) => (
    <tr>
        <td><span className="uk-text-meta">{email}</span></td>
        <td><span className="uk-text-disabled">{ unsuscribed ? "Non" : "Oui" }</span></td>
        <td><Date date={createdAt} /></td>
    </tr>
);
