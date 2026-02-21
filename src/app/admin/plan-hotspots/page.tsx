import PlanHotspotsAdmin from '@/components/PlanHotspotsAdmin';

export const metadata = {
  title: 'Admin - Hotspots del Plano',
};

export default function Page() {
  return (
    <div className="container-custom section-padding py-10">
      <h1 className="text-3xl font-bold mb-6">Editor de Hotspots del Plano</h1>
      <PlanHotspotsAdmin />
    </div>
  );
}
