export class Document {
    public id: number;
    public name: string;
    public description: string;
    public docUrl: string;


    constructor(id: number, name: string, description: string, url: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.docUrl = url;
        
    }
}