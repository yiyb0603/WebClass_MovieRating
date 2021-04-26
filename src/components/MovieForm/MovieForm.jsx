import { useCallback, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import classNames from 'classnames';
import { isEmpty } from 'util/isEmpty';
import style from './MovieForm.scss';
import { initialState } from 'components/MovieTemplate/MovieTemplate';

const cx = classNames.bind(style);

const MovieForm = ({
  request,
  setRequest,
  setMovieList,
}) => {
  const onChangeInputs = useCallback(({ target: { name, value } }) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  }, [setRequest]);

  const onChangeRating = useCallback((rating) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      rating,
    }));
  }, [setRequest]);

  const onSubmit = useCallback(() => {
    for (const key of Object.keys(request)) {
      if (isEmpty(request[key])) {
        alert('빈칸없이 입력해주세요');
        return;
      }
    }

    if (request.idx === undefined || request.idx === null) {
      setMovieList((prevMovieList) => ([
        ...prevMovieList,
        {
          ...request,
          idx: prevMovieList[prevMovieList.length - 1] ? prevMovieList[prevMovieList.length - 1].idx + 1 : 0,
        },
      ]));
    } else {
      setMovieList((prevMovieList) => (
        prevMovieList.map((movie) => (
          movie.idx === request.idx ? {...movie, ...request} : movie
        ))
      ));
    }

    setRequest(initialState);
  }, [request, setMovieList, setRequest]);

  useEffect(() => {
    return () => setRequest(initialState);
  }, [setRequest]);

  return (
    <div className={cx('MovieForm')}>
      <div>
        <input
          type='text'
          name='writer'
          value={request.writer}
          onChange={onChangeInputs}
          placeholder='글쓴이 이름 입력'
        />
      </div>

      <div>
        <input
          type='text'
          name='title'
          value={request.title}
          onChange={onChangeInputs}
          placeholder='영화 제목 입력'
        />
      </div>

      <div>
        <textarea
          name='contents'
          value={request.contents}
          onChange={onChangeInputs}
          placeholder='영화 평점 입력'
        ></textarea>
      </div>

      <ReactStars
        count={5}
        value={request.rating}
        onChange={onChangeRating}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />

      <button onClick={onSubmit}>{request.idx ? '수정' : '완료'}</button>
    </div>
  );
};

export default MovieForm;
