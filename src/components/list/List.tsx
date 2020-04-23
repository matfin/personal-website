import React, { useEffect } from 'react';
import { FetchStoriesReturnType, IStory } from 'app/common/interfaces';
import ListSt, { ListItemSt, LinkSt } from './List.css';

interface IProps {
  error: any,
  pending: boolean,
  stories: IStory[],
  fetchStories(): FetchStoriesReturnType,
}

const dummyStories = new Array(5).fill({ title: 'Loading', content: '' }).map((item, index) => {
  const dummyStory: IStory = ({ ...item, id: `${index + 1}` });

  return (
    <ListItemSt key={dummyStory.id}>
      <LinkSt to={`/story/${dummyStory.slug}`}>
        {dummyStory.title}
      </LinkSt>
    </ListItemSt>
  );
});

const List = ({ fetchStories, pending, stories }: IProps) => {
  const mappedStories = stories?.map(({ id, slug, title }) => (
    <ListItemSt key={id}>
      <LinkSt to={`/story/${slug}`}>
        {title}
      </LinkSt>
    </ListItemSt>
  ));

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <ListSt loading={pending ? 1 : 0}>
      { pending ? dummyStories : mappedStories }
    </ListSt>
  );
};

export default List;
