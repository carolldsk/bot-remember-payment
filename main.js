const { app, BrowserWindow, ipcMain, remote} = require('electron')
const express = require("express");

app.whenReady().then(() => {

    var ex = express();

    var mainWindow = new BrowserWindow({
        width: 1020, 
        height: 600,
        webPreferences:{nodeIntegration: true},
    });

    mainWindow.loadFile('index.html');

    // get url 
    ex.get("/whats/:num/:msg", async (req,res) => {
        var phone = req.params.num;
        var name  = 'Ana';

        let defaultMassage = `Oie, ${name}%0aEu sou seu novo Bot de alerta de pagamento!🤖%0a%0aTô passando para te lembrar que você precisa realizar o pagamento de *R$ 55,90* da sua conta da Netflix.%0a%0aNão esquece de enviar o comprovante de pagamento no grupo 😉%0aAté a próxima!`;

        sendMessage(phone,defaultMassage);
        res.send("Sending a message by Whatsapp..")
    });

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
                            ${mainWindow.show()}
                            enviado = false;
                        }
                    }
                    setInterval(interval, 5000);
            `);
        });
    }

    //listem port
    ex.listen(3400);

});
