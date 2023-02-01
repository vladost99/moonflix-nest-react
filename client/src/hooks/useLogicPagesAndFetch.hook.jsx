import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from 'redux/features/global-loading.slice';
import { toast } from 'react-toastify';

const useLogicPagesAndFetch = ({ api, skipData = 2 }) => {
  const [values, setValues] = useState([]);
  const [filteredValues, setfilteredValues] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const skip = skipData;

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await api();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.length);
        setValues([...response]);
        setfilteredValues([...response].splice(0, skip));
      }
    };

    getData();
  }, [dispatch]);

  const onLoadMore = () => {
    setfilteredValues([...filteredValues, ...[...values].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newReviews = [...values].filter((e) => e._id !== id);
    setValues(newReviews);
    setfilteredValues([...newReviews].splice(0, page * skip));
    setCount(count - 1);
  };

  return {
    onLoadMore,
    onRemoved,
    values,
    count,
    filteredValues,
  };
};

export default useLogicPagesAndFetch;
