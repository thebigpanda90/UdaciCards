import React from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {addDeckToApi} from '../helpers/api';
import {addQuestion} from '../actions';

class AddQuestion extends React.Component {
	static navigationOptions = {
    	headerTitle: 'Add New Question',
  	};

	state = {
		Question: '',
		Answer: ''
	}

	questionChanged = (text) => {
		this.setState({
			Question: text
		})
	};

	answerChanged = (text) => {
		this.setState({
			Answer: text
		})
	};


	//The New Question view includes a form with fields for a question and answer, and a submit button.
	//Submitting the form correctly adds the question to the deck.
	submitQuestion = () => {
		this.props.dispatch(addQuestion({title: this.props.deck.title, question: [{question: this.state.Question, answer: this.state.Answer}]}));
		addDeckToApi({key:this.state.DeckName, entry:this.state});
		this.props.navigation.navigate('Deck', {deckName: this.props.deck.title});
		
	};
	render() {
		return (
			<View>
				<Text style={styles.titleText}>Add a New Question</Text>
				<TextInput style={styles.input} placeholder="Question" onChangeText = {this.questionChanged}/>
				<TextInput style={styles.input} placeholder="Answer" onChangeText = {this.answerChanged}/>
				<TouchableOpacity style={styles.buttonAddStyle} onPress={this.submitQuestion}>
					<Text style={styles.buttonTextStyle}>Submit</Text>
				</TouchableOpacity>
			</View>
			);
	}
}

const styles = StyleSheet.create({
	titleText: {
		margin: 15,
		textAlign: 'center',
		fontSize:20
	},
	buttonTextStyle: {
		fontSize:20,
		color: 'white',
		textAlign: 'center'
	},
	input: {
		padding: 5,
		margin: 15,
		height: 40,
		borderColor: 'green',
		borderWidth: 1
	},
	buttonQuiz: {
		padding:10,
		backgroundColor: 'blue',
		borderRadius:20,
		margin:15
	},
	buttonAddStyle: {
		padding:10,
		backgroundColor: 'green',
		borderRadius:20,
		margin:15
	}
});

function mapStateToProps (state, props) {
  return {
  	deck: state[props.navigation.state.params.deckName],
  }
}


export default connect(mapStateToProps)(AddQuestion)