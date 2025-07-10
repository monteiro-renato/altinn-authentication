export { check } from 'k6';
export { group } from 'k6';
export { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
export { SystemRegisterApiClient } from "../../clients/systemRegister.js"
export {
    PersonalTokenGenerator,
    EnterpriseTokenGenerator,
    MaskinportenAccessTokenGenerator
} from "https://raw.githubusercontent.com/Altinn/altinn-platform/a3a8f98228bbce2887462612bb660ecd42e6039a/libs/k6/src/index.js"