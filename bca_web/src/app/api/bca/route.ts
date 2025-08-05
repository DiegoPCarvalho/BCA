import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';
import bancoApi from '@/function/bancoApi';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const loja = searchParams.get('loja');
  const ean = searchParams.get('ean');

  if (!loja || !ean) {
    return NextResponse.json(
      { error: 'Parâmetros loja e ean são obrigatórios' },
      { status: 400 }
    );
  }

  try {
    const url = `${bancoApi()}?loja=${loja}&ean=${ean}`;

    const agent = new https.Agent({
      rejectUnauthorized: false, // aceita certificado autoassinado
    });

    const { data } = await axios.get(url, 
      { httpsAgent: agent }
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Erro ao acessar API:', error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar dados', detalhe: error.message },
      { status: 500 }
    );
  }
}