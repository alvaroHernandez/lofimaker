/** @jsx jsx */
import {jsx} from '@emotion/core';
import {DialogContent, DialogOverlay} from '@reach/dialog';
import React, {Fragment, useState} from 'react';
import {save} from '../../clients/LofiClient';
import {usePlayers} from '../../contexts/PlayersContext';
import {useImage} from '../../contexts/ImageContext';
import Input from '../Input/Input';
import {useAsync} from '../../hooks/useAsync';
import Spinner from '../Spinner/Spinner';
import {darker, light, lighter} from '../../styles/colors';
import {Section} from '../Layout/Layout';
import Button from '../Button/Button';
import {Link} from 'react-router-dom';

function SaveLoFiModal({setIsDialogOpen, isDialogOpen}) {
  const {serialize} = usePlayers();
  const {getImage, getFilter} = useImage();
  const {run, isLoading, isSuccess, isError, error, setError} = useAsync();
  const [author, setAuthor] = useState();
  const [name, setName] = useState();

  const saveLoFiHandler = async event => {
    event.preventDefault();
    const result = {
      author: author,
      name: name,
      players: serialize(),
      image: {url: getImage(), filter: getFilter()},
    };
    if (result.players.length > 0) {
      run(save(result));
    } else {
      setError({
        message:
          'Error trying to share an empty lo-fi, please add some tracks first :)',
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <DialogOverlay
      onDismiss={closeDialog}
      aria-label="share lofi"
      isOpen={isDialogOpen}
      style={{zIndex: '1', background: 'hsla(0, 0%, 0%, 0.9)'}}
    >
      <DialogContent
        aria-label={'share lofi content'}
        style={{
          background: darker,
          width: '50%',
          padding: '2em',
        }}
      >
        <Section>
          <h1>Share your creation with the world!</h1>
        </Section>
        <Section>
          {isSuccess ? (
            <div css={{color: light}}>
              <p>
                All good!, <Link css={{color: lighter}} to={'/gallery'}>go to the gallery</Link>
              </p>
            </div>
          ) : (
            <Fragment>
              <form onSubmit={saveLoFiHandler}>
                <Input
                  placeholder="super mega lofi..."
                  id="name"
                  type="text"
                  css={{width: '100%', marginBottom: '2em'}}
                  onChange={e => setName(e.target.value)}
                />
                <label htmlFor="author">Author:</label>
                <Input
                  placeholder="your name..."
                  id="author"
                  type="text"
                  css={{width: '100%', marginBottom: '2em'}}
                  onChange={e => setAuthor(e.target.value)}
                />
                <label htmlFor="name">Lo-fi name:</label>
                <Button
                  disabled={!author || !name}
                  type="submit"
                  css={{
                    width: '100%',
                  }}
                >
                  {isLoading ? <Spinner /> : 'Share Lo-fi'}
                </Button>
              </form>
              {isError ? (
                <div css={{color: light}}>
                  <pre>{error.message}</pre>
                </div>
              ) : null}
            </Fragment>
          )}
        </Section>
      </DialogContent>
    </DialogOverlay>
  );
}

export default SaveLoFiModal;
