/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react';
import Button from "../Button/Button";
import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";


export const SimpleForm = ({onSubmit, buttonText, inputText, inputName, isLoading}) => {
    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.elements);
        const input = event.target.elements[inputName];

        onSubmit({
            [inputName]: input.value
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
                <label htmlFor={inputName}>{inputText}</label>
                <Input id={inputName} />
            </div>
            <div>
                <Button type="submit">
                    {isLoading ? <Spinner/> : buttonText}
                </Button>
            </div>
        </form>
    )
};

export default SimpleForm;
