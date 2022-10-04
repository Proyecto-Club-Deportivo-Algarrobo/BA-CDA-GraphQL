const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InstalacionHora = require('../models/InstalacionHora');


const crearToken = (usuario, secreta, expiresIn) => {
    const { rut, name,type } = usuario;
    return jwt.sign( { rut, name,type }, secreta, { expiresIn } )
}

const resolvers = {
    Query: {
        obtenerUser: async (_, { token }) => { 
            const Usuario = await jwt.verify(token, process.env.SECRETA);
            return Usuario;
        },
        obtenerUser_ByRut: async (_, { rut }) => {
            const user = await User.findOne({ rut });
            return user;
        },
        obtenerUsers: async () => {
            const users = await User.find();
            return users
        },
        obtenerInstalacionesHora: async () => {
            const instalacionesHora = await InstalacionHora.find();
            return instalacionesHora
        },
        //resolver get all instalacionesHora by Categoria
        obtenerInstalacionesHora_ByCategoria: async (_, { categoria }) => {
            const instalacionesHora = await InstalacionHora.find({ categoria });
            return instalacionesHora
        },
        obtenerInstalacionesHora_ById: async (_, { id }) => {
            const instalacionesHora = await InstalacionHora.findById(id);
            return instalacionesHora
        }

    },
    Mutation: {
        crearUsuario: async (_, {input}) => {
            let { rut,name,password,type } = input;
            const existeUsuario = await User.findOne({ rut });
            if (existeUsuario) {
                throw new Error('El usuario ya existe');
            }
            const salt = await bcryptjs.genSalt(10);
            password = await bcryptjs.hash(password, salt);

            try {
                let usuario = new User({ rut: rut, name: name, password: password, type: type });
                usuario.save();
                return usuario
            } catch (error) {
                throw new Error(error);
            }
        },

        autenticarUsuario: async (_, {input}) => {
            let { rut,password } = input;
            const existeUsuario = await User.findOne({ rut });
            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error('Contraseña incorrecta');
            }

            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '24h' ) 
            }
        },

        actualizarUsuario: async (_, {input}) => {
            let { rut,password } = input;
            const existeUsuario = await User.findOneAndUpdate({ rut }, { password: password });
            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }
            return existeUsuario;
        },
        crearInstalacionHora: async (_, {input}) => {
            let { id,categoria,valorHora,horario } = input;
            try {
                let instalacionHora = new InstalacionHora({ id: id, categoria: categoria, valorHora: valorHora, horario: horario });
                instalacionHora.save();
                return instalacionHora
            } catch (error) {
                throw new Error(error);
            }
        },
        //modificar instalacionHora by id
        modificarInstalacionHora: async (_, {input}) => {
            let { id,categoria,valorHora,horario } = input;
            const existeInstalacionHora = await InstalacionHora.findOne({ id });
            if (!existeInstalacionHora) {
                throw new Error('La instalacionHora no existe');
            }
            if(categoria){
                existeInstalacionHora.categoria = categoria;
            }
            if(valorHora){
                var valorHoraAux = []
                //mix the two objects into one replae the value of the first object with the value of the second object
                valorHoraAux = Object.assign(existeInstalacionHora.valorHora, valorHora);
                existeInstalacionHora.valorHora = valorHoraAux;
            }
            if(horario){
                var horarioAux = []
                //mix the two objects into one replae the value of the first object with the value of the second object\
                try{
                    if(horario[0].tamano_bloque){
                        existeInstalacionHora.horario[0].tamano_bloque = horario[0].tamano_bloque;
                    }
                }
                catch (error) {
                    console.log("entro al catch",horario)
                }

                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].lunes, horario[0].dias[0].lunes)
                existeInstalacionHora.horario[0].lunes = horarioAux[0].lunes;
                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].martes, horario[0].dias[0].martes)
                existeInstalacionHora.horario[0].martes = horarioAux[0].martes;
                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].martes, horario[0].dias[0].martes)
                existeInstalacionHora.horario[0].miercoles = horarioAux[0].miercoles;
                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].jueves, horario[0].dias[0].jueves)
                existeInstalacionHora.horario[0].jueves = horarioAux[0].jueves;
                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].viernes, horario[0].dias[0].viernes)
                existeInstalacionHora.horario[0].viernes = horarioAux[0].viernes;
                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].sabado, horario[0].dias[0].sabado)
                existeInstalacionHora.horario[0].sabado = horarioAux[0].sabado;
                horarioAux = Object.assign(existeInstalacionHora.horario[0].dias[0].domingo, horario[0].dias[0].domingo)
                existeInstalacionHora.horario[0].domingo = horarioAux[0].domingo;
                            
            }
           
            //submit changes

            try {
                //check if existeInstalacionHora is a valid object before saving
                InstalacionHora.findOneAndUpdate({ id }, existeInstalacionHora, { new: true }, (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                });                                
                return existeInstalacionHora
            } catch (error) {
                throw new Error(error);
            }


        } 

    }

}

module.exports = resolvers;