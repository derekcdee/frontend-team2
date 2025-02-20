import $ from 'jquery';


export function _ajax(settings={}) {
    settings.url = `http://localhost:5000${settings.url}`;

    return $.ajax(settings)
        .then((res) => {
            console.log('AJAX Reponse:', res);
            return res; 
        }).catch((err) => {
            console.error('AJAX Request Failed:', err);
            throw err;
        });

        // .then((res) => {
        //     const response = JSON.parse(res);

        //     if (typeof response.errors === 'string') {
        //         // receiveResponse();
        //         return Promise.reject();
        //     } else {
        //         return response;
        //     }
        //     return res;
        // })
}

// test backend call
export function test() {
    _ajax({
        url: "/products",
        method: "GET",
    });
}

/*==============================================================
# Users
==============================================================*/



/*==============================================================
# Products
==============================================================*/
