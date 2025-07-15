import React, { FC, ReactNode } from "react"
import Providers from "./providers";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: {
        default: "SneakSale",
        template: "%s | Embeddable"
    },
}

interface Props {
    children?: ReactNode;
}

const RootLayout = async (props: Props) => {
    const { children } = props;

    return (
        <html lang="en">
            <head>
                <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap"
                  rel="stylesheet"
                />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout