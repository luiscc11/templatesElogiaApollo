import gql from 'graphql-tag';

export const NUEVA_CAMPANIA = gql`
	mutation crearCampania($input: CampaniaInput){
		crearCampania(input: $input){
			id
			nombre
			idSub
		}
	}
`;

export const ELIMINAR_CAMPANIA = gql `
	mutation eliminarCampania($id: ID!){
  	eliminarCampania(id: $id)
	}
`;

export const ACTUALIZAR_CAMPANIA = gql`
	mutation actualizarCampania($input: CampaniaInput){
		actualizarCampania(input: $input){
			id
			nombre
			idSub
			html
			activa
			variables{
				nom
				valor
			}
		}
	}
`;