describe('Integration Tests - Delete Test Data', function () {

    it('should delete test data', function (done) {
        delete global.freshClientToken;
        delete global.freshUserToken;
        done();
    }).timeout(10000);
});