import { encode } from "base-64";

const urls = {
    base_uri: 'http://127.0.0.1:5000/todo/api/v1.0',
    endpoints: {
        get: '/tasks',
        //get_one: '/employees/{id}',
        put_one: '/tasks',
        post_one: '/tasks',
        delete_one: '/tasks',
    },
};


class api{
    get = (key, params) => {
        var key = key || 'get';
        var params = params || {};
        var id = params.id || '';
        
        console.log('id ' + id)

        let url = (id === '') ? `${urls.base_uri}${urls.endpoints.get}`: `${urls.base_uri}${urls.endpoints.get}/${id}` 
        console.log(url);
        
        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encode('miguel:python'),
        });
        
        return fetch(url,  {
                method: 'GET',
                mode:'cors',
                headers: header,
        }).then(
            response => response.json()
        )
    } 

    post = (key, params) => {
        var key = key || 'post_one';
        var params = params || {};
        var content = params.content || '';

        let url = `${urls.base_uri}${urls.endpoints[key]}`; 
        console.log(`${urls.base_uri}${urls.endpoints[key]}`);

        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encode('miguel:python'),
        });

        return fetch(url,  {
                method: 'POST',
                mode:'cors',
                headers: header,
                body: JSON.stringify(content),
        }).then(
                response => response.json()
        )
    } 
    /*
    delete = (key, params) => {
        return();
    }
    put = (key, params) => {
        return();
    }
    patch = (key, params) => {
        return();
    }*/
}

export default api;