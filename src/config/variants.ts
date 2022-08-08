export interface VariantProps {
  key: string;
}

const variants: { [name: string]: VariantProps } = {
  hero: { key: 'hero' },
  media: { key: 'media' },
  infoCard: { key: 'info_card' },
  jobSquarePreview: { key: 'job_square_preview' },
};

export default variants;
