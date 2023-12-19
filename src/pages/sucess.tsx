import Link from "next/link";
import { ImageConteiner } from "@/styles/pages/sucess";
import { SucessConteiner } from "@/styles/pages/sucess";
import { GetServerSideProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SucessProps {
    customerName: string;
    product: {
        name: string;
        imageUrl: string;
    }

}

export default function Sucess({ customerName, product }: SucessProps) {
    return (
    <>
    <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
    </Head>
        <SucessConteiner>
            <h1>Compra efetuada!</h1>
            <ImageConteiner>
                <Image src={product.imageUrl} width={120} height={110}  alt=""/>
            </ImageConteiner>

            <p>
                Uhuul <strong>{customerName}</strong>, sua  <strong>{product.name}</strong> já está a caminho da sua casa.
            </p>
            <Link href='' >Voltar ao catálago </Link>
        </SucessConteiner>
        </>
    )

}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    if (!query.sessionId) {
    return{
        redirect:{
            destination: '/',
            permanent: false,
        }
    }
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
    })

    const customerName = session.customer_details?.name;
    const product = session.line_items?.data[0].price?.product as Stripe.Product;

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}

