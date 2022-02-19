/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import { InfoBlock, ShowPageWrapper } from '../components/show/Show.styled';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/custom-hooks';

const Show = () => {
  const { id } = useParams();

  const { show, isLoading, error } = useShow(id);
  // extracted logic to the custom hook so that we can use this one line to get this show

  if (isLoading) {
    return <div>Being Loading</div>;
  }

  if (error) {
    return <div>Error occured</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
