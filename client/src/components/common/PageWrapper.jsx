import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "redux/features/app-state.slice";

const PageWrapper = ({ state, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
