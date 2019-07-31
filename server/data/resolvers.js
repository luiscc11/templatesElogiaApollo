import mongoose from 'mongoose';
import { Campanias } from  './db';
import { rejects } from 'assert';

export const resolvers = {
	Query:{
		getCampanias: ( root, {limite, offset} ) => {
			return Campanias.find({}).limit(limite).skip(offset);
		},
		getCampania: ( root, {id} ) => {
			return new Promise((resolve, object) => {
				Campanias.findById( id, (error, campania) => {
					if(error) rejects(error)
					else resolve(campania)
				});
			});
		},
		totalCampanias: (root) => {
			return new Promise( (resolve, object ) => {
				Campanias.countDocuments({}, (error, count) => {
					if(error) rejects(error)
					else resolve(count)
				});
			});
		}
	},
	Mutation:{

		crearCampania: (root, {input}) => {
			const nuevaCampania = new Campanias({
				nombre: input.nombre,
				idSub: input.idSub,
				html: input.html,
				activa: "ACTIVADA",
				variables: input.variables
			});
			nuevaCampania.id = nuevaCampania._id;

			return new Promise((resolve, object) => {
				nuevaCampania.save((error) => {
					if( error ) rejects(`hay un error: ${error}`)
					else resolve( nuevaCampania )
				});
			});
		},

		actualizarCampania: (root, {input}) => {
			return new Promise((resolve, object) => {
				Campanias.findOneAndUpdate({ _id: input.id }, input, {new: true}, (error, campania) => {
					if(error) rejects(error)
					else resolve(campania)
				});
			});
		},
		eliminarCampania: (root, {id}) => {
			return new Promise((resolve, object) => {
				Campanias.findOneAndRemove({ _id: id }, (error) => {
					if(error) rejects(error)
					else resolve("La campaña se elimino correctamente")
				});
			});
		}

	}
};

