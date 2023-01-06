import { RichTextStyle } from '@/config/theme';

interface Props {
  text?: string;
}

export const RichText: React.FC<Props> = ({ text }) => {
  return <RichTextStyle dangerouslySetInnerHTML={{ __html: text ?? '' }} />;
};
