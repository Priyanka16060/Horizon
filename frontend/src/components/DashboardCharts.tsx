import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Props {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  completionRate: number;
}

export default function DashboardCharts({
  totalProjects,
  totalTasks,
  completedTasks,
  inProgressTasks,
  todoTasks,
  completionRate,
}: Props) {
  const pieData = [
    {
      name: "Todo",
      value: todoTasks,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
    },
    {
      name: "Completed",
      value: completedTasks,
    },
  ];

  const barData = [
    {
      name: "Projects",
      value: totalProjects,
    },
    {
      name: "Tasks",
      value: totalTasks,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#22c55e",
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-12">

      {/* Pie Chart */}

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <h2 className="text-xl font-semibold mb-6">
          Task Status
        </h2>

        <ResponsiveContainer
          width="100%"
          height={260}
        >
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              label
            >

              {pieData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

        <h2 className="text-xl font-semibold mb-6">
          Projects vs Tasks
        </h2>

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <BarChart data={barData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Completion */}

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-center items-center">

        <h2 className="text-xl font-semibold mb-8">
          Completion Rate
        </h2>

        <div className="relative w-40 h-40">

          <svg
            className="w-40 h-40 rotate-[-90deg]"
            viewBox="0 0 100 100"
          >

            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#334155"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#22c55e"
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${completionRate * 2.83} 283`}
              strokeLinecap="round"
            />

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <span className="text-4xl font-bold">

              {completionRate}%

            </span>

          </div>

        </div>

        <p className="text-slate-400 mt-6">

          Tasks Completed

        </p>

      </div>

    </div>
  );
}