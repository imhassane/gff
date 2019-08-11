import React from "react";

export const PostFileUploadForm = ({ onFileUpload }) => {
    let uploadedFile = null;
    return (
        <form encType="multipart/form-data">
            <div className="uk-margin">
                <span className="uk-text-middle">Choisir une image</span>
                <div >
                    <div className="uk-margin">
                        <input type="file" onChange={ ({ target: { files: [file] } }) => uploadedFile = file } />
                    </div>
                    <input type="button" value="Ajouter le fichier" onClick={ _ => onFileUpload(uploadedFile) } />
                </div>
            </div>
        </form>
    );
}

export const PostFileUploadResume = ({ data }) => (
    <div>
        <div>
            <img src={data.location} alt={data.key} />
        </div>
        <div>
            <span className="uk-text-meta">{data.location}</span>
        </div>
    </div>
);