import Dataloader from 'dataloader';
import { connection } from './connection.js';


const getCompanyTable = () => connection.table('company');

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

export function createCompanyLoader() {
return new Dataloader(async (ids) => {
  console.log('[Company Loader] ids:',ids)
  const companies = await getCompanyTable().select().whereIn('id', ids)
  return ids.map(id => companies.find(company => company.id ===id))
})
}
