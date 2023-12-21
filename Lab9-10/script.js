const button = document.getElementById('Sendmessage');
button.onclick = function validate(){

    var x=document.forms['form']['Yourname'].value;
    var y=document.forms['form']['YourEmail'].value;
    var z=document.forms['form']['Subject'].value;
    var f=document.forms['form']['message'].value;

    if (x.length==0){
        document.getElementById('Yournamex').innerHTML='*данное поле обязательно для заполнения';
        return false;
    }

    if (y.length==0){
        document.getElementById('YourEmailx').innerHTML='*данное поле обязательно для заполнения';
        return false;
    }

    at=y.indexOf("@");
    dot=y.indexOf(".");

    if (at<1 || dot <1){
        document.getElementById('YourEmailx').innerHTML='*email введен не верно';
        return false;
    }
    if (z.length==0){
        document.getElementById('Subjectx').innerHTML='*данное поле обязательно для заполнения';
        return false;
    }
    if (f.length==0){
        document.getElementById('messagex').innerHTML='*данное поле обязательно для заполнения';
        return false;
    }
    sendUser();
}



async function sendUser(user) {
    const response = await fetch("http://localhost:8000", { 
        mode: 'no-cors',    
        method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.forms['form']['Yourname'].value,
                email: document.forms['form']['YourEmail'].value,
                site: document.forms['form']['Subject'].value,
                message: document.forms['form']['message'].value
        })
    });
    const responseText = await response.text();
    console.log(responseText);
}