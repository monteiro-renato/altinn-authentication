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



}

export { SystemUserApiClient }
