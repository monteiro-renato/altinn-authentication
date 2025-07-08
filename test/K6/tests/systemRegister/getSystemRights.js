import { check } from 'k6';

export function GetSystemRegisterRights(systemRegisterClient, systemId) {
    const res = systemRegisterClient.GetSystemRegisterRights(systemId)
    check(res, {
        'GetSystemRegisterRights - status code is 200': (r) => r.status === 200,
        'GetSystemRegisterRights - status text is 200 OK': (r) => r.status_text == "200 OK",
        'GetSystemRegisterRights - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    });
    return res.body
}
