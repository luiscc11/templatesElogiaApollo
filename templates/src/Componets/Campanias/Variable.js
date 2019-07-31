import React, { Component, Fragment } from 'react';

class Variable extends Component{

	llamarCambioVariable = (i, name, valor) =>{
		this.props.cambiarVariable(i, name, valor);
	}

	render(){
		const variables = this.props.variables;
		//console.log('soy producto ' + productos.length);
		const { nom, valor } = this.props.variables;
		//console.log(variables);

		if ( !variables || variables.length === 0 ) return null;
		
		return(
			<Fragment>
				<div className="col-md-5">
					<label>Variable</label>
					<input
						type="text"
						name="nom"
						className="form-control"
						placeholder="Nombre variable"
						value={ nom }
						onChange={ e => this.llamarCambioVariable( this.props.item, e.target.name, e.target.value  ) }
					/>
				</div>

				<div className="col-md-5">
					<label>Valor variable</label>
					<input
						type="text"
						name="valor"
						className="form-control"
						placeholder="Valor variable"
						value={ valor }
						onChange={ e => this.llamarCambioVariable( this.props.item, e.target.name, e.target.value  ) }
					/>
				</div>

				<div className="col-md-2 align-self-center text-right">
					<button
						onClick={this.props.quitarCampo( this.props.item )}
						type="button"
						className="btn btn-danger mt-4"
					>
							&times; Eliminar
					</button>
				</div>
			</Fragment>
		)
	}
}

export default Variable;