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
    select ps.id, ps.name, ps.cpf_1, ps.type, cd.id as id_condominio, cd.name as name_condominio
    from pessoas ps
    left join condominios_pessoas cp on ps.id = cp.id_pessoa
    left join condominios cd on cd.id = cp.id_condominio
  `;

  console.log(result);

  const array = result.reduce((acc, cur) => {
    const { id, name, cpf_1, type, id_condominio, name_condominio } = cur;
    const idx = acc.findIndex((val) => val.id === id);

    const obj = {
      id: id_condominio,
      name: name_condominio,
    };

    if (idx > -1) {
      if (id_condominio) acc[idx].condominios.push(obj);

      return acc;
    }

    acc.push({
      id,
      name,
      cpf_1,
      type,
      condominios: id_condominio ? [obj] : [],
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
  const { name, cpf_1, type, condominios } = req.body;
  const uuid = v4();

  await sql.begin(async (sql) => {
    await sql`
      insert into pessoas (
        id, name, cpf_1, type
      ) values (
        ${uuid}, ${name}, ${cpf_1}, ${type}
      )
    `;

    condominios.map(async (val) => {
      const newUuid = v4();

      await sql`
        insert into condominios_pessoas (
          id, id_pessoa, id_condominio
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
  const { id, name, cpf_1, type, condominios } = req.body;

  const pessoa = {
    id,
    name,
    cpf_1,
    type,
  };

  await sql.begin(async (sql) => {
    await sql`
      update pessoas set ${sql(pessoa, 'name')}, ${sql(pessoa, 'cpf_1')}, ${sql(pessoa, 'type')}
      where id = ${id}
    `;

    await sql`delete from condominios_pessoas where id_pessoa = ${id}`;

    condominios.map(async (val) => {
      const newUuid = v4();

      await sql`
        insert into condominios_pessoas (
          id, id_pessoa, id_condominio
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
      delete from condominios_pessoas where id_pessoa = ${id}
    `;

    await sql`
      delete from pessoas where id = ${id}
    `;
  });

  return res.json({ msg: 'deleted' });
};
