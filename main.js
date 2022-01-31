const { app, BrowserWindow, ipcMain, remote} = require('electron')
const express = require("express");

app.whenReady().then(() => {

  var ex = express();

  var mainWindow = new BrowserWindow(

    {width: 800, height: 600,webPreferences:{

      nodeIntegration: true,

      },

  }); 

  ex.get("/whats/:num/:msg", async (req,res) => {
    var phone   = req.params.num;
    var message = req.params.msg;

    enviar(phone,message);
    res.send("Sending a message by Whatsapp..")
  });

  async function enviar(phone,message){
  
    mainWindow.loadURL("https://web.whatsapp.com/send?phone="+phone+"&text="+message, 
    { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36' });

    mainWindow.webContents.once('dom-ready', () => {

        mainWindow.webContents.executeJavaScript(`
                console.log("This loads no problem!");
                var enviado = false;
                
                function tempo(){
                
                    var btsend = document.getElementsByClassName("_4sWnG")[0];
                    var inputSend = document.getElementsByClassName("_13NKt")[1];
                    
                    if(typeof inputSend !== "undefired" && inputSend.textContent && !enviado){
                        btsend.click();
                        enviado = true;
                      
                    }else if(enviado) {
                    ${mainWindow.show()}
                        enviado = false;
                    }
                }
                setInterval(tempo, 5000);
        `);
    });
  }
  ex.listen(3400);
});
