import { ICollectionType, IConfig } from "./lib/app/types";

const CONFIG: IConfig = {
    coinDenom: "uandr",
    name: "Sneaker Resale Platform",
    chainId: "galileo-4",
    createdDate: "2024-03-31T19:01:01.148Z",
    modifiedDate: "2024-03-31T19:01:01.148Z",
    id: "andromeda",
    collections: [
        {
            auction:
                "andr1yfyxy972x5kehha8lw7mwjfgwt64e7gqhr0x0ztx8h9e08ggzmkqg6r39f",
            cw721: "andr1lgjucum2j99z39x2ys33zv95zvj2hqmfdvmldmy7yq2nc0ull06svzgdls",
            name: "ADIDAS SL 72",
            description: "Mens Originals",
            type: ICollectionType.AUCTION,
            id: "auction",
            featured: "ANDR1"
        },
    ],
};

export default CONFIG;
