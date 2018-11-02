import {AsyncStorage} from 'react-native';

export function submitQuestion({key, entry}) {
	return AsyncStorage.mergeItems("UdaciCards:Questions", JSON.stringify({
		[key]: entry
	}));
}

export function addDeckToApi({key, entry}) {
	return AsyncStorage.mergeItem("UdaciCards:Decks", JSON.stringify({
		[key]: entry
	}));
}


/*{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}*/