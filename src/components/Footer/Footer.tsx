import { useTranslation } from 'react-i18next';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Image from 'next/image';

import CustomLink from '@/components/CustomLink';

import { Images } from '../Icons/Images';

interface NavItem {
  id?: string;
  name: string;
  href?: string;
  icon?: any;
  children?: NavItem[];
}

export default function Footer() {
  const { t } = useTranslation(['common']);

  const navigation: NavItem[] = [
    {
      name: t('about us'),
      children: [
        { name: t('who are we') },
        { name: t('terms of use') },
        { name: t('privacy policy') },
      ],
    },
    {
      name: t('services'),
      children: [{ name: t('FAQ') }],
    },
    {
      id: 'social',
      name: t('social media'),
      children: [
        {
          name: t('facebook'),
          href: 'https://www.facebook.com',
          icon: (props: any) => <FacebookIcon {...props} tw="h-5 w-5 ml-2" aria-hidden="true" />,
        },
        {
          name: t('instagram'),
          href: 'https://www.instagram.com/',
          icon: (props: any) => <InstagramIcon {...props} tw="h-5 w-5 ml-2" aria-hidden="true" />,
        },
        {
          name: t('tiktok'),
          href: 'https://www.tiktok.com',
        },
      ],
    },
  ];

  let socialItems = navigation.find((item) => item.id === 'social')?.children || [];

  return (
    <>
      <footer tw="text-white bg-gradient-to-r from-sky to-cyan z-10">
        <div tw="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div tw="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {navigation.map((item, index) => (
              <div tw="pb-6" key={index}>
                <h3 tw="text-base font-bold text-white tracking-wider uppercase">{item.name}</h3>
                {item.children && (
                  <ul tw="mt-4 space-y-2">
                    {item.children.map((item2) => (
                      <li key={item2.name}>
                        {item2.href ? (
                          <CustomLink
                            href={item2.href}
                            tw="text-base text-white hover:text-gray-200 transition-colors"
                          >
                            {item2.name}
                          </CustomLink>
                        ) : (
                          item2.name
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div tw="mt-8 sm:col-span-2 md:col-span-4 lg:col-span-1 lg:mt-0 flex flex-col items-end">
              <CustomLink href="/">
                <Image src={Images.Logo} alt="logo" width={150} height={49} />
              </CustomLink>
              <div tw="flex self-end mt-6">
                {socialItems
                  .filter((item) => item.icon && item.href)
                  .map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      tw="text-white hover:text-gray-200 transition-colors"
                    >
                      <span tw="sr-only">{item.name}</span>
                      <item.icon />
                    </a>
                  ))}
              </div>
            </div>
          </div>

          <div tw="mt-8 border-t border-gray-100 pt-8 text-center">
            <p tw="mt-8 text-gray-100 md:mt-0 md:order-1">&copy; 2022 hanjdenpun.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}
