import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import bancoApi from '@/function/bancoApi';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const loja = searchParams.get('loja');
  const ean = searchParams.get('ean');

  if (!loja || !ean) {
    return NextResponse.json({ error: 'Parâmetros loja e ean são obrigatórios' }, { status: 400 });
  }

  try {
    // Monta a URL externa usando os parâmetros
    const url = `${bancoApi()}?loja=${loja}&ean=${ean}`;

    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados', status: 500 }, { status: 500 });
  }
}