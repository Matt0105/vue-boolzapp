const app = new Vue({
    el: "#app",
    data: {
        person: 0,
        optMessage: null,
        myText: "",
        searchName: "",
        showClass: "", 
        lastAccess: "",
        chatMenu: false,
        contacts: [
            {
              name: "Michele",
              avatar: "_1",
              visible: true,
              messages: [
                {
                  date: "10/01/2020 15:30:55",
                  text: "Hai portato a spasso il cane?",
                  status: "sent",
                },
                {
                  date: "10/01/2020 15:50:00",
                  text: "Ricordati di dargli da mangiare",
                  status: "sent",
                },
                {
                  date: "10/01/2020 16:15:22",
                  text: "Tutto fatto!",
                  status: "received",
                },
              ],
            },
            {
              name: "Fabio",
              avatar: "_2",
              visible: true,
              messages: [
                {
                  date: "20/03/2020 16:30:00",
                  text: "Ciao come stai?",
                  status: "sent",
                },
                {
                  date: "20/03/2020 16:30:55",
                  text: "Bene grazie! Stasera ci vediamo?",
                  status: "received",
                },
                {
                  date: "20/03/2020 16:35:00",
                  text: "Mi piacerebbe ma devo andare a fare la spesa.",
                  status: "sent",
                },
              ],
            },
          
            {
              name: "Samuele",
              avatar: "_3",
              visible: true,
              messages: [
                {
                  date: "28/03/2020 10:10:40",
                  text: "La Marianna va in campagna",
                  status: "received",
                },
                {
                  date: "28/03/2020 10:20:10",
                  text: "Sicuro di non aver sbagliato chat?",
                  status: "sent",
                },
                {
                  date: "28/03/2020 16:15:22",
                  text: "Ah scusa!",
                  status: "received",
                },
              ],
            },
            {
              name: "Luisa",
              avatar: "_4",
              visible: true,
              messages: [
                {
                  date: "10/01/2020 15:30:55",
                  text: "Lo sai che ha aperto una nuova pizzeria?",
                  status: "sent",
                },
                {
                  date: "10/01/2020 15:50:00",
                  text: "Si, ma preferirei andare al cinema",
                  status: "received",
                },
              ],
            },
          ]
    },
    methods: {

      lastMessage(messages) {

        return messages[messages.length - 1].text;
      },

      lastMessageDate(messages) {

        return messages[messages.length - 1].date;
      },

      sendMessage() {
        
        if(this.myText.trim().length) {
  
          let myMessage = {
            text: this.myText,
            date: this.getDate(),
            status: "sent",
          }
  
          this.contacts[this.person].messages.push(myMessage);

          this.myText = "";

          this.answer();
        }
      },

      answer() {

        
        setTimeout(() => {

          let answerMessage = {
            text: "ok",
            date: this.getDate(),
            status: "received"
          }
        this.contacts[this.person].messages.push(answerMessage);
        }, 1000)
      },

      getDate() {

        let now = new Date();
          let date = "";
  
          date += now.getDate() + "/";
          date += now.getMonth()+1 + "/";
          date += now.getFullYear() + " ";
  
          date += now.getHours() + ":";
          date += now.getMinutes() + ":";
          date += now.getSeconds();

          return date;
      },

      searchChat() {
   
        if(this.searchName.trim() != "") {

          this.contacts.forEach((element) => {
            if(element.name.toLowerCase().startsWith(this.searchName)) {
              element.visible = true;
            }
            else {
              element.visible = false;
            }
          });

        }
        else {
          this.contacts.forEach(element => {
            element.visible = true;
          });
        }

      },
      selectChat() {
        if(window.screen.width < 900) {
          right.classList.add("full-size");
          right.classList.remove("unshow");
          left.classList.add("unshow");
          back.classList.remove("unshow");
        }
        
      },
      //da rivedere
      deleteMessage(messages) {
        
        if(messages.length > 1) {
          messages.splice(this.optMessage, 1);
        }
        else {
          messages[0].text = ""; 
          messages[0].date = ""; 
        }
        this.optMessage = null;

      },

      deleteAllMessages() {
        this.contacts[this.person].messages.splice(0,this.contacts[this.person].messages.length - 1);
        
        this.contacts[this.person].messages[0].text = "";
        this.contacts[this.person].messages[0].date = "";
          
        
        this.chatMenu = false;
      },

      deleteChat() {
        this.contacts.splice(this.person, 1);

        this.chatMenu = false;
      }
    },
    created() {


    }
});

const back = document.querySelector(".back-chat");
const left = document.querySelector(".left-side-app");
const right = document.querySelector(".right-side-app");

back.addEventListener("click", function() {

  left.classList.remove("unshow");
  left.classList.add("full-size");
  right.classList.add("unshow");
  right.classList.remove("full-size");
});

if(window.screen.width < 900) {
  right.classList.add("full-size");
  left.classList.add("unshow");
  back.classList.remove("unshow");
}
else{
  right.classList.remove("full-size");
  left.classList.remove("unshow");
  back.classList.add("unshow");
}

window.addEventListener("resize", function(){
  
  if(window.screen.width < 900) {
    right.classList.add("full-size");
    if(!right.classList.contains("unshow"))
      left.classList.add("unshow");
    back.classList.remove("unshow");
  }
  else{
    right.classList.remove("unshow");
    right.classList.remove("full-size");
    left.classList.remove("unshow");
    left.classList.remove("full-size");
    back.classList.add("unshow");
  }
});