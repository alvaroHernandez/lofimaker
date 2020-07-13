/** @jsx jsx */
import {jsx} from '@emotion/core';
import * as React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Spinner from '../Spinner/Spinner';

export const SimpleForm = ({
  onSubmit,
  buttonText,
  inputText,
  inputName,
  isLoading,
  placeholder,
  buttonVariant,
}) => {
  function handleSubmit(event) {
    event.preventDefault();
    const input = event.target.elements[inputName];

    onSubmit({
      [inputName]: input.value,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'grid',
        gridTemplateColumns: '10fr auto',
        gridGap: '0.5em',
        marginBottom: '1em',
      }}
    >
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: inputText ? '1fr 10fr' : '1fr',
          gridGap: '0.5em',
        }}
      >
        {inputText && <label htmlFor={inputName}>{inputText}</label>}
        <Input placeholder={placeholder} id={inputName} />
      </div>
      <div>
        <Button
          variant={buttonVariant ? buttonVariant : 'secondary'}
          type="submit"
        >
          {isLoading ? <Spinner /> : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default SimpleForm;
