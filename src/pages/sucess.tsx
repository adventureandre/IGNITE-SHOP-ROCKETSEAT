import Link from "next/link";
import { ImageConteiner } from "@/styles/pages/sucess";
import { SucessConteiner } from "@/styles/pages/sucess";

export default function Sucess() {
    return (
        <SucessConteiner>
            <h1>Compra efetuada!</h1>
            <ImageConteiner>

            </ImageConteiner>

            <p>
                Uhuul <strong>Andre Luiz</strong>, sua  <strong>Camiseta</strong> já está a caminho da sua casa.
            </p>
            <Link href='' >Voltar ao catálago </Link>
        </SucessConteiner>
    )

}