export const RECIEVE_DECKS = 'RECIEVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export function recieveDecks(decks) {
	return {
		type: RECIEVE_DECKS,
		decks
	};
}

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	};
}

export function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	};
}