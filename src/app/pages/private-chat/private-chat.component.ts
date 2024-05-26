import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.css',
})
export class PrivateChatComponent implements OnInit {

  nickname: string = this.authService.firstname;
  fullname: string = this.authService.email;
  selectedUserId: string = '';
  private stompClient!: Stomp.Client;
  message: string = '';

  usernamePage = this.document.querySelector('#username-page');
  chatPage = this.document.querySelector('#chat-page');
  usernameForm = this.document.querySelector('#usernameForm');
  messageForm = this.document.querySelector('#messageForm');
  messageInput = this.document.querySelector('#message');
  connectingElement = this.document.querySelector('.connecting');
  chatArea = this.document.querySelector('#chat-messages');
  logout = this.document.querySelector('#logout');

  constructor(public authService: AuthService, @Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  ngOnInit(): void {
    this.connect();
    if (typeof window !== 'undefined') {
      window.onbeforeunload = () => this.onLogout();
    }

    

}

connect() {
    const socket = new SockJS(AuthService.serverIP + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnected.bind(this), this.onError.bind(this)); // Привязываем контекст к методам
    this.chatArea?.classList.remove('hidden');
  }

onConnected() {
    this.stompClient.subscribe(`/user/${this.nickname}/queue/messages`, this.onMessageReceived.bind(this)); // Привязываем контекст
    this.stompClient.subscribe('/user/public', this.onMessageReceived.bind(this)); // Привязываем контекст

    this.stompClient.send("/app/user.addUser",
      {},
      JSON.stringify({firstname: this.nickname, email: this.fullname, status: 'ONLINE'})
    );
    const element = this.document.querySelector('#connected-user-fullname');
    if(element) {
      element.textContent = this.fullname;
    }
}

  async findAndDisplayConnectedUsers() {
    let connectedUsers: any[] = [];
    this.http.get(AuthService.serverIP + '/users').subscribe(
      (res:any)=> {
        connectedUsers = res;
      }
    );
    connectedUsers.filter(user => user.firstname !== this.nickname);
    const connectedUsersList = this.document.getElementById('connectedUsers');
    if(connectedUsersList) {
      connectedUsersList.innerHTML = '';
    }
    connectedUsers.forEach(user => {
      this.appendUserElement(user, connectedUsersList);
      if (connectedUsers.indexOf(user) < connectedUsers.length - 1) {
        const separator = document.createElement('li');
        separator.classList.add('separator');
        if (connectedUsersList) {
          connectedUsersList.appendChild(separator);
        }
      }
    });
  }

  appendUserElement(user : any, connectedUsersList: HTMLElement | null) {
    const listItem = this.document.createElement('li');
    listItem.classList.add('user-item');
    listItem.id = user.firstname;
    const userImage = document.createElement('img');
    userImage.src = '../assets/user_icon.png';
    userImage.alt = user.fullName;
    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = user.fullName;

    const receivedMsgs = document.createElement('span');
    receivedMsgs.textContent = '0';
    receivedMsgs.classList.add('nbr-msg', 'hidden');

    listItem.appendChild(userImage);
    listItem.appendChild(usernameSpan);
    listItem.appendChild(receivedMsgs);

    listItem.addEventListener('click', this.userItemClick);

    if(connectedUsersList) {
      connectedUsersList.appendChild(listItem);
    }
  }

  userItemClick(event : Event) {
    document.querySelectorAll('.user-item').forEach(item => {
      item.classList.remove('active');
    });
    if(this.messageForm) 
    this.messageForm.classList.remove('hidden');

    const clickedUser = event.currentTarget as HTMLElement;
    if(clickedUser) {
      clickedUser.classList.add('active');

      this.selectedUserId = clickedUser.getAttribute('id') || '';
      this.fetchAndDisplayUserChat().then();

      const nbrMsg = clickedUser.querySelector('.nbr-msg');
      if(nbrMsg) {
        nbrMsg.classList.add('hidden');
        nbrMsg.textContent = '0';
      }
    }
    
  }

  async fetchAndDisplayUserChat() {
    let userChat: any[] = [];
    this.http.get(AuthService + '/messages/${nickname}/${selectedUserId}').subscribe((res:any) => {
      userChat = res;
    });
    if(this.chatArea) {
      this.chatArea.innerHTML = '';
    }
    userChat.forEach(chat => {
      this.displayMessage(chat.senderId, chat.content);
    });
    if(this.chatArea) {
      this.chatArea.scrollTop = this.chatArea.scrollHeight;
    }
  }

  displayMessage(senderId:string, content:any) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    if (senderId === this.nickname) {
        messageContainer.classList.add('sender');
    } else {
        messageContainer.classList.add('receiver');
    }
    const message = document.createElement('p');
    message.textContent = content;
    messageContainer.appendChild(message);
    if(this.chatArea) {
      this.chatArea.appendChild(messageContainer);
    }
  }

  onError() {
    
  }

  sendMessage() {
      if(this.message && this.stompClient) {
        const chatMessage = {
          senderId: this.nickname,
          recipientId: this.selectedUserId,
          content: this.message,
          timestamp: new Date()
        };
        this.stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        this.displayMessage(this.nickname, this.message);
        this.message = '';
      }
      if(this.chatArea) {
        this.chatArea.scrollTop = this.chatArea.scrollHeight;
      }
  }

  async onMessageReceived(payload : Stomp.Message) {
    await this.findAndDisplayConnectedUsers();
    console.log('Message received', payload);
    const message = JSON.parse(payload.body);
    if (this.selectedUserId && this.selectedUserId === message.senderId) {
        this.displayMessage(message.senderId, message.content);
        if(this.chatArea) {
          this.chatArea.scrollTop = this.chatArea.scrollHeight;
        }
    }

    if (this.selectedUserId) {
      const element = document.querySelector(`#${this.selectedUserId}`);
      if(element) {
        element.classList.add('active');
      }
      
    } else {
        if(this.messageForm) {
          this.messageForm.classList.add('hidden');
        }
    }

    const notifiedUser = document.querySelector(`#${message.senderId}`);
    if (notifiedUser && !notifiedUser.classList.contains('active')) {
        const nbrMsg = notifiedUser.querySelector('.nbr-msg');
        if(nbrMsg) {
          nbrMsg.classList.remove('hidden');
          nbrMsg.textContent = '';
        }
    }
  }

  onLogout() {
    this.stompClient.send("/app/user.disconnectUser",
      {},
      JSON.stringify({firstname: this.nickname, email: this.fullname, status: 'OFFLINE'})
    );
    window.location.reload();
  }

}
