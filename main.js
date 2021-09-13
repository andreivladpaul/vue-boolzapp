Vue.config.devtools = true;

const app = new Vue({
    el : '#root',
    
    data : {
        
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            } ,
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            } 
        ],
        currentImg: '',
        currentChat: '',
        lastSeen: '',
        lastAccess:'',
        newMessage: '',
    
        
    },
    methods: {
        
        lastMessage(e, index) {
            let arrayMessages = this.contacts[index].messages
            let lastMessage = arrayMessages[parseInt(arrayMessages.length - 1)].message;
            return lastMessage;
        },
        lastMessageDate(e,index) {
            let arrayMessages = this.contacts[index].messages;
            let lastMessageDate = arrayMessages[parseInt(arrayMessages.length - 1)].date;
            return lastMessageDate;
        },
        getContactImage(index) {
            const contact = this.contacts[index];
            const imagePath = `/img/avatar${contact.avatar}.jpg`;
            return imagePath
        },
        selectContact(index) {
            this.currentChat = this.contacts[index];

            const avatar = this.contacts[index].avatar;
            this.currentImg = `/img/avatar${avatar}.jpg`;

            let arrayMessages = this.contacts[index].messages
            this.lastSeen = arrayMessages[parseInt(arrayMessages.length - 1)].date;

        },
        getAnswer(){
            let date = dayjs().date() + '/' + dayjs().month() + '/' + dayjs().year() + ' ' + dayjs().hour() + ':' + dayjs().minute() + ':' + dayjs().second();
            this.currentChat.messages.push({date: date, message:'ok', status: 'received'});
        },
        
        addMessage() {
            let date = dayjs().date() + '/' + dayjs().month() + '/' + dayjs().year() + ' ' + dayjs().hour() + ':' + dayjs().minute() + ':' + dayjs().second();

            if(this.newMessage != '') {
                this.currentChat.messages.push({date: date ,message: this.newMessage, status: 'sent'});
                this.newMessage = ''
            }

            setTimeout(this.getAnswer,1000);  
            
            
        },
        
        scrollToBottom() {
            this.currentChat.messages.scrollTop = this.currentChat.messages.scrollHeight;
          }, 
        getMessages() {
            // Prior to getting your messages.
            shouldScroll = this.currentChat.messages.scrollTop + this.currentChat.messages.clientHeight === this.currentChat.messages.scrollHeight;
          /*
           * Get your messages, we'll just simulate it by appending a new one syncronously.
           */
            this.addMessage();
          // After getting your messages.
            if (!shouldScroll) {
                scrollToBottom();
            }
        },
        
    },
    mounted() {
        this.currentChat = this.contacts[0];
        const firstContact = this.currentChat;
        this.currentImg = `img/avatar${firstContact.avatar}.jpg`
        this.lastSeen = this.contacts[0].messages[parseInt(this.contacts[0].messages.length - 1)].date;
    }
}) 
