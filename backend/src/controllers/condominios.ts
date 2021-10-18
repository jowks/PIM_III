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
    select cd.id, cd.name, cd.address, ct.id as id_container, ct.name as name_container
    from condominios cd
    left join condominios_containers cc on cd.id = cc.id_condominio
    left join containers ct on ct.id = cc.id_container
  `;

  const array = result.reduce((acc, cur) => {
    const { id, name, address, id_container, name_container } = cur;
    const idx = acc.findIndex((val) => val.id === id);

    const obj = {
      id: id_container,
      name: name_container,
    };

    if (idx > -1) {
      if (id_container) acc[idx].containers.push(obj);

      return acc;
    }

    acc.push({
      id,
      name,
      address,
      containers: id_container ? [obj] : [],
    });

    return acc;
  }, []);

  return res.json(array);
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const create = async (req: Request, res: Response) => {
  const { name, address, containers } = req.body;
  const uuid = v4();

  await sql.begin(async (sql) => {
    await sql`
      insert into condominios (
        id, name, address
      ) values (
        ${uuid}, ${name}, ${address}
      )
    `;

    containers.map(async (val) => {
      const newUuid = v4();

      await sql`
        insert into condominios_containers (
          id, id_condominio, id_container
        ) values (
          ${newUuid}, ${uuid}, ${val}
        )
      `;
    });
  });

  return res.json({ msg: 'created' });
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const update = async (req: Request, res: Response) => {
  const { id, name, address, containers } = req.body;

  const condominio = {
    id,
    name,
    address,
  };

  await sql.begin(async (sql) => {
    await sql`
      update condominios set ${sql(condominio, 'name')}, ${sql(condominio, 'address')}
      where id = ${id}
    `;

    await sql`delete from condominios_containers where id_condominio = ${id}`;

    containers.map(async (val) => {
      const newUuid = v4();

      await sql`
        insert into condominios_containers (
          id, id_condominio, id_container
        ) values (
          ${newUuid}, ${id}, ${val.id || val}
        )
      `;
    });
  });
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

  await sql.begin(async (sql) => {
    await sql`
      delete from condominios_containers where id_condominio = ${id}
    `;

    await sql`
      delete from condominios where id = ${id}
    `;
  });

  return res.json({ msg: 'deleted' });
};
