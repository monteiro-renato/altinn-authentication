import { check } from 'k6';

export function UpdateVendorSystemRegister(systemRegisterClient,
    systemId,
    vendorId,
    name,
    clientId,
    description,
    rights,
    allowedRedirectUrls
) {
    const res = systemRegisterClient.UpdateVendorSystemRegister(
        systemId,
        vendorId,
        name,
        clientId,
        description,
        rights,
        allowedRedirectUrls
    )
    check(res, {
        'UpdateVendorSystemRegister - status code is 200': (r) => r.status === 200,
        'UpdateVendorSystemRegister - status text is 200 OK': (r) => r.status_text == "200 OK",
        'UpdateVendorSystemRegister - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    });
    return res.body
}
