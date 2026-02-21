import React from 'react'
import { getContacts } from '@/lib/db'

export default async function ContactsPage() {
  const contacts = await getContacts()

  return (
    <div className="container-custom section-padding py-12">
      <h1 className="text-3xl font-bold mb-6">Contactos recibidos</h1>

      {contacts.length === 0 ? (
        <div className="p-6 bg-white rounded shadow">No hay contactos aún.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensaje</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((c: any) => (
                <tr key={c.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.name} {c.lastName ?? ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.phone ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.message ?? '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
