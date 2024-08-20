const fetch = require('node-fetch');

const getTokenSignature = async function (param) {

    if (!param.code) return { error: 'Parâmetro CODE vazio', location: arguments.callee.name };
    if (!param.psc) return { error: 'Parâmetro PSC vazio', location: arguments.callee.name };   

    if (!process.env.CLIENT_ID) return { error: 'Parâmetro CLIENT_ID vazio', location: arguments.callee.name };
    if (!process.env.CLIENT_SECRET) return { error: 'Parâmetro CLIENT_SECRET vazio', location: arguments.callee.name };  

    const url = 'https://cloud.certillion.com/css/restful/application/oauth/token';
    
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('manager_id', process.env.CLIENT_ID);
    params.append('manager_secret', process.env.CLIENT_SECRET);
    params.append('code_verifier', 'uNzMfYR1h2VUa_3bXuZAIt43HfN8Gh_-HrOq2WOr5uI');
    params.append('code', param.code);
    params.append('redirect_uri', '');
    params.append('psc', param.psc);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error: 'Erro ao buscar o token' };
    }
    
};

module.exports = { getTokenSignature };
