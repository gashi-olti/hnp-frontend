import { useRouter } from 'next/router';
import tw from 'twin.macro';
import styled from '@emotion/styled';

import Link from '@/components/CustomLink';

type NavLinkProps = {
  active?: boolean;
};

const NavLink = styled(Link)<NavLinkProps>(({ active }: NavLinkProps) => [
  tw`inline-block relative p-2 md:(px-2 mx-2 my-0)`,
  tw`after:(absolute content block w-full h-0.5 left-1/2 transform -translate-x-1/2 scale-x-0 bg-white transition-transform)`,
  !active && tw`hover:after:scale-x-75`,
  active && tw`after:(scale-x-75)`,
]);

export default function Navigation() {
  const router = useRouter();

  return (
    <nav tw="text-white uppercase font-bold text-base md:(mr-4 mt-0)">
      <NavLink href="/" active={router.pathname === '/'}>
        Home
      </NavLink>
      <NavLink href="/create" active={router.pathname === '/artists'}>
        Publiko Konkurs
      </NavLink>
      <NavLink href="/contact" active={router.pathname === '/venues'}>
        Kontakt
      </NavLink>
    </nav>
  );
}
