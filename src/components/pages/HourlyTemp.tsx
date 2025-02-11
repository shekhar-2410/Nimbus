import type { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
interface HourlyTempProps {
  data: ForecastData;
}
const HourlyTemp = ({ data }: HourlyTempProps) => {
  const chatData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer>
            <LineChart data={chatData}>
              <XAxis
                dataKey="time"
                stroke="#A0A0A0" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#A0A0A0" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°C`}
              />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "#fff",
                  borderRadius: "5px",
                }}
                labelStyle={{ color: "#FFA500" }} 
                cursor={{ stroke: "#A0A0A0", strokeWidth: 1 }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#4A90E2" 
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#FFA500" 
                dot={false}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemp;
