import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'plan-hotspots.json');

async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

async function writeData(data: any) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await readData();
  // expect body to be a hotspot or array
  const now = Date.now();
  if (Array.isArray(body)) {
    const items = body.map((b: any, i: number) => ({ id: b.id ?? `pt-${now}-${i}`, ...b }));
    const merged = [...data, ...items];
    await writeData(merged);
    return NextResponse.json({ ok: true, data: merged });
  }

  const item = { id: body.id ?? `pt-${now}`, ...body };
  data.push(item);
  await writeData(data);
  return NextResponse.json({ ok: true, item });
}

export async function PUT(request: Request) {
  const body = await request.json();
  if (!body?.id) return NextResponse.json({ ok: false, error: 'missing id' }, { status: 400 });
  const data = await readData();
  const idx = data.findIndex((d: any) => d.id === body.id);
  if (idx === -1) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  await writeData(data);
  return NextResponse.json({ ok: true, item: data[idx] });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, error: 'missing id' }, { status: 400 });
  const data = await readData();
  const filtered = data.filter((d: any) => d.id !== id);
  await writeData(filtered);
  return NextResponse.json({ ok: true });
}
