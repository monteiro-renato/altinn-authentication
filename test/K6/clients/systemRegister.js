import http from 'k6/http';

class SystemRegisterApiClient {
    constructor(
        baseUrl,
        tokenGenerator
    ) {
        this.tokenGenerator = tokenGenerator
        this.FULL_PATH = baseUrl + "/authentication/api/v1/systemregister"
        this.BASE_PATH = "/authentication/api/v1/systemregister"
    }

    GetAllSystemsFromRegister() {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = this.FULL_PATH
        const params = {
            tags: { name: url },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.get(url, params);
    }

    GetSystemRegisterById(systemId) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/${systemId}`
        const params = {
            tags: { name: `${this.FULL_PATH}/systemId` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.get(url, params);
    }

    GetVendorSystemRegisterById(systemId) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/vendor/${systemId}`
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor/systemId` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.get(url, params);
    }

    UpdateVendorSystemRegister(
        systemId,
        vendorId,
        name,
        clientId,
        description,
        rights,
        allowedRedirectUrls
    ) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/vendor/${systemId}`
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor/systemId` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        const body = {
            "Id": `${vendorId}_${name}`,
            "Vendor": {
                "ID": `0192:${vendorId}`
            },
            "Name": {
                "en": `${name}`,
                "nb": `${name}`,
                "nn": `${name}`
            },
            "Description": description,
            "rights": rights,
            "allowedRedirectUrls": allowedRedirectUrls,
            "isVisible": false,
            "ClientId": [`${clientId}`] // TODO: What makes sense here?
        }
        return http.put(url, JSON.stringify(body), params);
    }

    UpdateVendorAccessPackages(systemId, body) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/vendor/${systemId}/accesspackages`
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor/systemId/accesspackages` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.put(url, JSON.stringify(body), params);
    }

    UpdateRightsVendorSystemRegister(systemId, body) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/vendor/${systemId}/rights`
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor/systemId/rights` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.put(url, JSON.stringify(body), params);
    }

    DeleteSystemSystemRegister(systemId) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/vendor/${systemId}`
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor/systemId` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.del(url, null, params);
    }

    GetSystemRegisterRights(systemId) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/${systemId}/rights`
        const params = {
            tags: { name: `${this.FULL_PATH}/systemId/rights` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.get(url, params);
    }

    // TODO: Validation and defaults?
    CreateSystemRegister(
        vendorId,
        name,
        clientId,
        description,
        rights = [],
        allowedRedirectUrls = [],
        accessPackages = []
    ) {
        const scopes = "altinn:authentication/systemregister.write altinn:authentication/systemuser.request.write altinn:authentication/systemregister.write altinn:authentication/systemuser.request.read altinn:authentication/systemregister.admin"
        const token = this.tokenGenerator.generateAccessToken(scopes)
        const url = `${this.FULL_PATH}/vendor`
        const body = {
            "Id": `${vendorId}_${name}`,
            "Vendor": {
                "ID": `0192:${vendorId}`
            },
            "Name": {
                "en": `${name}`,
                "nb": `${name}`,
                "nn": `${name}`
            },
            "Description": description,
            "rights": rights,
            "accessPackages": accessPackages,
            "allowedRedirectUrls": allowedRedirectUrls,
            "isVisible": false,
            "ClientId": [`${clientId}`] // TODO: What makes sense here?
        }
        const params = {
            tags: { name: `${this.FULL_PATH}/vendor` },
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json',
            },
        };
        return http.post(url, JSON.stringify(body), params);
    }
}

export { SystemRegisterApiClient }
