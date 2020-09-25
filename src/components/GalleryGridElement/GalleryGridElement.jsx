/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ImageGridItem from '../ImageGridItem/ImageGridItem';
import CoverImage from '../CoverImage/CoverImage';
import {
  ButtonContainer,
  ImageGridElementButton,
} from '../ImageGridElementButton/ImageGridElementButton';
import ImageGridElementInfo from '../ImageGridElementInfo/ImageGridElementInfo';
import {alternative, light} from '../../styles/colors';
import {GoPlay} from 'react-icons/go';
import {IconButton} from 'components/Button/Button';
import {Grid} from 'components/Layout/Layout';
import {vote} from 'clients/LofiClient';

const GalleryGridElement = ({lofi, elementClickHandler}) => {
  const [votes, setVotes] = useState(lofi.votes);
  const addOneVote = id => {
    vote(id).then(() => {});
    setVotes(votes => votes + 1);
  };

  return (
    <ImageGridItem key={lofi.id}>
      <CoverImage
        key={lofi.id}
        alt={'lofi cover'}
        css={{
          '&:hover': {opacity: '0.3'},
        }}
        src={lofi.image.url}
      />
      <ButtonContainer>
        <ImageGridElementButton onClick={() => elementClickHandler(lofi)}>
          <GoPlay />
        </ImageGridElementButton>
      </ButtonContainer>
      <ImageGridElementInfo>
        <span
          css={{
            display: 'block',
          }}
        >
          {lofi.name}
        </span>
        <span
          css={{
            fontSize: '13px',
            display: 'block',
            color: light,
          }}
        >
          by {lofi.author}
        </span>
        <span
          css={{
            fontSize: '13px',
            display: 'block',
            color: alternative,
          }}
        >
          Liked: {votes} times
        </span>
        <Grid
          css={{
            marginTop: '10px',
            fontSize: '12px',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
          }}
        >
          <IconButton onClick={() => addOneVote(lofi.id)}>
            <span role="img" aria-label="Rock">
              🤘
            </span>
          </IconButton>
          <IconButton onClick={() => addOneVote(lofi.id)}>
            <span role="img" aria-label="Headphones">
              🎧
            </span>
          </IconButton>
          <IconButton onClick={() => addOneVote(lofi.id)}>
            <span role="img" aria-label="Guitar">
              🎸
            </span>
          </IconButton>
          <IconButton
            onClick={() => addOneVote(lofi.id)}
          >
            <span role="img" aria-label="Crazy">
              🤪
            </span>
          </IconButton>
        </Grid>
      </ImageGridElementInfo>
    </ImageGridItem>
  );
};

GalleryGridElement.propTypes = {
  lofi: PropTypes.object.isRequired,
  elementClickHandler: PropTypes.func.isRequired,
};

export default GalleryGridElement;
