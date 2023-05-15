const inputElem = document.querySelector('#input');
const btnElem = document.querySelector('#getCfg');

let addreses = [
    { isp: 'Hamrah 1', ip: 'dl1.hostpro.tech' },
    { isp: 'Hamrah 2', ip: 'dl2.hostpro.tech' },
    { isp: 'Hamrah 3', ip: 'dl3.hostpro.tech' },
    { isp: 'Irancell 1', ip: 'cdn1.hostpro.tech' },
    { isp: 'Irancell 2', ip: 'cdn2.hostpro.tech' },
    { isp: 'Irancell 3', ip: 'cdn3.hostpro.tech' }
]

// Random String generator
let makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

let fixedCfg = [];
btnElem.addEventListener('click', () => {
    let userCfg = inputElem.value;
    let hostSeprator = (host)=> {
        let hostArr = host.split('.');
        hostArr[0] = makeid(8);
        return hostArr.join('.');
    }
    try {
        let cfgObj = JSON.parse(atob(userCfg.trim().substring(8)));
        addreses.forEach(adds => {
            let tempObj = { ...cfgObj };
            tempObj.ps = `${'YoozNetwork'} [${adds.isp}]`;
            tempObj.add = adds.ip;
            tempObj.alpn = ""
            tempObj.fp = ""
            let a = tempObj.host
            if (a.indexOf("p-rayan.cloud") >= 0){
                tempObj.host = hostSeprator(".hostpro.tech");
                tempObj.sni = hostSeprator(".hostpro.tech");
            }
            if (a.indexOf("nazsuk.ga") >= 0){
                tempObj.host = hostSeprator(".hostpro.tech");
                tempObj.sni = hostSeprator(".hostpro.tech");
            }
            if (a.indexOf("mentally-retarded.tk") >= 0){
                tempObj.host = hostSeprator(".yoozmobile.tech");
                tempObj.sni = hostSeprator(".yoozmobile.tech");
            }
            else {
                tempObj.host = hostSeprator(tempObj.host);
            }
            
            tempObj.sni = tempObj.host
            fixedCfg.push(tempObj);
            tempObj = '';
        });
        console.log(fixedCfg);
        let fixedCfgText = '';
        fixedCfg.forEach(cfg => {
            fixedCfgText += `vmess://${btoa(JSON.stringify(cfg))}\n\n`;
        });
        navigator.clipboard.writeText(fixedCfgText).then(() => {
            alert("کانفیگ ها با موفقیت در کلیپ بورد ذخیره شدند.")
        })

        fixedCfg = [];
        fixedCfgText = '';
    } catch (error) {
        console.log(error);
        alert("عملیات موفق نبود، به نظر میرسد لینکی که وارد کرده اید ناقص یا اشتباه است.")
    }
});
