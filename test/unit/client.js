import ClientDataBuilder from "../builders/ClientDataBuilder";
import ClientValidator from "../validators/ClientValidator";
import ClientService from '../../src/services/ClientService';
const assert = require('chai').assert;
//test variables
let requestData = ClientDataBuilder.create();
let clientData = null;

describe('Unit Tests - Client', async function () {

    it('should create a client', async () => {
        const client = await ClientService.create(requestData);
        ClientValidator.check(client, requestData.body);
        clientData = client;
    }).timeout(10000);

    it('should get a client by id', async () => {
        const client = await ClientService.getById(clientData.id);
        assert.equal(client.id.toString(), clientData.id, `Id should have been ${clientData.id}`);
        ClientValidator.check(client, requestData.body);
    }).timeout(10000);

    it('should get a client by email', async () => {
        const client = await ClientService.getByEmail(clientData.email);
        assert.equal(clientData.email, clientData.email, `Email should have been ${clientData.email}`);
        ClientValidator.check(client, requestData.body);
    }).timeout(10000);

    it('should update a client', async () => {
        requestData = ClientDataBuilder.update(clientData.id);
        const client = await ClientService.update(requestData);
        assert.equal(clientData.id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        ClientValidator.check(client, requestData.body);
    }).timeout(10000);

    it('should delete a client', async () => {
        const client = await ClientService.deleteById(clientData.id);
        assert.equal(clientData.id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        ClientValidator.check(client, requestData.body);
    }).timeout(10000);
});
