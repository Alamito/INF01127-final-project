export class _Card {
    title: string;
    description: string;
    image: any;
    unavailable: boolean;

    constructor(title: string, description: string, image: any, unavailable: boolean) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.unavailable = unavailable;
    }
}
