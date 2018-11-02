import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class Deck extends React.Component {
	static navigationOptions = {
    	headerTitle: "Deck",
  	};

	render() {
		var disabled = this.props.deck.questions.length === 0;
		return (
			<View>
				<Text style={styles.titleText}>{this.props.deck.title}</Text>
				<TouchableOpacity disabled={disabled} style={disabled ? styles.disabled : styles.buttonQuiz} onPress={() => this.props.navigation.navigate('Quiz', {deckName: this.props.deck.title})}>
					<Text style={styles.buttonTextStyle}>Start a quiz!</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonAddStyle} onPress={() => this.props.navigation.navigate('AddQuestion', {deckName: this.props.deck.title})}>
					<Text style={styles.buttonTextStyle}>Add a question</Text>
				</TouchableOpacity>
				<Text>Number of Cards in Deck: {this.props.deck.questions.length}</Text>
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
	disabled: {
		padding:10,
		backgroundColor: 'blue',
		borderRadius:20,
		margin:15,
		opacity:0.3
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
  	deck: state[props.navigation.state.params.deckName]
  }
}


export default connect(mapStateToProps)(Deck)