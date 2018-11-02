import {RECIEVE_DECKS, ADD_DECK, ADD_QUESTION} from '../actions'


export default function decks(state = null, action) {
	switch(action.type) {
		case RECIEVE_DECKS:
			return {
				...state,
				...action.decks
			};
			break;
		case ADD_QUESTION:
			return {
				...state,
				[action.question.title]: {questions: state[action.question.title].questions.concat(action.question.question), title: action.question.title}
			};      	
			break;
		case ADD_DECK:
			return {
				...state,
				...action.deck
			};
			break;
		default:
			return state;
			break;
	}
}