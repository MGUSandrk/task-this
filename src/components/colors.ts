const pastelBgClasses = [
  "bg-red-200",
  "bg-yellow-200",
  "bg-amber-200",
  "bg-pink-200",
  "bg-green-200",
  "bg-cyan-200",
  "bg-orange-200",
  "bg-lime-200",
  "bg-violet-200",
  "bg-teal-200",
  "bg-purple-200",
  "bg-emerald-200",
  "bg-blue-200",
  "bg-fuchsia-200",
  "bg-sky-200",
  "bg-indigo-200",
  
  "bg-rose-200"
];

// OPCIÓN A: Color aleatorio cada vez que se llama (Cuidado: cambiará al recargar)
export const getRandomPastelBg = () => {
  return pastelBgClasses[Math.floor(Math.random() * pastelBgClasses.length)];
};

export const getConsistentPastelBg = (identifier: string) => {
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Usamos valor absoluto para evitar índices negativos
  const index = Math.abs(hash) % pastelBgClasses.length;
  return pastelBgClasses[index];
};