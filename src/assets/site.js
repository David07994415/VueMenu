const swFire =(title,text,icon)=>{  
    return Swal.fire({
            title: title,
            text: text,
            icon: icon,  // success error
            confirmButtonText: '確定'
        })
}

const handleErrorMsgs =(msg)=> {  
    if(msg ==null || msg === undefined) {
        return ""
    }else if(typeof msg === 'string'){
        return msg;
    }else if(Array.isArray(msg)){
        return msg.join(',');
    }
}

const getCookie = ()=> {
    const cookies = document.cookie.split(';').map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith('todolistToken='));
    return tokenCookie ? tokenCookie : "";
}

const clearCookie =()=> {
    document.cookie = 'todolistToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const apiRootUrl = "https://todolist-api.hexschool.io"