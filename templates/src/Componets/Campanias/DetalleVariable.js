import React, { Component } from 'react';

class DetalleVariable extends Component{
	state={
		editar: true,
		variable:{
			nom: this.props.variable.nom,
			valor: this.props.variable.valor
		}
	}

	componentDidMount(){
		if( this.props.variable.valor !== "" ){
			this.setState({
				editar: false
			});
		}
	}

	cambiarEdicion = () => {
		if( this.state.variable.valor !== '' ){
			this.setState({
				editar: !this.state.editar,
			});
		}	
	}

	cambiarValorVariable = e => {
		const {name, value} = e.target;
		//console.log( name, ': ', value );
		this.setState({
			variable:{
				...this.state.variable,
				valor: value
			}
		}, () => {
			this.props.cambioValorVariablePos(name, value, this.props.index)
		});
	}



	render(){
		//console.log(this.props);
		const { nom, valor }= this.state.variable;
		let btnEditar= '';
		let valorVariable;

		if( valor !== "" && this.state.editar === false ){

			valorVariable =  this.state.variable.valor;

			btnEditar= <button className="btn btn-warning" onClick={ this.cambiarEdicion }>Editar</button>

		}else{
			
			valorVariable = <input 
												type="text"
												name={ this.state.variable.nom } 
												className="mt-2 mb-2 form-control" 
												placeholder={ nom } 
												onChange={ this.cambiarValorVariable }
												value={ this.state.variable.valor }
											/>;

			btnEditar= <button className="btn btn-success" onClick={ this.cambiarEdicion }>Listo</button>

		}

		return(
			<tr>
				<td>{ nom }</td>
				<td>{ valorVariable }</td>
				<td>{ btnEditar }</td>
			</tr>
		)
	}
}

export default DetalleVariable;