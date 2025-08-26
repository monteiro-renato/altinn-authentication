import { check } from 'k6';
import { RegisterApiClient } from "../../clients/index.js"

/**
 * TODO:
 * @param {RegisterApiClient} registerClient TODO:
 * @param {string } soapErUsername TODO:
 * @param {string } soapErPassword TODO:
 * @param {string } clientOrg TODO:
 * @param {string } facilitatorOrg TODO:
 * @returns (string | ArrayBuffer | null)
 */
export function AddRevisorRoleToErForOrg(registerClient, soapErUsername, soapErPassword, clientOrg, facilitatorOrg) {
    const res = registerClient.AddRevisorRoleToErForOrg(soapErUsername, soapErPassword, clientOrg, facilitatorOrg)

    check(res, {
        "AddRevisorRoleToErForOrg - status code MUST be 200": (res) => res.status == 200,
    })

    return res.body
}
