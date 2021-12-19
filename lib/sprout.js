
const FormData = require('form-data');
const axios = require('axios');

const { USERNAME, PASSWORD, SPROUT_WEBBUNDY_URL } = process.env;

export const login = async () => {
    const sproutToken = await getSproutToken();
    const form = new FormData();

    form.append('Username', USERNAME);
    form.append('Password', PASSWORD);
    form.append('__RequestVerificationToken', sproutToken);
    form.append('typeClock', 'ClockIn');

    axios.post('https://xlr8clock.hrhub.ph/WebBundy/ClockIn', form, { headers: form.getHeaders() })
}

export const logout = async () => {
    const sproutToken = await getSproutToken();
    const form = new FormData();

    form.append('Username', USERNAME);
    form.append('Password', PASSWORD);
    form.append('__RequestVerificationToken', sproutToken);
    form.append('typeClock', 'ClockOut');

    return axios.post('https://xlr8clock.hrhub.ph/WebBundy/ClockIn', form, { headers: form.getHeaders() })
}


export const getSproutToken = async () => {
    const html = await axios.get(SPROUT_WEBBUNDY_URL);
    const re = /_RequestVerificationToken" type="hidden" value="(.+)"/
    const matches = html.match(re);
    return matches(1);
}
