import { check } from 'k6';

export function UpdateRightsVendorSystemRegister(systemRegisterClient, systemId, body) {
    const res = systemRegisterClient.UpdateRightsVendorSystemRegister(systemId, body)
    check(res, {
        'UpdateRightsVendorSystemRegister - status code is 200': (r) => r.status === 200,
        'UpdateRightsVendorSystemRegister - status text is 200 OK': (r) => r.status_text == "200 OK",
        'UpdateRightsVendorSystemRegister - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    });
    return res.body
}
