export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: number;


    constructor(id: string, subject: string, msgText: string, sender: number) {
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.sender = sender;
        
    }

    
}