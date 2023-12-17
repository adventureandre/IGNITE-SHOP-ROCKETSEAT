import {GetStaticProps} from "next"
import Image from "next/image"

import {HomeConteiner, Product} from "@/styles/pages/home"


import {useKeenSlider} from "keen-slider/react";
import 'keen-slider/keen-slider.css';

import {stripe} from "@/lib/stripe"
import Stripe from "stripe";

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageUrl: string;
        price: string
    }[]
}

export default function Home({products}: HomeProps) {

    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48
        }
    })


    return (
        <HomeConteiner ref={sliderRef} className="keen-slider">
            {products.map(product => {
                return (
                    <Product href={`/product/${product.id}`} key={product.id} className="keen-slider__slide">

                        <Image src={product.imageUrl} width={520} height={480} alt=""/>
                        <footer>
                            <strong>{product.name}</strong>
                            <span>{product.price}</span>
                        </footer>
                    </Product>
                )
            })}
        </HomeConteiner>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    })

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-Br',{
                style: 'currency',
                currency: 'BRL'
            }).format(price.unit_amount! / 100),
        }
    })

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 2 //2hours
    }

}