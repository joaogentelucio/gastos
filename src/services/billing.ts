import api from './api';

export async function createCheckout() {
  const { data } = await api.post("billing/checkout");
  return data.url as string;
}

export async function openPortal() {
  const { data } = await api.post("billing/portal");
  return data.url as string;
}
