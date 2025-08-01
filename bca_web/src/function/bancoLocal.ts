export default function bancoLocal(loja: string, ean:string): string {
    return `http://192.168.1.227:3000/api/bca?loja=${loja}&ean=${ean}`;
}