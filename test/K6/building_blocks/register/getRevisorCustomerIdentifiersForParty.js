import { check } from 'k6';
import { RegisterApiClient } from "../../clients/index.js"

/**
 * TODO
 * @param {RegisterApiClient} registerClient A client to interact with the System Register API
 * @param {string } facilitatorPartyUuid TODO:
 * @param {string } subscriptionKey TODO:
 * @returns {[]}
 */
export function GetRevisorCustomerIdentifiersForParty(registerClient, facilitatorPartyUuid, subscriptionKey) {
    const res = registerClient.GetRevisorCustomerIdentifiersForParty(facilitatorPartyUuid, subscriptionKey)

    check(res, {
        "Register customer list for revisor should respond 200 OK": (r) =>
            r.status === 200,
    });

    const body = JSON.parse(res.body);
    return (body.data ?? []).map((entry) => entry.organizationIdentifier);
}
