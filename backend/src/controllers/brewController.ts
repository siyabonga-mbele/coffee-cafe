import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
//import Prisma;

const prisma = new PrismaClient();

// ✅ Create a brew
export const createBrew = async (req: Request, res: Response) => {
  try {
    const { beans, method, coffeeGrams, waterGrams, rating, notes } = req.body;
    if (!beans || !method || !coffeeGrams || !waterGrams || !rating || !notes) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const brew = await prisma.brew.create({
      data: { beans, method, coffeeGrams, waterGrams, rating, notes },
    });
    res.status(201).json(brew);
  } catch (err) {
    res.status(500).json({ error: "Failed to create brew" });
  }
};

// ✅ Get all brews
export const getBrews = async (_req: Request, res: Response) => {
  try {
    const brews = await prisma.brew.findMany({ orderBy: { createdAt: "desc" } });
    res.json(brews);
  } catch {
    res.status(500).json({ error: "Failed to fetch brews" });
  }
};

// ✅ Get single brew by ID
export const getBrewById = async (req: Request, res: Response) => {
  try {
    const brew = await prisma.brew.findUnique({ where: { id: Number(req.params.id) } });
    if (!brew) return res.status(404).json({ error: "Brew not found" });
    res.json(brew);
  } catch {
    res.status(500).json({ error: "Failed to fetch brew" });
  }
};

// ✅ Update brew
export const updateBrew = async (req: Request, res: Response) => {
  try {
    const { beans, method, coffeeGrams, waterGrams, rating, notes } = req.body;
    const { id } = req.params;
    const updated = await prisma.brew.update({
      where: { id: Number(id) },
      data: { beans, method, coffeeGrams, waterGrams, rating, notes },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update brew" });
  }
};

// ✅ Delete brew
export const deleteBrew = async (req: Request, res: Response) => {
  try {
    await prisma.brew.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete brew" });
  }
};
