export default function bancoLocal(loja: string, ean:string): string {
    return `http://10.27.242.188:3000/api/bca?loja=${+loja}&ean=${ean}`;
}