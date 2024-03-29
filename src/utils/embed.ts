import { APIEmbedField, ColorResolvable, EmbedAuthorOptions, EmbedBuilder } from "discord.js";
import { randomColor } from "./random";

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
    if (!color) color = "#91e3e2";
    super.setColor(color as ColorResolvable);

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
