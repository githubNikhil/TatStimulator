import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTATContentSchema, insertWATContentSchema, insertSRTContentSchema } from "@shared/schema";
import { z } from "zod";

// Authentication middleware
const isAuthenticated = (req: Request, res: Response, next: Function) => {
  // This is a simple authentication check.
  // In a real application, this would use sessions or JWT tokens.
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");
  
  if (username !== "admin" || password !== "admin123") {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.use("/api", (req, res, next) => {
    res.header("Cache-Control", "no-store");
    next();
  });
  
  // Authentication route
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  // TAT Content routes
  app.get("/api/tat", async (_, res) => {
    try {
      const content = await storage.getActiveTATContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  app.post("/api/tat", isAuthenticated, async (req, res) => {
    try {
      const parsedBody = insertTATContentSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsedBody.error.format() });
      }
      
      const content = await storage.createTATContent(parsedBody.data);
      res.status(201).json(content);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  app.delete("/api/tat/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const success = await storage.deleteTATContent(id);
      if (!success) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  // WAT Content routes
  app.get("/api/wat", async (_, res) => {
    try {
      const content = await storage.getActiveWATContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  app.post("/api/wat", isAuthenticated, async (req, res) => {
    try {
      // If it's an array of words
      if (Array.isArray(req.body)) {
        const wordsSchema = z.array(insertWATContentSchema);
        const parsedBody = wordsSchema.safeParse(req.body);
        if (!parsedBody.success) {
          return res.status(400).json({ message: "Invalid data", errors: parsedBody.error.format() });
        }
        
        const content = await storage.createManyWATContent(parsedBody.data);
        return res.status(201).json(content);
      }
      
      // If it's a single word
      const parsedBody = insertWATContentSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsedBody.error.format() });
      }
      
      const content = await storage.createWATContent(parsedBody.data);
      res.status(201).json(content);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  app.delete("/api/wat/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const success = await storage.deleteWATContent(id);
      if (!success) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  // SRT Content routes
  app.get("/api/srt", async (_, res) => {
    try {
      const content = await storage.getActiveSRTContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  app.post("/api/srt", isAuthenticated, async (req, res) => {
    try {
      // If it's an array of scenarios
      if (Array.isArray(req.body)) {
        const scenariosSchema = z.array(insertSRTContentSchema);
        const parsedBody = scenariosSchema.safeParse(req.body);
        if (!parsedBody.success) {
          return res.status(400).json({ message: "Invalid data", errors: parsedBody.error.format() });
        }
        
        const content = await storage.createManySRTContent(parsedBody.data);
        return res.status(201).json(content);
      }
      
      // If it's a single scenario
      const parsedBody = insertSRTContentSchema.safeParse(req.body);
      if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsedBody.error.format() });
      }
      
      const content = await storage.createSRTContent(parsedBody.data);
      res.status(201).json(content);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  app.delete("/api/srt/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const success = await storage.deleteSRTContent(id);
      if (!success) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  // Student SDT Question routes
  app.get("/api/sdt/student", async (_, res) => {
    try {
      const questions = await storage.getActiveStudentSDTQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });
  
  // Professional SDT Question routes
  app.get("/api/sdt/professional", async (_, res) => {
    try {
      const questions = await storage.getActiveProfessionalSDTQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
