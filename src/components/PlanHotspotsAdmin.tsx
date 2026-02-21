"use client";

import { useEffect, useState } from "react";

type Hotspot = { id: string; x: number; y: number; label?: string; description?: string };

export default function PlanHotspotsAdmin() {
  const [items, setItems] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(false);
  const [importText, setImportText] = useState('');

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/plan-hotspots');
    const data = await res.json();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (item: Hotspot) => {
    const res = await fetch('/api/plan-hotspots', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
    if (res.ok) load();
  };

  const remove = async (id: string) => {
    const res = await fetch('/api/plan-hotspots?id=' + encodeURIComponent(id), { method: 'DELETE' });
    if (res.ok) load();
  };

  const bulkImport = async () => {
    try {
      const parsed = JSON.parse(importText);
      await fetch('/api/plan-hotspots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) });
      setImportText('');
      load();
    } catch (e) {
      alert('JSON inválido');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hotspots del Plano</h2>
      <div className="mb-4">
        <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder='Pega un array JSON de hotspots y clic "Importar"' className="w-full h-28 p-2 border rounded" />
        <div className="mt-2">
          <button onClick={bulkImport} className="px-3 py-1 bg-primary-custom text-white rounded">Importar JSON</button>
          <button onClick={load} className="ml-2 px-3 py-1 border rounded">Recargar</button>
        </div>
      </div>

      {loading ? <div>Cargando...</div> : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">X (%)</th>
              <th className="border px-2 py-1">Y (%)</th>
              <th className="border px-2 py-1">Label</th>
              <th className="border px-2 py-1">Descripción</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td className="border px-2 py-1 text-xs">{it.id}</td>
                <td className="border px-2 py-1"><input className="w-20" value={String(it.x)} onChange={(e) => setItems(items.map(i => i.id===it.id?{...i,x:Number(e.target.value)}:i))} /></td>
                <td className="border px-2 py-1"><input className="w-20" value={String(it.y)} onChange={(e) => setItems(items.map(i => i.id===it.id?{...i,y:Number(e.target.value)}:i))} /></td>
                <td className="border px-2 py-1"><input value={it.label||''} onChange={(e) => setItems(items.map(i => i.id===it.id?{...i,label:e.target.value}:i))} /></td>
                <td className="border px-2 py-1"><input value={it.description||''} onChange={(e) => setItems(items.map(i => i.id===it.id?{...i,description:e.target.value}:i))} /></td>
                <td className="border px-2 py-1">
                  <button onClick={() => save(it)} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Guardar</button>
                  <button onClick={() => remove(it.id)} className="ml-2 px-2 py-1 bg-red-600 text-white rounded text-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
