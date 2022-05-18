'use strict';

var path = require('path'); //cargamos el path

var fs = require('fs'); //cargamos el fs (libreria fs)

var moment = require('moment');

var mongoosePaginate = require('mongoose-pagination'); //cargamos el mongoose-pagination

var User = require('../models/user'); //cargamos el modelo user

var Follow = require('../models/follow'); //cargamos el modelo follow

var Message = require('../models/message');

function probando(req, res) {
    res.status(200).send({ message: 'Hola que tal desde los mensajes privados' });
}

function saveMessage(req, res) {
    var params = req.body;
    if (!params.text || !params.receiver) return res.status(200).send({ message: 'envia los datos' });

    var message = new Message();
    message.emitter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.created_at = moment().unix();
    message.save((err, messageStored) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!messageStored) return res.status(500).send({ message: 'Error al guardar' });

        return res.status(200).send({ message: messageStored });
    });
}

function getReceivedMessages(req, res) {
    var userId = req.user.sub;
    var page = 1;
    if (req.params.page) {
        page - req.params.page;
    }
    var itemsPerPage = 4;
    Message.find({ receiver: userId }).populate('emitter receiver', 'name surname image nick _id').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!messages) return res.status(404).send({ message: 'No hay mensajes' }); 
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });
    });
}

function getEmmitMessages(req, res) {
    var userId = req.user.sub;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    var itemsPerPage = 4;
    Message.find({ emitter: userId }).populate('emitter receiver', 'name surname image nick _id').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!messages) return res.status(404).send({ message: 'No hay mensajes' });
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        });
    });
}

function getUnviewedMessages(req, res) {
    var userId = req.user.sub;
    Message.count({ receiver: userId, viewed: 'false' }).exec((err, count) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        return res.status(200).send({
            'unviewed': count
        });
    });
}

function setViewedMessages(req, res) {
    var userId = req.user.sub;
    I
    Message.updateOne({ receiver: userId, viewed: 'false' }, { viewed: 'true' }, { "multi": true }, (err, messagesUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        return res.status(200).send({
            messages: messagesUpdated
        });
    });
}


module.exports = {
    probando,
    saveMessage,
    getReceivedMessages,
    getEmmitMessages,
    getUnviewedMessages,
    setViewedMessages
};
