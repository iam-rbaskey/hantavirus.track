'use client';
import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiResponse } from '@/utils/api';

export default function CountryPage({ params }: { params: { code: string } }) {
  const { code } = params;

  const { data, isLoading } = useQuery({
    queryKey: ['country', code],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<any>>(`/countries/${code}`);
      return res.data.data;
    }
  });

  if (isLoading) return <div className="p-20 text-center animate-pulse">Loading Country Data...</div>;
  if (!data) return <div className="p-20 text-center text-danger">Country not found.</div>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-8">
      <header className="pb-6 border-b border-white/10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">{data.name}</h1>
          <p className="text-white/60 text-sm mt-2 font-mono uppercase tracking-widest">{data.code} | Risk: {data.riskLevel || 'UNKNOWN'}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
           <h2 className="text-sm uppercase tracking-widest opacity-60 mb-2">Total Confirmed Cases</h2>
           <p className="text-5xl font-bold text-warning">{data.outbreaks[0]?.confirmedCases || 0}</p>
        </div>
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
           <h2 className="text-sm uppercase tracking-widest opacity-60 mb-2">Total Deaths</h2>
           <p className="text-5xl font-bold text-danger">{data.outbreaks[0]?.deaths || 0}</p>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md mt-6">
         <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Historical Outbreak Records</h2>
         <ul className="space-y-4">
           {data.outbreaks.map((outbreak: any, index: number) => (
             <li key={index} className="flex justify-between p-4 bg-black/20 rounded border border-white/5">
               <span className="font-mono text-sm opacity-80">{new Date(outbreak.reportedAt).toLocaleDateString()}</span>
               <div className="flex gap-8">
                  <span className="text-warning font-bold">{outbreak.confirmedCases} cases</span>
                  <span className="text-danger font-bold">{outbreak.deaths} deaths</span>
               </div>
             </li>
           ))}
           {data.outbreaks.length === 0 && <p className="text-white/40 italic">No historical records available.</p>}
         </ul>
      </div>
    </div>
  );
}
