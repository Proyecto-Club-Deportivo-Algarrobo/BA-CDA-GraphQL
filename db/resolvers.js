const User = require('../models/User');
const Registro = require('../models/Registro');
const Message = require('../models/Message');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crearToken = (usuario, secreta, expiresIn) => {
    const { rut, name,type,average } = usuario;
    return jwt.sign( { rut, name,type,average }, secreta, { expiresIn } )
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
        obtenerRegistros_ByUserRut: async (_, { rut }) => {
            const registros = await Registro.find({ user: rut });
            return registros;
        },
        obtenerUsers: async () => {
            const users = await User.find();
            return users
        },
        obtenerMensajes: async (_, { rut_from }) => {
            const mensajes = await Message.find({ rut_to: rut_from });
            const mensajes_ = await Message.find({ rut_from: rut_from });
            mensajes.push(...mensajes_)

            mensajes.sort((a, b) => {
                return a.created - b.created
            })

            return mensajes;
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

        crearRegistro: async (_, {input}) => {
            let { medicion,unidad_de_medida,fecha_creacion,user } = input;
            try {
                let registro = new Registro({ medicion: medicion,unidad_de_medida: unidad_de_medida,fecha_creacion: fecha_creacion,user: user });
                registro.save();
                return registro
            } catch (error) {
                throw new Error(error);
            }
        },

        actualizarUsuario: async (_, {input}) => {
            let { rut,average } = input;
            const existeUsuario = await User.findOneAndUpdate({ rut }, { average: average });
            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }
            return existeUsuario;
        },

        crearMensaje: async (_, {input}) => {
            let {rut_from,rut_to,content} = input;
            try{
                let message = new Message({ rut_from: rut_from,rut_to: rut_to,content: content });
                message.save();
                return message
            } catch (error){
                throw new Error(error);
            }
        }


        

    }
}

module.exports = resolvers;