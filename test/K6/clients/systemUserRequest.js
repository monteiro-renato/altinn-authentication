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
    * Creates a new Request based on a SystemId for a SystemUser.
    * OpenAPI for {@link https://docs.altinn.studio/api/authentication/spec/#/RequestSystemUser/post_systemuser_request_vendor}
    * @param {string } systemId
    * @param {string } partyOrgNo
    * @param {Array<{resource: Array<{value: string, id: string}>}>} rights
    * @param {string } redirectUrl
    * @param {Array<{ urn: string }> } accessPackages
    * @returns http.RefinedResponse
    */
    CreateSystemUserRequest(
        systemId,
        partyOrgNo,
        rights = [],
        redirectUrl = "",
        accessPackages = []
    ) {
        const token = this.tokenGenerator.getToken()
        const url = `${this.FULL_PATH}/vendor`
        const body = {
            "systemId": systemId,
            "partyOrgNo": partyOrgNo,
            "rights": rights,
            "accessPackages": accessPackages,
            "redirectUrl": redirectUrl
        };
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.post(url, JSON.stringify(body), params);
    }

    /**
    * Approves the systemuser requet and creates a system user
    * OpenAPI for {@link https://docs.altinn.studio/api/authentication/spec/#/RequestSystemUser/post_systemuser_request__party___requestId__approve|/systemuser/request/party/requestId/approve}
    * @param {string } partyId
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
