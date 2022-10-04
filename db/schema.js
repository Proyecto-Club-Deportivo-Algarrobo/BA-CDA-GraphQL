const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID,
        rut: String,
        name: String,
        password: String,
        type: String,
    },
    input UsuarioInput {
        rut: String!,
        name: String,
        password: String,
        type: String
    },
    input AutenticarInput {
        rut: String!,
        password: String!,
    },
    type Token {
        token: String!
    },
    type BloquesNoDisponibles {
        id: String!
    },
    input BloquesNoDisponiblesInput {
        id: String!
    },
    type BloquesAsignados {
        id: String!
    },
    input BloquesAsignadosInput {
        id: String!
    },
    type crearDia {
        cantidad_bloques: Int!,
        inicio: String!,
        no_disponible: [BloquesNoDisponibles]
    },
    input crearDiaInput {
        cantidad_bloques: Int!,
        inicio: String!,
        no_disponible: [BloquesNoDisponiblesInput]
    },
    type Dias {
        lunes: [crearDia],
        martes: [crearDia],
        miercoles: [crearDia],
        jueves: [crearDia],
        viernes: [crearDia],
        sabado: [crearDia],
        domingo: [crearDia]
    },
    input DiasInput {
        lunes: [crearDiaInput],
        martes: [crearDiaInput],
        miercoles: [crearDiaInput],
        jueves: [crearDiaInput],
        viernes: [crearDiaInput],
        sabado: [crearDiaInput],
        domingo: [crearDiaInput]
    },
    
    type Horario {
        tamano_bloque: String!,
        dias: [Dias!]
    },
    input HorarioInput {
        tamano_bloque: String!,
        dias: [DiasInput!]
    },
    type ValorHora {
        tipoValor: String!,
        valor: Int!
    },
    input ValorHoraInput {
        tipoValor: String!,
        valor: Int!
    },
    type InstalacionHora {
        id: ID,
        categoria: String,
        valorHora: [ValorHora],
        horario: [Horario]
    },
    
    input InstalacionHoraInput {
        id: String!,
        categoria: String!,
        valorHora: [ValorHoraInput!],
        horario: [HorarioInput!]
    },
    
    type Query {
        obtenerUser(token: String!): User
        obtenerUser_ByRut(rut: String!): User
        obtenerUsers: [User]
        obtenerInstalacionesHora: [InstalacionHora]
        obtenerInstalacionesHora_ByCategoria(categoria: String!): InstalacionHora
        obtenerInstalacionesHora_ById(id: String!): InstalacionHora
    },
    type Mutation {
        crearUsuario(input: UsuarioInput): User
        autenticarUsuario(input: AutenticarInput): Token
        actualizarUsuario(input: UsuarioInput): User
        crearInstalacionHora(input: InstalacionHoraInput): InstalacionHora
        modificarInstalacionHora(input: InstalacionHoraInput): InstalacionHora
    }

    `;

module.exports = typeDefs;