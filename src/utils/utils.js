import { SET_PROGRESS } from '../constants/actionTypes';

export const convertToPlain = (html) => {
  // Create a new div element
  var tempDivElement = document.createElement('div');

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || '';
};

export const getHumanReadableDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const humanReadableDate = date
    .toLocaleString('en-US', options)
    .replace(/(\d+)(?:st|nd|rd|th)/, '$1');
  return humanReadableDate;
};

export const getMinutesToRead = (text) => {
  const WPM = 220;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / WPM);
};

export const removeTrailingQuotes = (text) => {
  // Remove single quotes from the start and end of the string
  text = text.replace(/^'|'$/g, '');
  return text;
};

export const createPostProgressInterval = (dispatch) => {
  let progress = 0;
  const intervalId = setInterval(() => {
    if (progress < 99) {
      progress += 3.84;
      dispatch({ type: SET_PROGRESS, payload: progress });
    }
  }, 2400);
  return intervalId;
};
