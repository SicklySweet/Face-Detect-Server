const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '19c53d70cc7b45f69826ad7975f5ad08'
   });

const handleApiCall = (req, res) => {
    app.models.predict (
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImageCounter = (req, res, database) => {
    const { id } = req.body;
    database('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to Get Entries'))
}

module.exports = {
    handleImageCounter: handleImageCounter,
    handleApiCall: handleApiCall
};