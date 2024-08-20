// utils.js
const insertToken = async function (params){

    if (!params.session) return { error: 'Parâmetro SESSION vazio', location: arguments.callee.name };
    if (!params.psc) return { error: 'Parâmetro PSC vazio', location: arguments.callee.name };   
    if (!params.expires) return { error: 'Parâmetro EXPIRES vazio', location: arguments.callee.name };
    if (!params.code) return { error: 'Parâmetro CODE vazio', location: arguments.callee.name }; 
    if (!params.access_token) return { error: 'Parâmetro ACCESS_TOKEN vazio', location: arguments.callee.name };

    const { createClient } = require("@supabase/supabase-js");

    const supabase = createClient(process.env.URL, process.env.KEY);
    
    const { data, error }  = await supabase.rpc("sign_insert_code", { data: params });  

    return data[0];

};

module.exports = { insertToken };
