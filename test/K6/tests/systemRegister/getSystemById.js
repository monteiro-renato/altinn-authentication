import { check } from 'k6';

export function GetSystemById(systemRegisterClient, systemId) {
    const res = systemRegisterClient.GetSystemRegisterById(systemId)
    check(res, {
        'GetSystemById - status code is 200': (r) => r.status === 200,
        'GetSystemById - status text is 200 OK': (r) => r.status_text == "200 OK",
        'GetSystemById - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    });
    return res.body
}
