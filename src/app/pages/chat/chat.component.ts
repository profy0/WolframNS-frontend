import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  message: string = '';
  username: string = '';
  connectingInfo: string = 'Connecting...';
  isChatHidden: boolean = true;
  isConnected: boolean = false;
  private stompClient!: Stomp.Client;
  private colors: string[] = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  constructor(public authService: AuthService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    // Initialize anything if needed
  }

  connect() {
    if (this.username) {
      this.isChatHidden = false;
      const socket = new SockJS(AuthService.serverIP + '/ws');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({"ngrok-skip-browser-warning": "true"}, this.onConnected, this.onError);
    }
  }

  onConnected = () => {
    // subscribe to public topic
    this.stompClient.subscribe('/topic/public', (payload) => {
      const msg = JSON.parse(payload.body);
      const msgElement = this.document.createElement('li');

      if (msg.type === 'JOIN') {
        msgElement.classList.add('event-message');
        msg.content = `${msg.senderId} joined!`;
      } else if (msg.type === 'LEAVE') {
        msgElement.classList.add('event-message');
        msg.content = `${msg.senderId} left!`;
      } else {
        msgElement.classList.add('chat-message');

        const avatarElement = this.document.createElement('i');
        const avatarText = this.document.createTextNode(msg.senderId[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style.backgroundColor = this.getAvatarColor(msg.senderId);
        msgElement.appendChild(avatarElement);

        const usernameElement = this.document.createElement('span');
        const usernameText = this.document.createTextNode(msg.senderId);
        usernameElement.appendChild(usernameText);
        msgElement.appendChild(usernameElement);
      }

      const textElement = this.document.createElement('p');
      const msgText = this.document.createTextNode(msg.content);
      textElement.appendChild(msgText);
      msgElement.appendChild(textElement);

      const messageArea = this.document.getElementById('messageArea') as HTMLUListElement;
      if (messageArea) {
        messageArea.appendChild(msgElement);
        messageArea.scrollTop = messageArea.scrollHeight;
      }
    });

    // tell username to the server
    this.stompClient.send(
      '/app/chat.addUser',
      {"ngrok-skip-browser-warning": "true"},
      JSON.stringify({ senderId: this.username, type: 'JOIN' })
    );

    this.isConnected = true;
  }

  onError = (error: any) => {
    this.connectingInfo = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    console.error('WebSocket connection error:', error);
  }

  getAvatarColor(messageSender: string): string {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % this.colors.length);
    return this.colors[index];
  }

  sendMessage() {
    if (this.message && this.stompClient) {
      const chatMessage = {
        senderId: this.username,
        content: this.message,
        type: 'CHAT'
      };
      this.stompClient.send(
        '/app/chat.sendMessage',
        {"ngrok-skip-browser-warning": "true"},
        JSON.stringify(chatMessage)
      );
      this.message = '';
    }
  }
}
