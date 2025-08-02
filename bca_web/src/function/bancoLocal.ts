export default function bancoLocal(loja: string, ean:string): string {
    return `http://192.168.15.14:3000/api/bca?loja=${loja}&ean=${ean}`;
}