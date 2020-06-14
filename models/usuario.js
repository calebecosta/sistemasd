const dynamoose = require('dynamoose');
const uuid = require('uuid');

const sdk = dynamoose.aws.sdk; 

sdk.config.update({
    accessKeyId: 'AKIAIPNUVY75HCS4MWJQ', 
    secretAccessKey: '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',
    region: 'sa-east-1'
});

const usuarioSchema = new dynamoose.Schema({
    id:{
       type: String,
       hashKey:true,
       id: String,
       default: uuid.v1()
    },
    nome:{
        type: String,
    },
    timestamps: true,
})

module.exports = dynamoose.model('Usuario', usuarioSchema);

