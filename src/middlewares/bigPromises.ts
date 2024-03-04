// try catch and async - await || use promise
import { Request, Response, NextFunction } from "express";
const BigPromises = (func: any) => (req: any, res: any, next: any) =>
  Promise.resolve(func(req, res, next)).catch(next);

export { BigPromises };