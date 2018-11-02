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
