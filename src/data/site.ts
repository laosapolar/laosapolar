export const site = {
  name: 'La Osa Polar',
  description: 'Escuela de Arteterapia Gestalt y Salud en Málaga, Andalucía.',
  url: 'https://laosapolar.es',
  email: 'elmardelaosapolar@gmail.com',
  phone: '645 427 764',
  phoneHref: 'tel:+34645427764',
};
export const originalPage = (path: string) => path;
export const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Formaciones', children: [
    { label: 'Arteterapia Gestalt', href: originalPage('/arteterapia-gestalt/') },
    { label: 'Postgrado Corporal-Teatro · archivo', href: originalPage('/especializacion/') },
    { label: 'Educación Emocional Sanitaria', href: originalPage('/educacion-emocional-sanitaria/') },
  ] },
  { label: 'Ciclo Esencial', children: [
    { label: 'Ciclo Esencial de Arteterapia Gestalt · vigente', href: originalPage('/arteterapia-esencial/') },
    { label: 'Ediciones anteriores', href: originalPage('/ciclo-esencial-2024/') },
  ] },
  { label: 'Sesiones individuales', href: originalPage('/espacio-individual/') },
  { label: 'Arte', children: [
    { label: 'Galería', href: originalPage('/galeria/') },
    { label: 'Artistas, vida y obras', href: originalPage('/artistas-vida-y-obras/') },
  ] },
];
