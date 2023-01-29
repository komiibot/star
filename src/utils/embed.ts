import { APIEmbedField, ColorResolvable, EmbedBuilder } from "discord.js";

export class CustomEmbed extends EmbedBuilder {
    constructor(error?: boolean, text?: string, title?: string) {
        super();

        if (error) {
            super.setTitle(`<:failed:1067965647335731290> ${title ? title : ""}`);
            super.setColor("#a8324a");
            super.setDescription(text);

            return this;
        }
    }

    setTitle(text: string) {
        super.setTitle(text);

        return this;
    }

    setDescription(text: string): this {
        if (text.length > 2000) text.substring(0, 2000);
        super.setDescription(text);
        
        return this;
    }

    setColor(color?: ColorResolvable): this {
        // if(!color) color = "#b09ae3";
        if(!color) color = "#d5e4eb";
        super.setColor(color);

        return this;
    }

    setFields(fields: APIEmbedField[]) {
        if (fields && fields.length > 0) super.addFields(fields);

        return this;
    }

    setImage(url: string) {
        super.setImage(url);

        return this;
    }

    setThumbnail(url: string) {
        super.setThumbnail(url);

        return this;
    }
}