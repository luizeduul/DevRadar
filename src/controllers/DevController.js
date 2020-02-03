const Dev = require('../models/Dev');
const Api = require('../services/apiGithub');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

//5 funções controller:  index(mostrar uma lista), show(exibir um unico), store(criar), update(alterar), destroy(deletar)

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async show(request, response) {
        const { dev_id } = request.params;
        const dev = await Dev.findById(dev_id);
        return response.json(dev);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await Api.get(`${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,

            });

            //filtrar as conexões que estão a no maximo 10 km de distancia 
            //e que o novo dev tenha pelo menos uma das techs filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }
        return response.json(dev);
    },

    async update(request, response) {
        //atualizar dados do dev, com excessão do github_username
        const { dev_id } = request.params;
        const { name, latitude, techs, longitude, bio } = request.body;
        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        try {
            let dev = await Dev.findByIdAndUpdate(dev_id, {
                name,
                bio,
                techs: techsArray,
		location,
                
            });
            return response.json({ message: `Dados do dev: ${dev.github_username} alterados com sucesso!` });

        } catch (error) {
            return response.json({ message: 'Ocorreu um erro na alteração' });
        }

    },

    async destroy(request, response) {
        //deletar dados do dev
        const { dev_id } = request.params;
        try {
            let dev = await Dev.findByIdAndDelete(dev_id);
            return response.json(`{Dev: ${dev.github_username} foi excluido com sucesso!}`);

        } catch (error) {
            return response.json({ message: 'Erro ao excluir, usuário não existe' });
        }

    }
}