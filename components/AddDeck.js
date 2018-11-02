import React from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {addDeckToApi} from '../helpers/api';
import {addDeck} from '../actions';
import {connect} from 'react-redux';

//An option to enter in the title for the new deck
//An option to submit the new deck title
class AddDeck extends React.Component {
	static navigationOptions = {
    	headerTitle: 'Create a New Deck',
  	};
	state = {
		DeckName: ''
	};

	deckNameChanged = (text) => {
		this.setState({
			DeckName: text
		})
	};

	onSubmit = () => {
		this.props.dispatch(addDeck({[this.state.DeckName]: {title: this.state.DeckName, questions: []}}));
		addDeckToApi({key:this.state.DeckName, entry:this.state});
		this.props.navigation.navigate('Deck', {deckName: this.state.DeckName});
	};

	render() {
		return (
			<View>
				<Text style={styles.titleText}>Enter a name for your new card deck!</Text>
				<TextInput style={styles.input} underlineColorAndroid = "transparent" placeholder="New Deck Name!" onChangeText = {this.deckNameChanged}/>
				<TouchableOpacity style={styles.buttonStyle} onPress={this.onSubmit}>
					<Text style={styles.buttonTextStyle}>Create Deck</Text>
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
  
  buttonStyle: {
    padding:10,
    backgroundColor: 'green',
    borderRadius:20,
    margin:15
  }
});

export default connect()(AddDeck)