import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/campanias', { useNewUrlParser: true });

// Definir schema de campanias

const campaniasSchema = new mongoose.Schema({
	nombre: String,
	idSub: Number,
	html: String,
	activa: String,
	variables: Array
});

const Campanias = mongoose.model('campanias', campaniasSchema);

export { Campanias };