import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedsSelectors, fetchFeeds } from '../../services/slices/feeds-slice';

export const Feed: FC = () => {
  const dispatcher = useDispatch();
  const isLoading = useSelector(feedsSelectors.isLoading);
  const orders = useSelector(feedsSelectors.getOrders);

  const handleFetchFeeds = () => dispatcher(fetchFeeds());

  useEffect(() => {
    handleFetchFeeds();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleFetchFeeds} />;
};
