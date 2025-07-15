import http from 'k6/http';

class SystemUserRequestApiClient {
    /**
     *
     * @param {string} baseUrl e.g. https://platform.at22.altinn.cloud
     * @param {*} tokenGenerator // TODO: Need to create the interface
     */
    constructor(
        baseUrl,
        tokenGenerator
    ) {
        /**
        * @property {*} tokenGenerator A class that generates tokens used in authenticated calls to the API
        */
        this.tokenGenerator = tokenGenerator
        /**
         * @property {string} FULL_PATH The path to the api including protocol, hostname, etc.
         */
        this.FULL_PATH = baseUrl + "/authentication/api/v1/systemuser/request"
        /**
         * @property {string} BASE_PATH The path to the api without host information
         */
        this.BASE_PATH = "/authentication/api/v1/systemuser/request"
    }

    /**
    * Approves the systemuser requet and creates a system user
    * OpenAPI for {@link https://docs.altinn.studio/api/authentication/spec/#/RequestSystemUser/post_systemuser_request__party___requestId__approve|/systemuser/request/party/requestId/approve}
    * @param {string } vendorId
    * @param {string } requestId
    * @returns http.RefinedResponse
    */
    ApproveSystemUserRequest(
        partyId,
        requestId
    ) {
        const token = this.tokenGenerator.getToken()
        const url = `${this.FULL_PATH}/${partyId}/${requestId}/approve`

        const params = {
            tags: { name: `${this.FULL_PATH}/partyId/requestId/approve` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.post(url, null, params);
    }
}

export { SystemUserRequestApiClient }
