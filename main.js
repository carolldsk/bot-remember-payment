const dotenv = require('dotenv');
const express = require('express');

const { app, BrowserWindow } = require('electron')
const { getPayerName, getCurrentMonth, getCurrentDay  } = require('./resources/js/helper');
const { dateRemember } = require('./resources/js/enum');

dotenv.config({ path: './.env' });

const ex = express();
  

app.whenReady().then(() => {

    // build window
    const mainWindow = new BrowserWindow({
        width: 1020, 
        height: 600,
        webPreferences:{nodeIntegration: true},
    });

    // loading landing page
    mainWindow.loadFile('index.html');

 
    (() => {
        let date = getCurrentDay();

        if(dateRemember.includes(date)){

            let month = getCurrentMonth();
            let name = getPayerName(month);

            /*
            //Get Phone Number
            ex.get('/whats/:num', (req, res, next) => {
            
                console.log(phone);

                var phone = req.params.num;
                let defaultMassage = `Oie, ${name}%0aEu sou seu novo Bot de alerta de pagamento!🤖%0a%0aTô passando para te lembrar que você precisa realizar o pagamento de *R$ 55,90* da sua conta da Netflix.%0a%0aNão esquece de enviar o comprovante de pagamento no grupo 😉%0aAté a próxima!`;

                res.send("Sending a message by Whatsapp..")
                sendMessage(phone,defaultMassage);
            });

            */


           
           var phone = 12121212;
           let defaultMassage = `Oie, ${name}%0aEu sou seu novo Bot de alerta de pagamento!🤖%0a%0aTô passando para te lembrar que você precisa realizar o pagamento de *R$ 55,90* da sua conta da Netflix.%0a%0aNão esquece de enviar o comprovante de pagamento no grupo 😉%0aAté a próxima!`;
           
           console.log(phone);
           sendMessage(phone,defaultMassage);
            
        }
    })()
    


    async function sendMessage(phone,defaultMassage){
    
        mainWindow.loadURL("https://web.whatsapp.com/send?phone="+phone+"&text="+defaultMassage, 
        { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36' });
    
        mainWindow.webContents.once('dom-ready', () => {
    
            mainWindow.webContents.executeJavaScript(`
                    console.log("This loads no problem!");
                    var sent = false;
                    
                    function interval(){
                    
                        var btsend = document.getElementsByClassName("_4sWnG")[0];
                        var inputSend = document.getElementsByClassName("_13NKt")[1];
                        
                        if(typeof inputSend !== "undefired" && inputSend.textContent && !sent){
                            btsend.click();
                            sent = true;
                        
                        }else if(sent) {
                            ${mainWindow.hide()}
                            enviado = false;
                        }
                    }
                    setInterval(interval, 5000);
            `);
        });
    }

    /*
    //landing page
    ex.get('/',function(req,res) {
        ex.use(express.static(__dirname));
        res.sendFile(__dirname + "/index.html");
    });

    //listem port
    ex.listen(process.env.PORT || 3400, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, ex.settings.env);
    });

    */

});
