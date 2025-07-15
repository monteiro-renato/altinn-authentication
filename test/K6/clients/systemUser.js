import http from 'k6/http';

class SystemUserApiClient {
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
        this.FULL_PATH = baseUrl + "/authentication/api/v1/systemuser"
        /**
         * @property {string} BASE_PATH The path to the api without host information
         */
        this.BASE_PATH = "/authentication/api/v1/systemuser"
    }

    /**
    * Creates a new SystemUser The unique Id for the systemuser is handled by the db. But the calling client may send a guid for the request of creating a new system user to ensure that there is no mismatch if the same partyId creates several new SystemUsers at the same time
    * OpenAPI for {@link https://docs.altinn.studio/api/authentication/spec/#/SystemUser/post_systemuser__party_|/systemuser/party}
    * @param {string } systemId
    * @param {string } partyOrgNo
    * @param {Array<{resource: Array<{value: string, id: string}>}>} rights
    * @param {string } redirectUrl
    * @param {Array<{ urn: string }> } accessPackages
    * @returns http.RefinedResponse
    */
    CreateSystemUser(
        systemId,
        partyOrgNo,
        rights = [],
        redirectUrl = "",
        accessPackages = []
    ) {
        const token = this.tokenGenerator.getToken()
        // TODO: Looks like there's multiple URLs to create things. The OpenAPI URL above is not the one I'm using here
        const url = `${this.FULL_PATH}/request/vendor`
        const body = {
            "systemId": systemId,
            "partyOrgNo": partyOrgNo,
            "rights": rights,
            "accessPackages": accessPackages,
            "redirectUrl": redirectUrl
        };
        const params = {
            tags: { name: `${this.FULL_PATH}/request/vendor` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.post(url, JSON.stringify(body), params);
    }

}

export { SystemUserApiClient }
