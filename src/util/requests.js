import $, { data } from 'jquery';
import { toast } from 'react-toastify';


export function _ajax(settings={}) {
    settings.url = `http://localhost:5000${settings.url}`;
    settings.contentType = "application/json"; // Set content type to JSON
    settings.dataType = "json"; // Expect JSON response
    if (settings.data) {
        settings.data = JSON.stringify(settings.data); // Send data as JSON string
    }

    return $.ajax(settings)
        .then((res) => {
            console.log(res);
            toast.success(`Operation successful: ${res}`);
            return res; 
        }).catch((err) => {
            console.log(err);
            toast.error(`Operation failed: ${err.status} ${err.statusText}`);
            throw err;
        });
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
export function login(email, password) {
    _ajax({
        url: "/account/login",
        method: "POST",
        data: { email, password }
    });
}


/*==============================================================
# Products
==============================================================*/


/*==============================================================
# Users
==============================================================*/
export function getUsers() {
    _ajax({
        url: "/admin/users",
        method: "GET",
    });
}