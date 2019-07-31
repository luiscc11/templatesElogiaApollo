import React, { Component, Fragment } from 'react';

class VariableEditar extends Component{
	state={
		editar: true,
		variable:{
			nom: this.props.variable.nom,
			valor: this.props.variable.valor
		}
	}
	render(){

		const { nom, valor }= this.state.variable;
		let btnEditar= '';
		let valorVariable;
			
			valorVariable = <input 
												type="text"
												name={ nom } 
												className="mt-2 mb-2 form-control" 
												placeholder={ nom } 
												value={ valor }
											/>;

			btnEditar= <button className="btn btn-success" onClick={ this.cambiarEdicion }>Listo</button>

		return(
			<Fragment>
				<tbody>
					<tr>
						<td>{ nom }</td>
						<td>{ valorVariable }</td>
						<td>{ btnEditar }</td>
					</tr>
				</tbody>
			</Fragment>
		)
	}
}

export default VariableEditar;