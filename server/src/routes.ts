import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import dayjs from "dayjs";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", () => {
    return "O que voce esta fazendo na Home?";
  });

  // create a habit for specific week days
  app.post("/habits", async (request) => {
    const createhabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(7)),
    });

    const { title, weekDays } = createhabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  // get all habits
  app.get("/habits", async (req, res) => {
    return prisma.habit.findMany();
  });

  // get available habits for specific day
  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return { possibleHabits, completedHabits };
  });

  // complete and uncomplete a habit
  app.patch("/habits/:id/toggle", async (request) => {
    // route param => id param

    const toggleHabitParams = z.object({ id: z.string().uuid() });

    const { id } = toggleHabitParams.parse(request.params);

    // To allow the user to complete/uncomplete a habit on a date before the current day, receive the date value (smt like that):
    // const getDayParams = z.object({
    //   date: z.coerce.date(),
    // });

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    // look for completed habit
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });
    // if a habit is completed, uncomplete the habit and vice-versa
    if (dayHabit) {
      // uncomplete habit
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      // complete habit
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  // delete habit
  app.delete("/habits/:id", async (request) => {
    const deleteHabitParams = z.object({ id: z.string().uuid() });

    const { id } = deleteHabitParams.parse(request.params);

    const habit = await prisma.habit.findUnique({
      where: {
        id: id,
      },
      include: {
        weekDays: true,
      },
    });

    if (!habit) {
      throw new Error("Habit not found");
    }

    const deleteHabit = await prisma.habit.delete({
      where: {
        id: id,
      },
    });

    return deleteHabit;
  });

  // summary of days
  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            CAST(COUNT(*)::float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT 
            CAST(COUNT(*)::float)
          FROM habit_week_days HWD
          JOIN habits H
            on H.id = HWD.habit_id
          WHERE 
            HWD.week_day = CAST(strftime('%w', D.date/1000.0, 'unixepoch')::int)
            AND H.created_at <= D.date
        )::amount
      FROM days D
    `;

    return summary;
  });
}
