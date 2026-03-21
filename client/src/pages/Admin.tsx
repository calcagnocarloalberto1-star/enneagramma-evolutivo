import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Users, Calendar, TrendingUp, Award } from "lucide-react";

const typeNames: Record<number, string> = {
  1: "Perfezionista", 2: "Altruista", 3: "Realizzatore",
  4: "Individualista", 5: "Osservatore", 6: "Leale",
  7: "Entusiasta", 8: "Capo", 9: "Pacificatore",
};

const COLORS = [
  "#c9a227", "#0f3460", "#e74c3c", "#2ecc71", "#9b59b6",
  "#f39c12", "#1abc9c", "#e67e22", "#3498db",
];

const historicalData = [
  { tipo: "Tipo 9", nome: "Pacificatore", percentuale: 14.5 },
  { tipo: "Tipo 1", nome: "Perfezionista", percentuale: 13.2 },
  { tipo: "Tipo 6", nome: "Leale", percentuale: 12.5 },
  { tipo: "Tipo 8", nome: "Capo", percentuale: 12.5 },
  { tipo: "Tipo 3", nome: "Realizzatore", percentuale: 11.2 },
  { tipo: "Tipo 4", nome: "Individualista", percentuale: 9.9 },
  { tipo: "Tipo 7", nome: "Entusiasta", percentuale: 9.9 },
  { tipo: "Tipo 5", nome: "Osservatore", percentuale: 8.6 },
  { tipo: "Tipo 2", nome: "Altruista", percentuale: 7.9 },
];

interface AdminStats {
  totalTests: number;
  averageAge: number;
  mostCommonType: number | null;
  typeDistribution: Record<number, number>;
  ageByType: Record<number, number>;
  testsPerDay: { date: string; count: number }[];
  recentTests: { id: number; enneatipo: number; ala: number | null; eta: number; createdAt: string }[];
}

export default function Admin() {
  const { data: stats, isLoading, error } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-destructive">Errore nel caricamento delle statistiche.</p>
      </div>
    );
  }

  if (!stats) return null;

  // Prepare chart data
  const distributionData = Object.entries(stats.typeDistribution)
    .map(([type, count]) => ({
      tipo: `Tipo ${type}`,
      nome: typeNames[parseInt(type)] || "",
      count,
      label: `${type} - ${typeNames[parseInt(type)]}`,
    }))
    .sort((a, b) => parseInt(a.tipo.split(" ")[1]) - parseInt(b.tipo.split(" ")[1]));

  const ageByTypeData = Object.entries(stats.ageByType)
    .map(([type, avgAge]) => ({
      tipo: `Tipo ${type}`,
      nome: typeNames[parseInt(type)] || "",
      etaMedia: avgAge,
    }))
    .sort((a, b) => parseInt(a.tipo.split(" ")[1]) - parseInt(b.tipo.split(" ")[1]));

  const pieData = distributionData
    .filter(d => d.count > 0)
    .map(d => ({ name: d.label, value: d.count }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          Dashboard Amministratore
        </h1>
        <p className="text-muted-foreground">
          Panoramica delle statistiche del test dei 9 Frutti
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-[#c9a227]/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0f3460]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#0f3460]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Test Completati</p>
                <p className="text-2xl font-bold">{stats.totalTests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#c9a227]/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#c9a227]/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#c9a227]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Età Media</p>
                <p className="text-2xl font-bold">{stats.averageAge} anni</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#c9a227]/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2ecc71]/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#2ecc71]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo più Comune</p>
                <p className="text-2xl font-bold">
                  {stats.mostCommonType ? `${stats.mostCommonType}` : "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.mostCommonType ? typeNames[stats.mostCommonType] : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#c9a227]/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#9b59b6]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#9b59b6]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Test Oggi</p>
                <p className="text-2xl font-bold">
                  {stats.testsPerDay.find(d => d.date === new Date().toISOString().substring(0, 10))?.count || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Type Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Distribuzione Enneatipi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [value, "Test"]}
                  labelFormatter={(label) => {
                    const item = distributionData.find(d => d.tipo === label);
                    return item ? `${label} - ${item.nome}` : label;
                  }}
                />
                <Bar dataKey="count" name="Test">
                  {distributionData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Distribuzione Percentuale</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tests per Day */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Test per Giorno (ultimi 30 giorni)</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.testsPerDay.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.testsPerDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(d) => d.substring(5)}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    labelFormatter={(d) => `Data: ${d}`}
                    formatter={(value: number) => [value, "Test"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#0f3460"
                    strokeWidth={2}
                    dot={{ fill: "#c9a227" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-12">Nessun dato disponibile</p>
            )}
          </CardContent>
        </Card>

        {/* Average Age per Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Età Media per Enneatipo</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageByTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value} anni`, "Età Media"]}
                  labelFormatter={(label) => {
                    const item = ageByTypeData.find(d => d.tipo === label);
                    return item ? `${label} - ${item.nome}` : label;
                  }}
                />
                <Bar dataKey="etaMedia" name="Età Media" fill="#c9a227" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Historical Data Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">
          Statistiche Storiche (enneagrammaevolutivo.com)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Distribuzione Storica Enneatipi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={historicalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 16]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="tipo" width={60} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => [`${value}%`, "Percentuale"]} />
                  <Bar dataKey="percentuale" name="Percentuale">
                    {historicalData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {historicalData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium">
                        {item.tipo} — {item.nome}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{item.percentuale}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Ultimi 20 Test</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentTests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium">ID</th>
                    <th className="text-left py-2 px-3 font-medium">Enneatipo</th>
                    <th className="text-left py-2 px-3 font-medium">Ala</th>
                    <th className="text-left py-2 px-3 font-medium">Età</th>
                    <th className="text-left py-2 px-3 font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentTests.map((test) => (
                    <tr key={test.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-2 px-3">{test.id}</td>
                      <td className="py-2 px-3">
                        <span className="font-medium">Tipo {test.enneatipo}</span>
                        <span className="text-muted-foreground ml-1">({typeNames[test.enneatipo]})</span>
                      </td>
                      <td className="py-2 px-3">{test.ala || "—"}</td>
                      <td className="py-2 px-3">{test.eta}</td>
                      <td className="py-2 px-3 text-muted-foreground">
                        {test.createdAt ? new Date(test.createdAt).toLocaleDateString("it-IT") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Nessun test completato.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
