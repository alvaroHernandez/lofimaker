import * as React from 'react';

export const UrlForm = ({onSubmit, buttonText}) => {
    function handleSubmit(event) {
        event.preventDefault();
        const { url } = event.target.elements;

        onSubmit({
            url: url.value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="url">Username</label>
            <input id="url" />
            </div>
            <div>
                <button type="submit">{buttonText}</button>
            </div>
        </form>
    )
};

export default UrlForm;
