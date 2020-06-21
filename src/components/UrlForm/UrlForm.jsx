/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react';
import Button from "../Button/Button";
import Input from "../Input/Input";


export const UrlForm = ({onSubmit, buttonText}) => {
    function handleSubmit(event) {
        event.preventDefault();
        const { url } = event.target.elements;

        onSubmit({
            url: url.value
        })
    }

    return (
        <form onSubmit={handleSubmit} css={{
            display: 'grid',
            gridTemplateColumns: '10fr 1fr',
            gridGap: '0.5em',
            marginBottom: '1em',
        }}>
            <div css={{
                display: 'grid',
                gridTemplateColumns: '1fr 10fr',
                gridGap: '0.5em',
            }}>
            <label htmlFor="url">image url</label>
            <Input id="url" />
            </div>
            <div>
                <Button type="submit">{buttonText}</Button>
            </div>
        </form>
    )
};

export default UrlForm;
