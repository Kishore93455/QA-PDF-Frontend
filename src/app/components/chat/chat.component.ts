import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ErrorService } from '../../services/error.service';



@Component({
  selector: 'app-chat',   
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: Array<{ sender: string, text: string }> = [];
  question: string = '';
  isLoading: boolean = false;

  constructor(
    private chatService: ChatService, 
    private errorService: ErrorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['question']) {
        this.question = params['question'];
      }
    });
  }

  reset(): void {
    this.messages = [];
  }

  goback(): void {
    window.history.back();
  }

  sendQuestion(): void {
    if (this.question.trim() !== '') {
      this.messages.push({
        sender: 'You',
        text: this.question
      });

      const currentQuestion = this.question;
      this.question = '';
      this.isLoading = true;

      this.chatService.chat(currentQuestion).subscribe({
        next: (response) => {
          const neatResponse = this.modifyData(response.answer);
          this.messages.push({
            sender: 'AI',
            text: neatResponse
          });
          this.isLoading = false;
        },
        error: (error) => {
          if (error.message && error.message.includes('http')) {
            this.errorService.setError("Error While Processing Your Request");
          }
          this.messages.push({
            sender: 'System',
            text: 'Sorry, there was an error processing your request.'
          });
          this.isLoading = false;
        }
      });
    }
  }

  
  modifyData(text: string): string {
    const lines = text.split('\n');
    let formatted: string[] = [];
    let inCodeBlock = false;

    for (let line of lines) {
      line = line.trim();

      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        formatted.push(inCodeBlock ? '\n[CODE BLOCK START]' : '[CODE BLOCK END]\n');
        continue;
      }

      if (inCodeBlock) {
        formatted.push(`  ${line}`);
        continue;
      }

      // Section headers with ###
      if (line.startsWith('###')) {
        formatted.push('\n' + line.replace(/^###\s*/, '').toUpperCase() + '\n' + '-'.repeat(40));
      }
      // Subheaders with ##
      else if (line.startsWith('##')) {
        formatted.push('\n' + line.replace(/^##\s*/, '').toUpperCase());
      }
      // Numbered lists
      else if (/^\d+\.\s+/.test(line)) {
        formatted.push(`  ${line}`);
      }
      // Bullet points
      else if (/^- /.test(line)) {
        formatted.push(`  • ${line.slice(2)}`);
      }
      // Indented sub-bullets
      else if (/^ {2,}- /.test(line)) {
        formatted.push(`    ◦ ${line.trim().slice(2)}`);
      }
      // Empty lines
      else if (line === '') {
        formatted.push('');
      }
      // Paragraphs
      else {
        formatted.push(line);
      }
    }

    return formatted.join('\n').trim();
  }
}
