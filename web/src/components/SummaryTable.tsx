import { useEffect, useState } from "react";
import { HabitDay } from "./HabitDay";
import { generateDatesFromYearBeginning } from "../util/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import dayjs from "dayjs";

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const summaryDate = generateDatesFromYearBeginning();
  const minimunSummaryDateSize = 15 * 7; // 15 semanas
  const maximumSummaryDateSize = 18 * 7; // 126 dias / 18 semanas

  // Ajusta o tamanho máximo do array
  if (summaryDate.length > maximumSummaryDateSize) {
    const rest = summaryDate.length % 7;
    summaryDate.splice(0, summaryDate.length - maximumSummaryDateSize - rest);
  }

  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  // ** CONSERTO PRO ALINHAMENTO DE COMEÇO DE ANO

  // 🔹 Descobre o dia da semana do primeiro dia do ano
  const firstDayOfYear = summaryDate[0];
  const firstWeekDayOfYear = dayjs(firstDayOfYear).day(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

  // 🔹 Gerar dias anteriores para preencher a primeira semana (do ano anterior)
  const previousYearLastDay = dayjs(firstDayOfYear).subtract(1, "day"); // 31 de dezembro do ano anterior
  const previousYearDays = Array.from(
    { length: firstWeekDayOfYear },
    (_, index) =>
      previousYearLastDay.subtract(firstWeekDayOfYear - 1 - index, "day")
  );

  return (
    <div className="w-full flex">
      {/* Coluna de nomes dos dias da semana */}
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      {/* Grade de hábitos */}
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {/* 🔹 Preenche os dias vazios antes do primeiro dia do ano */}
        {/* {Array.from({ length: firstWeekDayOfYear }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-10 h-10 bg-zinc-600 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
          ></div>
        ))} */}

        {/* 🔹 Preenche os dias do ano anterior */}
        {previousYearDays.map((date, index) => {
          const dayInSummary = summary.find((day) =>
            dayjs(date).isSame(day.date, "day")
          );

          return (
            <HabitDay
              key={date.toString()}
              defaultCompleted={dayInSummary?.completed}
              amount={dayInSummary?.amount}
              date={date.toDate()}
            />
          );
        })}

        {/* 🔹 Renderiza os dias com hábitos */}
        {summary.length > 0 &&
          summaryDate.map((date) => {
            const dayInSummary = summary.find((day) =>
              dayjs(date).isSame(day.date, "day")
            );

            return (
              <HabitDay
                key={date.toString()}
                defaultCompleted={dayInSummary?.completed}
                amount={dayInSummary?.amount}
                date={date}
              />
            );
          })}

        {/* 🔹 Preenche os dias vazios para completar a grade */}
        {Array.from({
          length: minimunSummaryDateSize - summaryDate.length,
        }).map((_, index) => (
          <div
            key={`fill-${index}`}
            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
          ></div>
        ))}
      </div>
    </div>
  );
}
