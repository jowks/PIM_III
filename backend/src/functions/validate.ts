import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import AppError from '../error/error';
import { accessControl } from '../services/api';

dotenv.config();
const { HTM_TOKEN_SECRET } = process.env;

interface Permissoes {
  nivel: number;
  permissao: string;
}

interface Rotina {
  rotina: string;
  permissoes: Array<Permissoes>;
}

interface User {
  matricula: string;
  cargo: string;
  nome: string;
  login: string;
  departamento: string;
  ccusto: string;
  acessos: Array<Rotina> | Array<null>;
}

export const validateUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { UserName } = request.ntlm;
  if (!UserName) throw new AppError('É necessário autenticar na aplicação.');

  const { data } = await accessControl.get<User>(
    `/employee/access?login=${UserName.toLowerCase()}`,
  );

  const { matricula, cargo, nome, acessos } = data;

  const [allowedRoutine] = acessos.filter(
    ({ rotina }) => rotina === 'intranet',
  );

  if (!allowedRoutine) throw new AppError('Permissão Negada', 401);

  response.locals.payload = { matricula, cargo, nome };

  next();
};

export const generateToken = async (request: Request, response: Response) => {
  const { UserName } = request.ntlm;
  if (!UserName) throw new AppError('É necessário autenticar na aplicação.');

  const { data } = await accessControl.get<User>(
    `/employee/access?login=${UserName.toLowerCase()}`,
  );

  const { acessos } = data;

  const [allowedRoutine] = acessos.filter(
    ({ rotina }) => rotina === 'intranet',
  );

  const token = jwt.sign({ data: allowedRoutine }, HTM_TOKEN_SECRET, {
    expiresIn: '9h',
  });

  return response.status(200).json(token);
};
