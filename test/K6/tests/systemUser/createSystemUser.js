import { check, fail } from 'k6';
import { SystemUserApiClient } from "../../clients/index.js"

/**
 * Create a new System
 * @param {SystemUserApiClient} systemUserApiClient A client to interact with the System Register API
 * @param {string } systemId
 * @param {string } partyOrgNo
 * @param {Array<{resource: Array<{value: string, id: string}>}>} rights
 * @param {string } redirectUrl
 * @param {Array<{ urn: string }> } accessPackages
 * @returns (string | ArrayBuffer | null)
 */
export function CreateSystemUser(
    systemUserApiClient,
    systemId,
    partyOrgNo,
    rights = [],
    redirectUrl = "",
    accessPackages = []
) {
    const res = systemUserApiClient.CreateSystemUser(
        systemId,
        partyOrgNo,
        rights,
        redirectUrl,
        accessPackages
    )

    if (!check(res, {
        'CreateSystemUser - status code is 201': (r) => r.status === 201,
        'CreateSystemUser - status text is 201 CREATED': (r) => r.status_text == "201 CREATED",
    })) {
        if ((res.status.toString().startsWith("4") || res.status.toString().startsWith("5")) && res.body !== null) {
            console.log(res.body)
        }
        fail(`CreateSystemUser - Unexpected status: '${res.status}' or status_text: '${res.status_text}'`)
    };

    if (!check(res, {
        'CreateSystemUser - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    })) {
        fail(`CreateSystemUser - Unexpected body: '${res.body}'`)
    };
    return res.body
}
