import { sectorPins } from '../config/access.js';

const key = (setor) => `luvi:acesso:${setor}`;

/** Setor sem senha configurada fica sempre liberado. */
export function isUnlocked(setor) {
  if (!sectorPins[setor]) return true;
  try {
    return sessionStorage.getItem(key(setor)) === '1';
  } catch {
    return false;
  }
}

/** Confere a senha; se estiver certa, libera o setor até fechar o app. */
export function tryUnlock(setor, pin) {
  if (pin !== sectorPins[setor]) return false;
  try {
    sessionStorage.setItem(key(setor), '1');
  } catch {
    /* sem armazenamento: libera só nesta tela */
  }
  return true;
}
