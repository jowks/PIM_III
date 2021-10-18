import { Request, Response } from 'express';
import { v4 } from 'uuid';

import AppError from '../error/error';
import sql from '../services/postgres';

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const list = async (req: Request, res: Response) => {
  const result = await sql`
    select ct.id, ct.name
    from containers ct
    left join condominios_containers cc on ct.id = cc.id_container
  `;

  console.log(result);

  return res.json(result);
};
/**
 *
 * @param req
 * @param res
 * @returns
 */
export const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const uuid = v4();

  await sql`
    insert into containers (
      id, name
    ) values (
      ${uuid}, ${name}
    )
  `;

  return res.json({ msg: 'created' });
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const update = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  const container = {
    name,
  };

  await sql`
    update containers set ${sql(container, 'name')} where id = ${id}
  `;

  return res.json({ msg: 'updated' });
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const erase = async (req: Request, res: Response) => {
  const { id } = req.body;

  await sql`
    delete from containers where id = ${id}
  `;

  return res.json({ msg: 'deleted' });
};
