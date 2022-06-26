export interface PageMetaProps {
  title: string;
  description?: string;
  keywords?: string;
}

const PageMetaProps: { [key: string]: PageMetaProps } = {
  home: {
    title: 'hajdenpun.com: Kërkoni punën e ëndrrave tuaja shpejt dhe me lehtësi',
    description:
      'Jeni duke kërkuar punë apo punëtor? Atëherë hajdenpun.com është vendi i duhur për ju',
    keywords: 'hajdenpun, kerko pune',
  },
};
