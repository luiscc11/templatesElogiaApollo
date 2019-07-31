import gql from 'graphql-tag';

export const CAMPANIAS_QUERY = gql`
	query getCampanias($limite: Int, $offset: Int){
		getCampanias(limite: $limite, offset: $offset){
			id
			nombre
			idSub
		}
		totalCampanias
 	}
`;

export const CAMPANIA_QUERY = gql `
	query getCampania($id: ID){
		getCampania(id: $id){
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

