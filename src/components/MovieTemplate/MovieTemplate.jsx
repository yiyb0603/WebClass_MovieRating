import React, { useCallback, useState } from 'react';
import MovieForm from 'components/MovieForm';
import './MovieTemplate.scss';

export const initialState = {
  writer: '',
  title: '',
  contents: '',
  rating: 0,
};

const MovieTemplate = () => {
  const [request, setRequest] = useState(initialState);
  const [movieList, setMovieList] = useState([]);

  const onModify = useCallback((request) => {
    setRequest(request);
  }, []);

  return (
    <div>
      <MovieForm
        request={request}
        setRequest={setRequest}
        setMovieList={setMovieList}
      />

      {
        movieList.map(({ idx, title, contents, rating, writer }) => (
          <div key={idx}>
            <div>제목: {title}</div>
            <div>내용: {contents}</div>
            <div>작성자: {writer}</div>
            <div>별점: {rating}</div>

            <div onClick={() => onModify({ idx, title, contents, rating, writer })}>수정하기</div>
          </div>
        ))
      }
    </div>
  );
};

export default MovieTemplate;
