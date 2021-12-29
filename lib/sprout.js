
const FormData = require('form-data');
const axios = require('axios');

const { USERNAME, PASSWORD, SPROUT_WEBBUNDY_URL } = process.env;


async function getSproutToken(){
    
    const resp = await axios.get(SPROUT_WEBBUNDY_URL);
    const re = /_RequestVerificationToken" type="hidden" value="(.+)"/
    const matches = (resp.data).match(re);
    return matches[1];
}

// @see:  https://github.com/axios/axios#response-schema
async function login() {
    const sproutToken = await getSproutToken();
    const form = new FormData();

    form.append('Username', USERNAME);
    form.append('Password', PASSWORD);
    form.append('__RequestVerificationToken', sproutToken);
    form.append('typeClock', 'ClockIn');

    axios.post(`${SPROUT_WEBBUNDY_URL}/ClockIn`, form, { headers: form.getHeaders() })
}

async function logout(){
    const sproutToken = await getSproutToken();
    const form = new FormData();

    form.append('Username', USERNAME);
    form.append('Password', PASSWORD);
    form.append('__RequestVerificationToken', sproutToken);
    form.append('typeClock', 'ClockOut');

    return axios.post(`${SPROUT_WEBBUNDY_URL}/ClockIn`, form, { headers: form.getHeaders() })
}





exports.getSproutToken = getSproutToken;
exports.login = login;
exports.logout = logout;
