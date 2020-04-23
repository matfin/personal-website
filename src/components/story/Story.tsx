import React, { useEffect } from 'react';
import { Action } from 'redux';
import { useParams } from 'react-router-dom';
import { FetchStoryReturnType, IStory } from 'app/common/interfaces';
import StorySt, { ChapterSt, ParagraphSt } from './Story.css';

export interface IProps {
  error: any,
  pending: boolean,
  story: IStory,
  fetchStory(slug: string): FetchStoryReturnType,
  resetStory(): Action,
}

export const placeholderStory: IStory = {
  id: '0',
  title: 'Loading...',
  slug: 'chapter-zero',
  content: [
    'Jesse Jackson? Do you even... ah, I see you have a telephone at least. You know that blinking thing I&#39;ve been calling you on? I will break this, I will BREAK THIS. Damn druggie idiot. Is this what you&#39;ve been doing the whole time I&#39;ve been trying to reach you?',
    'The game has changed. The word is out. And you... are a killer. Apparently it&#39;s all over town. Somebody crossed you, you got angry, you crushed their skull with an ATM machine. Who cares! Just as long as it&#39;s our competitors who believe it and not the police.',
    'Don&#39;t you see how great this is? You, you are a... Jesse look at me. You... are a blowfish. A blowfish! Think about it. Small in stature, not swift, not cunning. Easy prey for predators but the blowfish has a secret weapon doesn&#39;t he. Doesn&#39;t he? What does the blowfish do, Jesse. What does the blowfish do? The blowfish puffs up, okay?',
  ],
};

const Story = ({
  error, pending, story, fetchStory, resetStory,
}: IProps) => {
  const { slug } = useParams();

  const storyToRender: IStory = pending ? placeholderStory : story;
  const errorMessage = <ChapterSt>Error</ChapterSt>;
  const content = (
    <>
      <ChapterSt>
        {storyToRender?.title}
      </ChapterSt>
      <article>
        {
          storyToRender?.content.map((paragraph: string, index: number) => (
            <ParagraphSt key={index} redacted={pending}>{paragraph}</ParagraphSt>
          ))
        }
      </article>
    </>
  );

  useEffect((): any => {
    fetchStory(slug || '');

    return resetStory;
  }, [slug]);

  return (
    <StorySt>
      { error && errorMessage }
      { !error && content }
    </StorySt>
  );
};

export default Story;
