import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setLocalNotification, clearLocalNotification} from '../helpers/helpers';

class Quiz extends React.Component {
	static navigationOptions = {
    	headerTitle: "Quiz Time!",
  	};

	state = ({
		numberCorrect: 0,
		showAnswer: false,
		questionIndex: 0
	});

	toggleAnswer = () => {
		this.setState({
			showAnswer: !this.state.showAnswer
		});
	}

	resetLocalNotificationReminder = () => {
		clearLocalNotification()
		.then(setLocalNotification);
	}

	startQuizOver = () => {
		this.setState({
			questionIndex: 0,
			numberCorrect: 0,
			showAnswer: false
		});
		this.resetLocalNotificationReminder();
	}

	backToDeck = () => {
		this.resetLocalNotificationReminder();
		this.props.navigation.navigate('Deck', {deckName: this.props.deck.title});
	}

	markQuestion = (correct) => {
		var numCorrect = this.state.numberCorrect;
		if (correct) {
			numCorrect += 1;
		}
		this.setState({
			numberCorrect: numCorrect,
			questionIndex: this.state.questionIndex + 1,
			showAnswer: false
		});

	}
	render() {		
		var deck = this.props.deck;
		var numRemaining = deck.questions.length - this.state.questionIndex;
		var answerButtonText = this.state.showAnswer ? "Hide Answer" : "Show Answer";
		var completedText = this.state.numberCorrect === 0 ? "You didn't get any correct, time to study!" : "Congratulations you got " + this.state.numberCorrect + " questions correct!";
		return (
				<View>
					{numRemaining === 0 && 
						<View>
							<Text style={styles.titleText}>{completedText}</Text>
							<TouchableOpacity style={styles.buttonQuiz} onPress={() => this.startQuizOver()}>
								<Text style={styles.buttonTextStyle}>Start Quiz Over</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonAddStyle} onPress={() => this.backToDeck()}>
								<Text style={styles.buttonTextStyle}>Back To Deck</Text>
							</TouchableOpacity>
						</View>
					}
					{numRemaining > 0 && 
						<View>
							<Text style={styles.titleText}>{deck.questions[this.state.questionIndex].question}</Text>
							{this.state.showAnswer && (<Text style={styles.titleText}>{deck.questions[this.state.questionIndex].answer}</Text>)}
							<TouchableOpacity style={styles.buttonQuiz} onPress={() => this.toggleAnswer()}>
								<Text style={styles.buttonTextStyle}>{answerButtonText}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonAddStyle} onPress={() => this.markQuestion(true)}>
								<Text style={styles.buttonTextStyle}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.negativeButton} onPress={() => this.markQuestion(false)}>
								<Text style={styles.buttonTextStyle}>Incorrect</Text>
							</TouchableOpacity>
							<Text>Cards left in quiz: {numRemaining}</Text>
						</View>
					}
				</View>);
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
	},
	negativeButton: {
		padding:10,
		backgroundColor: 'red',
		borderRadius:20,
		margin:15
	}
});

function mapStateToProps (state, props) {
  return {
  	deck: state[props.navigation.state.params.deckName]
  }
}


export default connect(mapStateToProps)(Quiz)