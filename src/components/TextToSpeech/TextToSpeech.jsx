import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useSpeechSynthesis } from 'react-speech-kit';
import { convertToPlain, removeTrailingQuotes } from '../../utils/utils';

const TextToSpeech = () => {
  const post = useSelector((state) => state.posts.post);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const text = `${removeTrailingQuotes(post.title[language])}, ${convertToPlain(removeTrailingQuotes(post.message[language]))}`;
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();
  const voice = voices[1] || null;
  return (
    <>
      {speaking ? (
        <Button size="small" onClick={cancel}>🛑 Stop Listening</Button>
      ) : (
        <Button  size="small" onClick={() => speak({ text, voice })}>▶️ Listen</Button>
      )}
    </>
  );
};

export default TextToSpeech;
