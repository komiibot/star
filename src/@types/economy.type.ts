type ItemType = {
    CARD
    TOOL
    COLLECTABLE
    PACK
}

export interface ItemsInterface {
    id: string;
    name: string;
    emoji: string;
    description?: string;
    shortDescription?: string;
    aliases?: string[];

    stackable?: boolean;
    maxQuanity?: number;
    limited: boolean;
    rarity: number;
    durability: number;
    type: ItemType;

    price: number;
    sellPrice?: number;
    lootBox: boolean;

    crafting?: {
        ingredients: string[];
        time: number;
    }
}