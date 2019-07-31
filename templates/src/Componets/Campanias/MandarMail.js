import React, { Component } from 'react';

class MandarMail extends Component {
	state={
		btnDisabled: true,
		variables: this.props.variables
	}

	componentWillReceiveProps(props){
		//console.log(props);
		this.cambioValorVariable( props.posicion, props.variable.nom, props.variable.valor  );
	}

	cambioValorVariable = ( pos, variable, valor) => {

		let objVariables =[...this.state.variables];

		objVariables[pos] = {nom: variable, valor:valor};

		let isAllFilled = true;

		for (const variable of objVariables) {
			if(variable.valor === '' || variable.valor === null){
				isAllFilled = false;
			}
		}

		this.setState({
			
			btnDisabled: !isAllFilled,
			variables: [...objVariables]
		});

	}

	abrirLink = () => {
		//console.log( 'algo pasa' );
		let url= ''; 

		for( let variable in this.state.variables ){
			url+= `&${this.state.variables[variable].nom}=${this.state.variables[variable].valor}`;
		}
		let link = `https://mx.mittum.com/ws/e?&CID=${this.props.idCampania}&PK=0${url}`;
		window.open (link);
	}

	render(){
		return(
			<button
				className="btn btn-success mt-3 mb-3"
				disabled={ this.state.btnDisabled }
				onClick={ this.abrirLink }
				>
					Prueba email
			</button>
		)
	}
	
}

export default MandarMail;