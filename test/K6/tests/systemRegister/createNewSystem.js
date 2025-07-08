import { check } from 'k6';

export function CreateNewSystem(
    systemRegisterClient,
    vendorId,
    name,
    clientId,
    description,
    rights,
    allowedRedirectUrls,
    accessPackages
) {
    const res = systemRegisterClient.CreateSystemRegister(
        vendorId,
        name,
        clientId,
        description,
        rights,
        allowedRedirectUrls,
        accessPackages
    )
    check(res, {
        'CreateNewSystem - status code is 200': (r) => r.status === 200,
        'CreateNewSystem - status text is 200 OK': (r) => r.status_text == "200 OK",
        'CreateNewSystem - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    });
    return res.body
}
