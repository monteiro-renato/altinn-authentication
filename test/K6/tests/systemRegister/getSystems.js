import { check } from 'k6';

export function GetSystems(systemRegisterClient) {
    const res = systemRegisterClient.GetAllSystemsFromRegister()
    check(res, {
        'GetSystems - status code is 200': (r) => r.status === 200,
        'GetSystems - status text is 200 OK': (r) => r.status_text == "200 OK",
        'GetSystems - body is not empty': (r) => {
            const res_body = JSON.parse(r.body);
            return res_body !== null && res_body !== undefined;
        }
    });
    return res.body
}
